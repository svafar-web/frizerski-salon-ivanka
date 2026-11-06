// UI strings for both languages. Business data lives in content/site-data.json;
// these are only the fixed words of the interface.
export const strings = {
  hr: {
    lang: 'hr',
    htmlLang: 'hr',
    title: 'Frizerski salon Ivanka – frizer u Splitu | Drage Ivaniševića 18',
    description: 'Frizerski salon Ivanka u Splitu: šišanje, bojanje, pramenovi, kreativne boje i svečane frizure. Drage Ivaniševića 18. Naručite se telefonom: 095 855 5532.',
    skip: 'Preskoči na sadržaj',
    nav: { services: 'Usluge', gallery: 'Galerija', hours: 'Radno vrijeme', contact: 'Kontakt' },
    switchLabel: 'Jezik',
    callShort: 'Nazovi',
    callAria: 'Nazovi salon: {phone}',
    callCta: 'Nazovite i naručite se: {phone}',
    phoneOnly: 'Termine dogovaramo isključivo telefonom.',
    heroTagline: 'Šišanje, bojanje i styling u Splitu. Od tople plave i bakrene do ružičaste, ljubičaste i plave – boja je naš potpis.',
    about: { heading: 'O nama', eyebrow: 'Tko smo' },
    eyebrows: { services: 'Što radimo', gallery: 'Naši radovi', hours: 'Kad smo tu', contact: 'Gdje smo' },
    faq: { heading: 'Česta pitanja', title: 'Česta pitanja – Frizerski salon Ivanka', description: 'Odgovori na česta pitanja o naručivanju, bojama, proizvodima i radnom vremenu Frizerskog salona Ivanka u Splitu.', back: '← Natrag na početnu' },
    request: {
      eyebrow: 'Zatražite termin',
      heroLink: 'Radije pišete? Zatražite termin porukom →',
      heading: 'Zatražite termin porukom',
      open: 'Zatražite termin porukom',
      noJs: 'Pošaljite nam SMS na {phone} i napišite što želite i kad Vam odgovara.',
      stepOf: 'Korak {i} od {n}',
      q1: 'Što želite?', q1hint: 'Možete odabrati više stvari.', q1error: 'Odaberite barem jedno.',
      q2: 'Kad Vam odgovara?',
      days: [['pon', 'Pon'], ['uto', 'Uto'], ['sri', 'Sri'], ['cet', 'Čet'], ['pet', 'Pet'], ['sub', 'Sub']],
      dayPhrase: { pon: 'ponedjeljak', uto: 'utorak', sri: 'srijeda', cet: 'četvrtak', pet: 'petak', sub: 'subota' },
      parts: [['', 'Bilo kad'], ['ujutro', 'Ujutro'], ['popodne', 'Popodne']],
      partPhrase: { ujutro: ' ujutro', popodne: ' popodne' },
      q3: 'Vaše ime', q3hint: 'Nije obavezno. Možete preskočiti.',
      next: 'Dalje', back: 'Natrag', finish: 'Sastavi poruku', done: 'Gotovo', close: 'Zatvori',
      previewLabel: 'Vaša poruka',
      msg: { hi: 'Bok!', iam: 'Ja sam {name}.', want: 'Zanima me {services}.', when: 'Odgovara mi {days}{part}.', ask: 'Kad imate termin? Hvala!' },
      and: ' i ', or: ' ili ',
      send: 'Pošalji SMS',
      sendHint: 'Otvara se Vaša aplikacija za poruke s gotovim tekstom. Vi ga pošaljete.',
      copy: 'Kopiraj poruku', copied: 'Kopirano!',
      qrTitle: 'Na računalu ste?',
      qrHint: 'Skenirajte kod kamerom mobitela i poruka se otvori spremna za slanje.',
      smsNote: 'Poruka ide na {phone}. Termine potvrđujemo porukom ili pozivom.'
    },

    heroImgAlt: 'Radovi salona: ',
    openStatusLoading: 'Radno vrijeme pogledajte niže.',
    remind: { label: 'Podsjeti me kad otvorimo', hint: 'Dodaje podsjetnik u Vaš kalendar, s brojem telefona.', title: 'Nazvati Frizerski salon Ivanka', desc: 'Naručite se telefonom ili porukom: 095 855 5532.', file: 'podsjetnik-salon-ivanka.ics' },
    services: {
      heading: 'Usluge',
      intro: 'Sve frizerske usluge za žene – od šišanja i feniranja do potpune promjene boje.',
      unsure: 'Niste sigurni što Vam treba? {link} pa ćemo dogovoriti.',
      unsureLink: 'Nazovite nas'
    },
    gallery: {
      heading: 'Galerija',
      intro: 'Nekoliko radova iz salona. Sve fotografije su naše klijentice, objavljene uz njihov pristanak.',
      more: 'Više radova na Instagramu →',
      filterLabel: 'Pokaži:',
      all: 'Sve',
      number: 'Rad br. {n}',
      mention: 'Kad nazovete, recite nam broj slike.',
      empty: 'Nema slika u ovoj grupi.',
      open: 'Povećaj sliku: {alt}',
      close: 'Zatvori',
      prev: 'Prethodna slika',
      next: 'Sljedeća slika',
      counter: '{i} / {n}',
      credit: 'Šminka: {credit}'
    },
    hours: {
      heading: 'Radno vrijeme',
      intro: 'Pazite: ponedjeljkom i utorkom radimo ujutro, od srijede do petka poslijepodne.',
      colDay: 'Dan',
      colTime: 'Radno vrijeme',
      closed: 'Zatvoreno',
      today: 'danas',
      holidays: 'Blagdanima radno vrijeme može biti drukčije – najbolje je nazvati.',
      days: ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'],
      status: {
        openNow: 'Sada otvoreno · zatvaramo u {t}',
        opensToday: 'Sada zatvoreno · otvaramo danas u {t}',
        opensTomorrow: 'Sada zatvoreno · otvaramo sutra u {t}',
        opensOn: 'Sada zatvoreno · otvaramo {d} u {t}',
        sunday: 'Zatvoreno nedjeljom · otvaramo u ponedjeljak u {t}',
        daysOn: ['u ponedjeljak', 'u utorak', 'u srijedu', 'u četvrtak', 'u petak', 'u subotu', 'u nedjelju']
      }
    },
    reviews: {
      heading: 'Što kažu klijentice',
      summary: '{percent}% preporuka na Facebooku ({count} {word})',
      google: '{rating} na Googleu ({count} {word})'
    },
    contact: {
      heading: 'Kontakt i lokacija',
      addressLabel: 'Lokacija',
      phoneLabel: 'Kontakt',
      messenger: 'Pitanja: poruka na Messengeru',
      messengerNote: 'Za pitanja. Termine dogovaramo telefonom.',
      instagram: 'Instagram',
      facebook: 'Facebook',
      mapHeading: 'Kako do nas',
      openMaps: 'Otvori u kartama'
    },
    bottomBar: { call: 'Nazovi', directions: 'Upute', directionsAria: 'Upute do salona u Google Kartama' },
    footer: {
      hoursSummary: 'Pon–Uto 08–15 · Sri–Pet 13–20 · Sub 08–13 · Ned zatvoreno',
      privacy: 'Privatnost',
      faq: 'Česta pitanja',
      legalHeading: 'Podaci o pružatelju usluge',
      oib: 'OIB',
      register: 'Registar'
    },
    privacy: {
      title: 'Privatnost – Frizerski salon Ivanka',
      heading: 'Privatnost',
      back: '← Natrag na početnu',
      body: [
        'Ova web stranica ne prikuplja nikakve osobne podatke.',
        'Stranica ne koristi kolačiće, ne prati posjetitelje, nema analitiku ni oglase. Nema obrazaca za slanje podataka. Zbog toga nema ni obavijesti o kolačićima.',
        'Stranica se prikazuje s poslužitelja GitHub Pages. Kao i svaki web poslužitelj, GitHub tehnički obrađuje IP adresu posjetitelja da bi stranicu mogao isporučiti.',
        'Na stranici se nalaze poveznice na Facebook, Instagram, Messenger te Google i Apple karte. Kad kliknete na njih, napuštate ovu stranicu i vrijede pravila privatnosti tih usluga.',
        'Ako nas nazovete, Vaš broj vidimo kao i kod svakog poziva. Ne spremamo ga nigdje osim ako to sami ne zatražite (npr. za podsjetnik na termin).',
        'Za sva pitanja o privatnosti nazovite nas ili se javite u salon.'
      ]
    },
    notFound: {
      title: 'Stranica nije pronađena – Frizerski salon Ivanka',
      heading: 'Stranica nije pronađena',
      text: 'Ova stranica ne postoji ili je premještena. Najbrže je da nas nazovete ili odete na početnu stranicu.',
      home: 'Početna stranica'
    },
    ogAlt: 'Frizerski salon Ivanka, Split'
  },

  en: {
    lang: 'en',
    htmlLang: 'en',
    title: 'Hair Salon Ivanka – hairdresser in Split, Croatia | Drage Ivaniševića 18',
    description: 'Hair Salon Ivanka in Split, Croatia: cuts, colour, highlights, creative colour and occasion hair. Drage Ivaniševića 18. Book by phone: +385 95 855 5532.',
    skip: 'Skip to content',
    nav: { services: 'Services', gallery: 'Gallery', hours: 'Opening hours', contact: 'Contact' },
    switchLabel: 'Language',
    callShort: 'Call',
    callAria: 'Call the salon: {phone}',
    callCta: 'Call to book: {phone}',
    phoneOnly: 'Appointments are made by phone only.',
    heroTagline: 'Cuts, colour and styling in Split. From warm blondes and coppers to pink, violet and blue, colour is our signature.',
    about: { heading: 'About us', eyebrow: 'Who we are' },
    eyebrows: { services: 'What we do', gallery: 'Our work', hours: 'When we are open', contact: 'Where to find us' },
    faq: { heading: 'Frequently asked questions', title: 'FAQ – Hair Salon Ivanka', description: 'Answers to common questions about booking, colour, products and opening hours at Hair Salon Ivanka in Split.', back: '← Back to the home page' },
    request: {
      eyebrow: 'Request an appointment',
      heroLink: 'Prefer texting? Request an appointment by message →',
      heading: 'Request an appointment by text',
      open: 'Request an appointment by text',
      noJs: 'Text us on {phone} with what you would like and when suits you.',
      stepOf: 'Step {i} of {n}',
      q1: 'What would you like?', q1hint: 'You can pick more than one.', q1error: 'Pick at least one.',
      q2: 'When suits you?',
      days: [['pon', 'Mon'], ['uto', 'Tue'], ['sri', 'Wed'], ['cet', 'Thu'], ['pet', 'Fri'], ['sub', 'Sat']],
      dayPhrase: { pon: 'Monday', uto: 'Tuesday', sri: 'Wednesday', cet: 'Thursday', pet: 'Friday', sub: 'Saturday' },
      parts: [['', 'Any time'], ['ujutro', 'Morning'], ['popodne', 'Afternoon']],
      partPhrase: { ujutro: ' in the morning', popodne: ' in the afternoon' },
      q3: 'Your name', q3hint: 'Optional. You can skip this.',
      next: 'Next', back: 'Back', finish: 'Write the message', done: 'Done', close: 'Close',
      previewLabel: 'Your message',
      msg: { hi: 'Hi!', iam: "I'm {name}.", want: "I'd like {services}.", when: '{days}{part} would suit me.', ask: 'When do you have a free slot? Thanks!' },
      and: ' and ', or: ' or ',
      send: 'Send text message',
      sendHint: 'Opens your messaging app with the text ready. You press send.',
      copy: 'Copy message', copied: 'Copied!',
      qrTitle: 'On a computer?',
      qrHint: 'Scan the code with your phone camera and the message opens ready to send.',
      smsNote: 'The message goes to {phone}. We confirm appointments by text or by phone.'
    },

    heroImgAlt: 'Work from the salon: ',
    openStatusLoading: 'See opening hours below.',
    remind: { label: 'Remind me when you open', hint: 'Adds a reminder with the phone number to your calendar.', title: 'Call Hair Salon Ivanka', desc: 'Book by phone or text: +385 95 855 5532.', file: 'reminder-salon-ivanka.ics' },
    services: {
      heading: 'Services',
      intro: 'All hairdressing services for women, from a cut and blow-dry to a complete colour change.',
      unsure: 'Not sure what you need? {link} and we will work it out together.',
      unsureLink: 'Call us'
    },
    gallery: {
      heading: 'Gallery',
      intro: 'A few pieces of work from the salon. All photos are our own clients, shared with their consent.',
      more: 'More work on Instagram →',
      filterLabel: 'Show:',
      all: 'All',
      number: 'Work no. {n}',
      mention: 'Mention the number when you call.',
      empty: 'No photos in this group.',
      open: 'Enlarge image: {alt}',
      close: 'Close',
      prev: 'Previous image',
      next: 'Next image',
      counter: '{i} / {n}',
      credit: 'Make-up: {credit}'
    },
    hours: {
      heading: 'Opening hours',
      intro: 'Please note: mornings on Monday and Tuesday, afternoons Wednesday to Friday.',
      colDay: 'Day',
      colTime: 'Hours',
      closed: 'Closed',
      today: 'today',
      holidays: 'Hours may differ on public holidays. It is best to call first.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      status: {
        openNow: 'Open now · closes at {t}',
        opensToday: 'Closed now · opens today at {t}',
        opensTomorrow: 'Closed now · opens tomorrow at {t}',
        opensOn: 'Closed now · opens {d} at {t}',
        sunday: 'Closed on Sundays · opens Monday at {t}',
        daysOn: ['on Monday', 'on Tuesday', 'on Wednesday', 'on Thursday', 'on Friday', 'on Saturday', 'on Sunday']
      }
    },
    reviews: {
      heading: 'What clients say',
      summary: '{percent}% recommend on Facebook ({count} {word})',
      google: '{rating} on Google ({count} {word})'
    },
    contact: {
      heading: 'Contact and location',
      addressLabel: 'Location',
      phoneLabel: 'Contact',
      messenger: 'Questions: message us on Messenger',
      messengerNote: 'For questions. Appointments are made by phone.',
      instagram: 'Instagram',
      facebook: 'Facebook',
      mapHeading: 'How to find us',
      openMaps: 'Open in Maps'
    },
    bottomBar: { call: 'Call', directions: 'Directions', directionsAria: 'Directions to the salon in Google Maps' },
    footer: {
      hoursSummary: 'Mon–Tue 08–15 · Wed–Fri 13–20 · Sat 08–13 · Sun closed',
      privacy: 'Privacy',
      faq: 'FAQ',
      legalHeading: 'Service provider details',
      oib: 'OIB (tax ID)',
      register: 'Register'
    },
    privacy: {
      title: 'Privacy – Hair Salon Ivanka',
      heading: 'Privacy',
      back: '← Back to the home page',
      body: [
        'This website collects no personal data.',
        'It sets no cookies, does not track visitors and has no analytics or advertising. There are no forms. For that reason there is no cookie banner.',
        'The site is served by GitHub Pages. Like any web server, GitHub technically processes your IP address in order to deliver the page.',
        'The site links to Facebook, Instagram, Messenger, Google Maps and Apple Maps. When you follow those links you leave this site and the privacy policies of those services apply.',
        'If you call us, we see your number as with any phone call. We do not store it unless you ask us to (for example, for an appointment reminder).',
        'For any privacy question, call us or ask in the salon.'
      ]
    },
    notFound: {
      title: 'Page not found – Hair Salon Ivanka',
      heading: 'Page not found',
      text: 'This page does not exist or has moved. The quickest option is to call us or go to the home page.',
      home: 'Home page'
    },
    ogAlt: 'Hair Salon Ivanka, Split'
  }
};
