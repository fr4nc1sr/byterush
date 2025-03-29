# ------------- STAGE 1: COMPILAZIONE -------------
    FROM node:18 AS build

    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    
    # Copia tutto il codice (inclusi i .ts)
    COPY . .
    
    # Se il tuo tsconfig produce /dist per i file JS generati
    RUN npm run build
    # Ora i file .js generati si trovano in /app/dist (ipotesi comune)
    
    # ------------- STAGE 2: ESECUZIONE -------------
    FROM node:18 AS production
    
    WORKDIR /app
    # Copiamo solo i file compilati + package.json, node_modules
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copia la cartella dist con i .js generati dallo stage di build
    COPY --from=build /app/dist ./dist
    
    EXPOSE 8080
    CMD ["node", "dist/server.js"]