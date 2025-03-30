"use client"

// Importa React per utilizzare hook e componenti
import * as React from "react"

// Importa i tipi relativi ai Toast dal componente UI (ToastProps e ToastActionElement)
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Definisce il numero massimo di toast visibili contemporaneamente
const TOAST_LIMIT = 1
// Tempo di ritardo prima di rimuovere definitivamente un toast (in millisecondi)
// Nota: qui è impostato a un valore molto elevato (1000000 ms)
const TOAST_REMOVE_DELAY = 1000000

// Tipo che estende le proprietà di un Toast aggiungendo un identificatore (id) e altri campi opzionali
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Oggetto che definisce le diverse azioni possibili sul Toast
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Variabile per generare un ID univoco per ogni toast
let count = 0

// Funzione che genera un ID univoco per i toast incrementando un contatore
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Definizione del tipo ActionType basato sull'oggetto actionTypes
type ActionType = typeof actionTypes

// Definizione delle possibili azioni (actions) per il reducer dei toast
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Interfaccia per lo stato della gestione dei toast
interface State {
  toasts: ToasterToast[]
}

// Mappa per tenere traccia dei timeout associati a ciascun toast
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Funzione per aggiungere un toast in coda alla rimozione dopo il ritardo specificato
const addToRemoveQueue = (toastId: string) => {
  // Se esiste già un timeout per questo toast, non fare nulla
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Imposta un timeout per rimuovere il toast dopo TOAST_REMOVE_DELAY millisecondi
  const timeout = setTimeout(() => {
    // Una volta scaduto il timeout, elimina il toast dalla mappa dei timeout
    toastTimeouts.delete(toastId)
    // Esegui l'azione per rimuovere il toast
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Aggiungi il timeout nella mappa associandolo all'id del toast
  toastTimeouts.set(toastId, timeout)
}

// Il reducer gestisce le azioni sullo stato dei toast
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Aggiunge il nuovo toast all'inizio dell'array e limita il numero di toast visibili a TOAST_LIMIT
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        // Aggiorna il toast corrispondente all'id specificato con le nuove proprietà
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Effettua azioni collaterali per mettere in coda la rimozione del toast
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        // Se non è specificato un id, applica l'azione a tutti i toast
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        // Imposta il campo open del toast a false, indicando che è stato chiuso
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // Se toastId è undefined, rimuove tutti i toast
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      // Altrimenti, filtra l'array rimuovendo il toast con l'id corrispondente
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array di listener che verranno chiamati ogni volta che lo stato dei toast viene aggiornato
const listeners: Array<(state: State) => void> = []

// Stato di memoria per i toast, inizialmente vuoto
let memoryState: State = { toasts: [] }

// Funzione di dispatch che applica un'azione al reducer e notifica tutti i listener
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo Toast che esclude l'id (che verrà generato automaticamente)
type Toast = Omit<ToasterToast, "id">

// Funzione per creare un nuovo toast
function toast({ ...props }: Toast) {
  // Genera un id univoco per il nuovo toast
  const id = genId()

  // Funzione per aggiornare il toast con nuove proprietà
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // Funzione per chiudere il toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Dispatch dell'azione per aggiungere il toast
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      // Callback che viene chiamata quando lo stato di apertura del toast cambia
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Restituisce un oggetto con l'id, e le funzioni per dismiss e update
  return {
    id: id,
    dismiss,
    update,
  }
}

// Hook personalizzato per utilizzare i toast
function useToast() {
  // Stato locale che tiene traccia dello stato dei toast, inizializzato con il valore in memoria
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Aggiunge il setState come listener per gli aggiornamenti dello stato dei toast
    listeners.push(setState)
    return () => {
      // Rimuove il listener quando il componente si smonta
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // Restituisce lo stato dei toast insieme alle funzioni per creare e dismissare i toast
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Esporta lo hook e la funzione toast per essere usati in altri componenti
export { useToast, toast }
