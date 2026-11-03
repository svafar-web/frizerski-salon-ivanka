# Upute za uređivanje web stranice

Ove upute su za vlasnicu salona ili osobu koja joj pomaže. Ne treba znati programirati.

## Najvažnije pravilo

Sve što se mijenja (telefon, radno vrijeme, obavijest, usluge, cijene, slike u galeriji,
podaci o obrtu) nalazi se u **jednoj datoteci**:

```
content/site-data.json
```

Ništa drugo ne treba dirati. Nakon što promijenite tu datoteku i objavite promjenu,
stranica se sama ponovno izradi na hrvatskom i engleskom.

### Kako izgleda ta datoteka

Datoteka je običan tekst. Svaki podatak ima svoje ime, dvotočku i vrijednost u navodnicima:

```
"phoneDisplay": "021 568 427",
```

Pravila koja treba poštovati da se ništa ne pokvari:

- Mijenjajte samo tekst **unutar navodnika** desno od dvotočke.
- Ne brišite navodnike, zareze, vitičaste zagrade `{ }` ni uglate zagrade `[ ]`.
- Ne mijenjajte imena lijevo od dvotočke (npr. `"phoneDisplay"`).
- Retci koji počinju s `"_` (npr. `"_upute"`) su samo objašnjenja i ne prikazuju se na stranici.

## Kako promijeniti nešto (3 koraka)

Stranica se nalazi na GitHubu (to je mjesto gdje su spremljene datoteke). Pristup ima osoba
koja je stranicu postavila; ona vam može dati korisnički račun.

1. Otvorite u pregledniku: `https://github.com/svafar/frizerski-salon-ivanka/blob/main/content/site-data.json`
2. Kliknite ikonu olovke (gore desno, „Edit this file”). Promijenite što trebate.
3. Kliknite zeleni gumb **Commit changes…** i još jednom **Commit changes**.

Za otprilike dvije minute promjena je vidljiva na stranici
(`https://svafar.github.io/frizerski-salon-ivanka/`). Osvježite stranicu u pregledniku
(na mobitelu povucite prema dolje).

## Radno vrijeme

U datoteci potražite dio `"hours"`. Izgleda ovako:

```
"hours": {
  "mon": ["08:00", "15:00"],
  "tue": ["08:00", "15:00"],
  "wed": ["13:00", "20:00"],
  "thu": ["13:00", "20:00"],
  "fri": ["13:00", "20:00"],
  "sat": ["08:00", "13:00"],
  "sun": null
}
```

- `mon` = ponedjeljak, `tue` = utorak, `wed` = srijeda, `thu` = četvrtak, `fri` = petak, `sat` = subota, `sun` = nedjelja.
- Prvo vrijeme je otvaranje, drugo zatvaranje. Uvijek s četiri znamenke i dvotočkom, npr. `"09:00"`, `"17:30"`.
- Ako ste neki dan zatvoreni, umjesto zagrada upišite `null` (bez navodnika): `"sun": null`.

Primjer: subotom radite do 14 sati → `"sat": ["08:00", "14:00"],`

Radno vrijeme na stranici, natpis „Sada otvoreno / zatvoreno” i podaci koje čita Google svi se
uzimaju odavde, pa je dovoljno promijeniti na jednom mjestu.

**Važno:** isto radno vrijeme promijenite i na Googleu (Google poslovni profil) i na Facebooku,
da se posvuda slaže.

## Obavijest na vrhu stranice (godišnji odmor, blagdan)

Potražite `"notice"`:

```
"notice": {
  "hr": "",
  "en": ""
}
```

Upišite tekst između navodnika, na hrvatskom i engleskom:

```
"notice": {
  "hr": "Salon je zatvoren od 1. do 15. kolovoza. Vidimo se 16. kolovoza!",
  "en": "The salon is closed from 1 to 15 August. See you on 16 August!"
}
```

Obavijest se prikazuje kao tamna traka ispod zaglavlja. Kad je više ne trebate, obrišite
tekst tako da ostanu samo prazni navodnici `""`, kao gore. Tada se traka ne prikazuje.

## Tekst „O nama”

Potražite `"about"`. Svaki redak u listi `"hr"` (hrvatski) i `"en"` (engleski) je jedan odlomak.
Slika uz tekst je `"image"` (naziv datoteke iz `images/source` bez `.jpg`), a `"alt"` je kratak opis slike.

## Cijene i usluge

Potražite `"services"`. Svaka grupa usluga izgleda ovako:

```
{
  "id": "sisanje",
  "name": { "hr": "Šišanje i styling", "en": "Cuts and styling" },
  "desc": { "hr": "…", "en": "…" },
  "price": "",
  "items": [],
  "image": "plavi-bob"
},
```

- **Cijena grupe**: upišite tekst u `"price"`, npr. `"price": "od 20 €"`. Dok je prazno (`""`), piše „Cijena na upit”.
- **Pojedinačne stavke s cijenama** (neobavezno): u `"items"` dodajte retke ovako:

```
"items": [
  { "name": { "hr": "Žensko šišanje", "en": "Women's haircut" }, "price": "20 €" },
  { "name": { "hr": "Feniranje", "en": "Blow-dry" }, "price": "od 15 €" }
],
```

Pazite na zarez između stavki i da zadnja stavka nema zarez iza sebe.

- **Opis usluge**: promijenite tekst u `"desc"` → `"hr"` i `"en"`.

## Zamjena ili dodavanje fotografije

Za ovaj korak treba računalo na kojem je instaliran program Node.js (osoba koja je stranicu
postavila to ima). Ako ga nemate, pošaljite fotografiju toj osobi.

1. Koristite samo vlastite fotografije salona, s pristankom klijentice ako joj se vidi lice.
2. Fotografiju nazovite malim slovima bez razmaka i bez kvačica, s crticama, npr. `crvena-kosa-kovrce.jpg`.
3. Stavite je u mapu `images/source/`.
4. U datoteci `site-data.json` u dio `"gallery"` dodajte redak (naziv datoteke bez `.jpg`):

```
{ "file": "crvena-kosa-kovrce", "alt": { "hr": "Crvena kosa s kovrčama", "en": "Red hair with curls" } },
```

   Tekst u `"alt"` je kratak opis frizure. Čitaju ga tražilice i slijepe osobe, zato napišite što se vidi.
   Redoslijed redaka u `"gallery"` je redoslijed slika na stranici. Redak obrišite da uklonite sliku.
   Tri slike u zaglavlju stranice određuje `"hero"`.
5. U mapi stranice pokrenite (u programu „Terminal” ili „Command Prompt”):

```
npm run images
npm run build
```

6. Objavite promjenu (dolje).

Ako zamjenjujete staru fotografiju novom, dajte novoj **novi naziv** (stari naziv ostaje
zapamćen u preglednicima do godinu dana).

## Telefon, adresa, društvene mreže

Sve je u dijelu `"site"`. Telefon je na tri mjesta: `"phoneDisplay"` (kako se prikazuje),
`"phoneDisplayIntl"` (na engleskoj stranici) i `"phoneTel"` (broj koji se bira kad se klikne,
bez razmaka, s +385). Promijenite sva tri.

Ako ne želite prikazivati Messenger, stavite `"showMessenger": false`.

## Poruke (SMS) sa stranice

Na stranici postoji dio „Zatražite termin porukom”. Klijentica odgovori na tri pitanja, a stranica
sastavi SMS koji ona pošalje sa svog mobitela na broj salona (021 568 427). Stranica sama ništa ne
šalje i ništa ne sprema. **Važno:** na te poruke treba odgovoriti (porukom ili pozivom), inače
klijentica čeka. Ako ne želite primati takve poruke, javite osobi koja održava stranicu da isključi taj dio.

## Recenzije

Stranica ne izmišlja recenzije. Ako želite prikazati prave recenzije klijentica (uz njihov
pristanak), upišite ih u datoteku `content/reviews.md` ovako:

```
## Ana
Odlična frizerka, uvijek izađem zadovoljna.

## Marija
Super boja, točno kakvu sam htjela.
```

Dok je datoteka prazna, na stranici stoji samo rečenica o postotku preporuka na Facebooku.

## Podaci o obrtu (žuto označeno)

Sve što je na stranici označeno **žutom bojom** su podaci koje još treba upisati: naziv obrta,
OIB, registar, upute kako doći. Nalaze se u dijelovima `"legal"` i `"directions"`. Zamijenite
tekst u uglatim zagradama pravim podatkom, npr.:

```
"name": "Frizerski salon Ivanka, vl. Ivanka [PREZIME]",
"oib": "12345678901",
```

Dok god je negdje tekst u uglatim zagradama `[OVAKO]`, provjera `npm run check` javlja grešku,
a na stranici je žuto. To je namjerno, da se ne zaboravi.

## Objava promjene

- **Preko GitHuba (najjednostavnije):** uredite datoteku kako je opisano gore i kliknite *Commit changes*. GitHub sam izradi i objavi novu verziju za oko dvije minute (na kartici *Actions* vidi se zelena kvačica kad je gotovo).
- **Ako je netko mijenjao datoteke na računalu** (npr. dodao fotografije): pošaljite promjene na GitHub (program GitHub Desktop: *Commit* pa *Push*). Objava je opet automatska.

## Ako se nešto pokvari

Najčešći uzrok je obrisan navodnik ili zarez u `site-data.json`. Na GitHubu otvorite datoteku,
kliknite *History* i vratite prethodnu verziju, ili javite osobi koja održava stranicu.
Stara verzija stranice ostaje online dok se nova ne izradi uspješno, tako da posjetitelji
nikad ne vide pokvarenu stranicu.
