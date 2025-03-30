// Importa la funzione "clsx" e il tipo "ClassValue" dal pacchetto "clsx"
// "clsx" è una utility che consente di concatenare condizionalmente nomi di classi CSS.
import { clsx, type ClassValue } from "clsx"

// Importa la funzione "twMerge" dal pacchetto "tailwind-merge"
// "twMerge" unisce e risolve conflitti tra classi Tailwind CSS, rimuovendo duplicati e garantendo l'ordine corretto.
import { twMerge } from "tailwind-merge"

/**
 * Funzione di utilità per combinare classi CSS.
 * 
 * @param inputs - Un array di valori (di tipo ClassValue) che possono essere stringhe, oggetti o array
 *                 contenenti nomi di classi CSS.
 * @returns Una stringa contenente i nomi delle classi CSS uniti e ottimizzati.
 *
 * La funzione "cn" sfrutta "clsx" per combinare condizionalmente le classi e "twMerge" per gestire conflitti
 * specifici di Tailwind CSS, restituendo una stringa pulita e ordinata.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
