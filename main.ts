// Interfacce

interface IMezzo {
    tipo: 'bici' | 'scooter' | 'monopattino';
    stato: 'disponibile' | 'in uso';
    utenteAssegnato: IUtente | null;
    id: number | null;
    assegnaUtente(utente: IUtente): void;
    ottieniDettagli(): { tipo: string, stato: string, id: number | null };
}

interface IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamentoPreferito: string;
    prenotaMezzo(mezzo: IMezzo, citta: string): void;
}

interface ICitta {
    nome: string;
    mezziDisponibili: IMezzo[];
    utentiRegistrati: IUtente[];
    aggiungiMezzo(mezzo: IMezzo): void;
    registraUtente(utente: IUtente): void;
    ottieniUtente(email: string): IUtente | undefined;
}

// Implementazioni

class Mezzo implements IMezzo {
    tipo: 'bici' | 'scooter' | 'monopattino';
    stato: 'disponibile' | 'in uso' = 'disponibile';
    utenteAssegnato: IUtente | null = null;
    id: number | null = null;

    constructor(tipo: 'bici' | 'scooter' | 'monopattino') {
        this.tipo = tipo;
    }

    assegnaUtente(utente: IUtente): void {
        if (this.stato === 'disponibile') {
            this.utenteAssegnato = utente;
            this.stato = 'in uso';
            console.log(`Mezzo ${this.tipo} con ID ${this.id} assegnato a ${utente.nome} ${utente.cognome}.`);
        } else {
            console.error(`Errore: Il mezzo ${this.tipo} è già in uso.`);
        }
    }

    ottieniDettagli(): { tipo: string, stato: string, id: number | null } {
        return { tipo: this.tipo, stato: this.stato, id: this.id };
    }
}

class Utente implements IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamentoPreferito: string;

    constructor(nome: string, cognome: string, email: string, metodoPagamentoPreferito: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamentoPreferito = metodoPagamentoPreferito;
    }

    prenotaMezzo(mezzo: IMezzo, citta: string): void {
        if (mezzo.stato === 'disponibile') {
            mezzo.assegnaUtente(this);
            console.log(`L'utente ${this.nome} ${this.cognome} ha prenotato il mezzo ${mezzo.tipo} con ID ${mezzo.ottieniDettagli().id} a ${citta}.`);
        } else {
            console.error(`Errore: Il mezzo ${mezzo.tipo} non è disponibile.`);
        }
    }
}

class Citta implements ICitta {
    nome: string;
    mezziDisponibili: IMezzo[] = [];
    utentiRegistrati: IUtente[] = [];

    constructor(nome: string) {
        this.nome = nome;
    }

    aggiungiMezzo(mezzo: IMezzo): void {
        mezzo.id = SistemaMoove.generaNuovoIdMezzo();
        this.mezziDisponibili.push(mezzo);
        console.log(`Mezzo ${mezzo.tipo} aggiunto a ${this.nome} con ID ${mezzo.id}.`);
    }

    registraUtente(utente: IUtente): void {
        const utenteEsistente = this.utentiRegistrati.find(u => u.email === utente.email);
        if (utenteEsistente) {
            console.error(`Errore: L'utente con email ${utente.email} è già registrato.`);
        } else {
            this.utentiRegistrati.push(utente);
            console.log(`Utente ${utente.nome} ${utente.cognome} registrato con successo a ${this.nome}.`);
        }
    }

    ottieniUtente(email: string): IUtente | undefined {
        return this.utentiRegistrati.find(u => u.email === email);
    }
}

class SistemaMoove {
    cittaDisponibili: ICitta[] = [];
    private static nextGlobalId: number = 1;

    static generaNuovoIdMezzo(): number {
        return this.nextGlobalId++;
    }

    aggiungiCitta(citta: ICitta): void {
        const cittaEsistente = this.cittaDisponibili.find(c => c.nome === citta.nome);
        if (cittaEsistente) {
            console.error(`Errore: La città ${citta.nome} è già presente nel sistema.`);
        } else {
            this.cittaDisponibili.push(citta);
            console.log(`Città ${citta.nome} aggiunta al sistema.`);
        }
    }

    ottieniCitta(nome: string): ICitta | undefined {
        return this.cittaDisponibili.find(c => c.nome === nome);
    }
}

// Esempio di utilizzo

// Creazione di nuove istanze per ogni città
const cittaRoma = new Citta('Roma');
cittaRoma.aggiungiMezzo(new Mezzo('bici'));
cittaRoma.aggiungiMezzo(new Mezzo('scooter'));
cittaRoma.aggiungiMezzo(new Mezzo('monopattino'));

const cittaMilano = new Citta('Milano');
cittaMilano.aggiungiMezzo(new Mezzo('bici'));
cittaMilano.aggiungiMezzo(new Mezzo('scooter'));
cittaMilano.aggiungiMezzo(new Mezzo('monopattino'));

// Creazione di utenti
const utente1 = new Utente('Mario', 'Rossi', 'mario.rossi@example.com', 'carta di credito');
const utente2 = new Utente('Luca', 'Bianchi', 'luca.bianchi@example.com', 'PayPal');

// Registrazione degli utenti
cittaRoma.registraUtente(utente1);
cittaMilano.registraUtente(utente2);

// Creazione del sistema Moove
const sistemaMoove = new SistemaMoove();
sistemaMoove.aggiungiCitta(cittaRoma);
sistemaMoove.aggiungiCitta(cittaMilano);

// Prenotazione mezzi
const utenteRegistratoRoma = cittaRoma.ottieniUtente('mario.rossi@example.com');
if (utenteRegistratoRoma) {
    const mezzoBiciRoma = cittaRoma.mezziDisponibili.find(m => m.tipo === 'bici');
    if (mezzoBiciRoma) {
        utenteRegistratoRoma.prenotaMezzo(mezzoBiciRoma, cittaRoma.nome);
    }
}

const utenteRegistratoMilano = cittaMilano.ottieniUtente('luca.bianchi@example.com');
if (utenteRegistratoMilano) {
    const monopattinoMilano = cittaMilano.mezziDisponibili.find(m => m.tipo === 'monopattino');
    if (monopattinoMilano) {
        utenteRegistratoMilano.prenotaMezzo(monopattinoMilano, cittaMilano.nome);
    }
}
