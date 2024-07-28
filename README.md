# Moove App

Una semplice applicazione che consente di gestire mezzi di trasporto condivisi in diverse città.

## Indice

- [Introduzione](#introduzione)
- [Installazione](#installazione)
- [Uso](#uso)
- [Contribuire](#contribuire)

## Introduzione

Moove è un'applicazione web che permette di gestire mezzi di trasporto condivisi come biciclette, scooter e monopattini elettrici in varie città. Gli utenti possono registrarsi, prenotare mezzi disponibili e visualizzare informazioni sui mezzi e le città. Questo progetto è un esempio didattico per comprendere i concetti base di TypeScript, programmazione orientata agli oggetti, e gestione di dati tramite array.

## Installazione

Istruzioni passo-passo su come installare e configurare il progetto:

```bash
# Clona il repository
git clone https://github.com/tuo-username/Moove-App.git

# Naviga nella directory del progetto
cd Moove-App

# Installa le dipendenze (se richiesto, ad esempio per server locale o compilazione TS)
npm install
``` 

## Uso
Esempi su come utilizzare l'applicazione (puoi trovarla anche su CodePen https://codepen.io/alessioberruto/pen/xxoRabY?editors=0012):

Avvia l'applicazione (se necessario, con un server locale).
1. Aggiungi città al sistema utilizzando il codice.
2. Registra utenti e aggiungi mezzi alle città.
3. Prenota mezzi disponibili attraverso le classi Utente e Città.

Esempio di utilizzo

```bash
const cittaRoma = new Citta('Roma');
cittaRoma.aggiungiMezzo(new Mezzo('bici'));
cittaRoma.aggiungiMezzo(new Mezzo('scooter'));
cittaRoma.aggiungiMezzo(new Mezzo('monopattino'));

const utente1 = new Utente('Mario', 'Rossi', 'mario.rossi@example.com', 'carta di credito');
cittaRoma.registraUtente(utente1);

const utenteRegistratoRoma = cittaRoma.ottieniUtente('mario.rossi@example.com');
if (utenteRegistratoRoma) {
    const mezzoBiciRoma = cittaRoma.mezziDisponibili.find(m => m.tipo === 'bici');
    if (mezzoBiciRoma) {
        utenteRegistratoRoma.prenotaMezzo(mezzoBiciRoma, cittaRoma.nome);
    }
}
```

## Contribuire
Istruzioni su come contribuire al progetto:

1. Crea una copia del progetto (fork) sul tuo account GitHub.
2. Crea un nuovo ramo per la tua funzionalità (`git checkout -b feature/NuovaFunzionalità`).
3. Apporta le modifiche desiderate (`git commit -m 'Aggiungi una nuova funzionalità'`).
4. Invia le modifiche al tuo ramo (`git push origin feature/NuovaFunzionalità`).
5. Invia una richiesta di pull (Pull Request) per far esaminare le tue modifiche.

