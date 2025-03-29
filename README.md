# Carbonico - Calcolatore di Impronta di Carbonio Digitale

![Carbonico Logo](/public/images/logo.png)

Carbonico è un'applicazione web interattiva progettata per sensibilizzare gli utenti sull'impatto ambientale delle loro attività digitali quotidiane. L'applicazione calcola l'impronta di carbonio digitale basandosi su parametri come lo streaming video, l'utilizzo dei social media, le email e l'archiviazione cloud, offrendo visualizzazioni intuitive e suggerimenti personalizzati per ridurre le emissioni di CO₂.

## 📋 Indice

- [Funzionalità Principali](#-funzionalità-principali)
- [Tecnologie Utilizzate](#️-tecnologie-utilizzate)
- [Requisiti di Sistema](#-requisiti-di-sistema)
- [Installazione e Avvio](#-installazione-e-avvio)
- [Configurazione](#-configurazione)
- [Utilizzo dell'Applicazione](#-utilizzo-dellapplicazione)
- [Architettura e Funzionamento](#-architettura-e-funzionamento)
- [Metodologia di Calcolo](#-metodologia-di-calcolo)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Contribuire al Progetto](#-contribuire-al-progetto)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)
- [Licenza](#-licenza)
- [Contatti](#-contatti)

## 🌱 Funzionalità Principali

### Calcolatore di Impronta Digitale
- Analisi dettagliata delle attività digitali quotidiane
- Parametri personalizzabili per streaming, social media, email, cloud e videochiamate
- Calcolo in tempo reale dell'impronta di carbonio in grammi di CO₂

### Visualizzazioni e Comparazioni
- Dashboard interattiva con rappresentazioni grafiche dell'impatto
- Equivalenti tangibili (distanza in auto, alberi necessari, ore di illuminazione)
- Visualizzazione CO₂ adattiva in base all'entità dell'impronta

### Sistema di Monitoraggio
- Profili utente per salvare e confrontare i calcoli nel tempo
- Grafico storico per tracciare i progressi
- Classifica "Eco-Eroi" per incentivare la riduzione dell'impronta

### Suggerimenti e Risorse Educative
- Raccomandazioni personalizzate basate sulle abitudini dell'utente
- Sezione dedicata con consigli pratici suddivisi per categoria
- Indicatori di impatto per ogni suggerimento (basso, medio, alto)

## 🛠️ Tecnologie Utilizzate

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) - Framework React con App Router
  - [React 18](https://reactjs.org/) - Libreria JavaScript per UI
  - [Tailwind CSS 3](https://tailwindcss.com/) - Framework CSS utility-first
  - [shadcn/ui](https://ui.shadcn.com/) - Componenti UI accessibili e personalizzabili
  - [Lucide React](https://lucide.dev/) - Set di icone SVG

- **Visualizzazione Dati**:
  - [Recharts](https://recharts.org/) - Libreria per grafici React

- **Persistenza Dati**:
  - LocalStorage - Per salvare i dati utente e i calcoli

- **Sviluppo**:
  - [TypeScript](https://www.typescriptlang.org/) - Superset tipizzato di JavaScript
  - [ESLint](https://eslint.org/) - Linting del codice
  - [Prettier](https://prettier.io/) - Formattazione del codice

## 💻 Requisiti di Sistema

- **Node.js**: v18.17.0 o superiore
- **npm**: v9.6.0 o superiore (incluso con Node.js)
- **Spazio su disco**: Minimo 200MB per l'installazione
- **Browser supportati**: Chrome, Firefox, Safari, Edge (ultime 2 versioni)
- **Dispositivi**: Desktop, tablet e smartphone (design responsive)

## 🚀 Installazione e Avvio

### Installazione Standard

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuousername/carbonico.git
   cd carbonico