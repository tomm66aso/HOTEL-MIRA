# Hotel Ristorante Mira — Sito Web

Sito statico moderno per Hotel Ristorante Mira, Sestri Levante.  
Stack: HTML · CSS · JavaScript · Supabase (form prenotazioni) · Vercel (hosting)

---

## Struttura

```
hotel-mira/
├── index.html            ← pagina principale (single-page)
├── css/style.css         ← tutti gli stili
├── js/
│   ├── supabase-config.js  ← configura qui URL e chiave Supabase
│   └── main.js           ← nav, reveal, form, Supabase
├── assets/
│   ├── logo-dark.png     ← wordmark su sfondo chiaro
│   ├── logo-white.png    ← wordmark su sfondo scuro
│   ├── logo-circle.png   ← logo circolare (footer)
│   ├── favicon.png
│   └── img/
│       ├── hotel.jpg       ← sostituisci con foto reale camere/veduta
│       ├── ristorante.jpg  ← sostituisci con foto reale ristorante
│       ├── sestri.jpg      ← sostituisci con foto reale di Sestri Levante
│       └── storia.jpg      ← (usata eventualmente in sezioni future)
├── supabase/schema.sql   ← SQL da eseguire in Supabase
├── vercel.json
└── README.md
```

---

## 1 — Anteprima locale

Apri `index.html` direttamente nel browser — nessun server necessario.  
Per un test completo con live-reload:
```bash
npx serve .
# oppure
python3 -m http.server 3000
```

---

## 2 — Deploy su GitHub + Vercel

1. Crea un repo su GitHub e pusha questa cartella:
   ```bash
   git init
   git add .
   git commit -m "feat: sito Hotel Mira"
   git remote add origin https://github.com/TUO_UTENTE/hotel-mira.git
   git push -u origin main
   ```
2. Su [vercel.com](https://vercel.com) → **New Project** → importa il repo.
3. Vercel rileva automaticamente il sito statico. Clicca **Deploy**.
4. Ogni push su `main` aggiorna il sito automaticamente.

---

## 3 — Configura Supabase (form prenotazioni)

Senza Supabase il form funziona comunque via `mailto:` — un client email
si apre con i dati pre-compilati. Per salvare le richieste nel database:

1. Crea un progetto gratuito su [supabase.com](https://supabase.com).
2. Dashboard → **SQL Editor** → incolla ed esegui `supabase/schema.sql`.
3. Dashboard → **Settings → API**:
   - copia **Project URL** e **anon public key**
4. Apri `js/supabase-config.js` e sostituisci i placeholder:
   ```js
   window.SUPABASE_URL  = 'https://xxxxx.supabase.co';
   window.SUPABASE_ANON = 'eyJhbGci...';
   ```
5. Visualizza le richieste: Dashboard → **Table Editor → prenotazioni**.

---

## 4 — Sostituisci le immagini

Le immagini in `assets/img/` sono illustrazioni di placeholder.
Per usare le foto reali dell'hotel:

| File              | Dimensione consigliata | Contenuto suggerito              |
|-------------------|------------------------|----------------------------------|
| `hotel.jpg`       | 1500 × 1050 px         | Vista mare dalle camere / facade |
| `ristorante.jpg`  | 1500 × 1050 px         | Sala o veranda del ristorante    |
| `sestri.jpg`      | 1500 × 1050 px         | Panorama Baia del Silenzio       |

Salva i file con gli stessi nomi — nessun'altra modifica necessaria.

---

## 5 — Personalizzazioni rapide

| Cosa cambiare         | Dove                             |
|-----------------------|----------------------------------|
| Numeri di telefono    | `index.html` (footer + sezione contatti) |
| Email                 | `index.html` + `js/main.js`      |
| Colore principale     | `css/style.css` → `--coral`      |
| Testi delle sezioni   | `index.html`                     |
| Prezzi / disponibilità | Integra un motore di prenotazione (es. Booking Suite, Octorate) sostituendo la sezione `#prenota` |

---

## Contatti sito

Sviluppato con ❤ per Hotel Ristorante Mira · Sestri Levante, Liguria.
