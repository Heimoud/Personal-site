// ===== WOMA PÊCHE – Script (menu, year, smooth scroll, i18n, Formspree) =====
document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile menu toggle ---
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });
  }

  // Close mobile nav after clicking a link (smooth scroll too)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: "smooth" });
        }
        if (mainNav) mainNav.classList.remove("nav-open");
      }
    });
  });

  // --- Footer year ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // --- i18n setup ---
  const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const langSelect = document.getElementById("langSwitch");

  const translations = {
    en: {
      // nav
      "nav.home": "Home",
      "nav.about": "About",
      "nav.factory": "Our Factory",
      "nav.compliance": "Compliance",
      "nav.products": "Products",
      "nav.shipment": "Shipment",
      "nav.contact": "Contact",

      // hero
      "hero.title": "Premium Mauritanian Seafood — direct from the ocean",
      "hero.subtitle": "High-quality, sustainably sourced seafood from the rich waters of Mauritania, processed in our EU-approved facility and delivered fresh-frozen to international markets.",
      "hero.button": "Request a quote",

      // about
      "about.heading": "About Our Company",
      "about.intro": "Founded in 2017, WOMA PÊCHE is a Mauritanian seafood processor and exporter delivering premium frozen products to international markets. We combine modern processing lines with strict HACCP controls and full traceability — from catch to container.",
      "about.tl.2018.title": "Factory Commissioned",
      "about.tl.2018.li1": "Nouadhibou facility brought online",
      "about.tl.2018.li2": "High-capacity freezing chambers",
      "about.tl.2018.li3": "Modern processing & filleting lines",
      "about.tl.2019.title": "EU Export Approval",
      "about.tl.2019.text": "Sanitary agreement obtained; compliant with Mauritanian and EU standards.",
      "about.tl.2023.title": "Capacity Expansion",
      "about.tl.2023.text": "Upgraded infrastructure with international funding — capacity tripled.",

      // factory
      "factory.heading": "Our Factory",
      "factory.intro": "Located in Nouadhibou, Mauritania, our EU-approved facility is equipped with advanced freezing and processing technology to ensure freshness, safety, and quality for international seafood markets.",
      "factory.fact.founded": "Founded",
      "factory.fact.employees": "Employees",
      "factory.fact.storage": "Storage Capacity",
      "factory.details.processing.title": "Processing & Equipment",
      "factory.details.processing.li1": "Two cold rooms — <strong>250 tons each</strong>",
      "factory.details.processing.li2": "Two freezing tunnels (<strong>10 tons</strong> each) + one (<strong>5 tons</strong>)",
      "factory.details.processing.li3": "Dedicated filleting & processing rooms",
      "factory.details.processing.li4": "<strong>0°C</strong> chill room for fresh handling",
      "factory.details.processing.li5": "By-products & waste management area",
      "factory.details.quality.title": "Quality & Safety",
      "factory.details.quality.li1": "Compliant with Mauritanian & EU food standards",
      "factory.details.quality.li2": "Each shipment includes an official <strong>health certificate</strong>",
      "factory.details.quality.li3": "<strong>SGS</strong> inspections available before any order",

      // quality & compliance
      "qc.heading": "Quality & Compliance",
      "qc.intro": "Certified, inspected, and fully traceable — our seafood meets the highest international standards.",
      "qc.card.standards.title": "International Standards",
      "qc.card.standards.text": "EU export approval and strict HACCP food safety controls at every stage.",
      "qc.card.standards.cta": "Download Certificate",
      "qc.card.standards.meta": "PDF • 1 page",
      "qc.card.trace.title": "Full Traceability",
      "qc.card.trace.text": "From catch to container — complete product documentation.",
      "qc.card.sgs.title": "SGS Safety Partner",
      "qc.card.sgs.text": "Independent inspections available prior to any order.",

      // products
      "products.heading": "Main Products",
      "products.intro": "Premium seafood sourced in FAO 34 and processed to export standards.",
      "products.octopus.title": "Octopus",
      "products.octopus.types": "<strong>Types:</strong> TAKO 1–8; PR 1–4",
      "products.lobster.title": "Spiny Lobster",
      "products.crab.title": "Crab",
      "products.squid.title": "Squid",
      "products.squid.types": "<strong>Types:</strong> GG , G , M , MIX , P , 2P , 3P , 4P",
      "products.seabream.title": "Gilthead Seabream",
      "products.bottarga.title": "Boutargue (Bottarga)",

      // shipment
      "shipment.heading": "Shipment",
      "shipment.intro": "We work with world-class shipping partners to ensure fast, secure, and traceable deliveries across the globe. All our seafood products are loaded in temperature-controlled containers and shipped under strict compliance with international maritime and food safety regulations.",
      "shipment.li1": "Transit time: 2–4 weeks depending on destination",
      "shipment.li2": "Temperature control: Maintained at -18°C or below",
      "shipment.li3": "Export and Safety Documentation:",
      "shipment.docs.health": "Health Certificate",
      "shipment.docs.bol": "Bill of Lading",
      "shipment.docs.origin": "Certificate of Origin",
      "shipment.docs.packing": "Packing List",
      "shipment.partners.title": "Shipping Partners",
      "shipment.partners.text": "We work with trusted global carriers to ensure reliable, on-time deliveries worldwide.",

      // contact
      "contact.heading": "Get in Touch",
      "contact.intro": "Tell us about your needs — product specs, volumes, destination, and timelines.",
      "form.name": "Name",
      "form.company": "Company",
      "form.email": "Email",
      "form.phone": "Phone / WhatsApp",
      "form.products": "Product(s) of Interest",
      "form.message": "Message",
      "form.send": "Send Message",
      "form.reset": "Reset",
      "contact.direct": "Direct Contact",
      "contact.email.label": "Email",
      "contact.phone.label": "Phone / WhatsApp",
      "contact.address.label": "Address",
      "contact.address.value": "Industrial Zone, Nouadhibou, Mauritania",
      "contact.hours.label": "Hours",
      "contact.hours.value": "Mon — Sat: 07:00 — 20:00 GMT",

      // form feedback
      "form.sending": "Sending…",
      "form.success": "Thanks! Your message has been sent.",
      "form.error.required": "Please fill the required fields (Company, Email, Message).",
      "form.error.generic": "Something went wrong. Please try again.",
      "form.error.network": "Network error. Please try again.",
"factory.fact.storage": "Storage Capacity",
"factory.fact.storage.unit": "t/day",
"form.responseNote": "We will respond within 24 hours.",


    },

    es: {
      "nav.home": "Inicio",
      "nav.about": "Sobre nosotros",
      "nav.factory": "Nuestra planta",
      "nav.compliance": "Cumplimiento",
      "nav.products": "Productos",
      "nav.shipment": "Envíos",
      "nav.contact": "Contacto",

      "hero.title": "Mariscos premium de Mauritania — directo del océano",
      "hero.subtitle": "Productos de mar de alta calidad y origen sostenible de las ricas aguas de Mauritania, procesados en nuestra planta aprobada por la UE y entregados ultracongelados a mercados internacionales.",
      "hero.button": "Solicitar cotización",

      "about.heading": "Sobre Nuestra Empresa",
      "about.intro": "Fundada en 2017, WOMA PÊCHE es una procesadora y exportadora mauritana de mariscos premium. Combinamos líneas modernas con estrictos controles HACCP y trazabilidad total — desde la captura hasta el contenedor.",
      "about.tl.2018.title": "Puesta en Marcha de la Planta",
      "about.tl.2018.li1": "Planta de Nuadibú en operación",
      "about.tl.2018.li2": "Cámaras de congelación de alta capacidad",
      "about.tl.2018.li3": "Líneas modernas de procesamiento y fileteado",
      "about.tl.2019.title": "Aprobación de Exportación UE",
      "about.tl.2019.text": "Acuerdo sanitario obtenido; conforme a normas de Mauritania y de la UE.",
      "about.tl.2023.title": "Ampliación de Capacidad",
      "about.tl.2023.text": "Infraestructura modernizada con financiación internacional — capacidad triplicada.",

      "factory.heading": "Nuestra Planta",
      "factory.intro": "Ubicada en Nuadibú, Mauritania, nuestra planta aprobada por la UE cuenta con tecnología avanzada de congelación y procesamiento para garantizar frescura, seguridad y calidad.",
      "factory.fact.founded": "Fundación",
      "factory.fact.employees": "Empleados",
      "factory.fact.storage": "Capacidad de Almacenamiento",
      "factory.details.processing.title": "Procesamiento y Equipos",
      "factory.details.processing.li1": "Dos cámaras frigoríficas — <strong>250 toneladas cada una</strong>",
      "factory.details.processing.li2": "Dos túneles de congelación (<strong>10 t</strong> cada uno) + uno (<strong>5 t</strong>)",
      "factory.details.processing.li3": "Salas dedicadas a fileteado y procesamiento",
      "factory.details.processing.li4": "Sala de conservación a <strong>0°C</strong>",
      "factory.details.processing.li5": "Área de subproductos y gestión de residuos",
      "factory.details.quality.title": "Calidad y Seguridad",
      "factory.details.quality.li1": "Conforme a normas alimentarias de Mauritania y la UE",
      "factory.details.quality.li2": "Cada envío incluye un <strong>certificado sanitario</strong> oficial",
      "factory.details.quality.li3": "Inspecciones de <strong>SGS</strong> disponibles antes de cualquier pedido",

      "qc.heading": "Calidad y Cumplimiento",
      "qc.intro": "Certificados, inspeccionados y totalmente trazables — nuestros productos cumplen los estándares internacionales más altos.",
      "qc.card.standards.title": "Normas Internacionales",
      "qc.card.standards.text": "Aprobación de exportación UE y estrictos controles HACCP en todas las etapas.",
      "qc.card.standards.cta": "Descargar certificado",
      "qc.card.standards.meta": "PDF • 1 página",
      "qc.card.trace.title": "Trazabilidad Total",
      "qc.card.trace.text": "Desde la captura hasta el contenedor — documentación completa.",
      "qc.card.sgs.title": "Socio de Seguridad SGS",
      "qc.card.sgs.text": "Inspecciones independientes disponibles antes de cualquier pedido.",

      "products.heading": "Productos Principales",
      "products.intro": "Mariscos premium FAO 34, procesados con estándares de exportación.",
      "products.octopus.title": "Pulpo",
      "products.octopus.types": "<strong>Tipos:</strong> TAKO 1–8; PR 1–4",
      "products.lobster.title": "Langosta Espinosa",
      "products.crab.title": "Cangrejo",
      "products.squid.title": "Calamar",
      "products.squid.types": "<strong>Tipos:</strong> GG , G , M , MIX , P , 2P , 3P , 4P",
      "products.seabream.title": "Dorada (Sparus aurata)",
      "products.bottarga.title": "Bótarga",

      "shipment.heading": "Envíos",
      "shipment.intro": "Trabajamos con navieras de clase mundial para garantizar entregas rápidas, seguras y trazables en todo el mundo. Enviamos en contenedores refrigerados cumpliendo normativas marítimas y alimentarias.",
      "shipment.li1": "Tiempo de tránsito: 2–4 semanas según destino",
      "shipment.li2": "Control de temperatura: -18°C o inferior",
      "shipment.li3": "Documentación de Exportación y Seguridad:",
      "shipment.docs.health": "Certificado Sanitario",
      "shipment.docs.bol": "Conocimiento de Embarque",
      "shipment.docs.origin": "Certificado de Origen",
      "shipment.docs.packing": "Lista de Empaque",
      "shipment.partners.title": "Socios de Envío",
      "shipment.partners.text": "Trabajamos con transportistas globales confiables para entregas puntuales.",

      "contact.heading": "Ponte en Contacto",
      "contact.intro": "Cuéntanos tus necesidades: especificaciones, volúmenes, destino y plazos.",
      "form.name": "Nombre",
      "form.company": "Empresa",
      "form.email": "Correo electrónico",
      "form.phone": "Teléfono / WhatsApp",
      "form.products": "Producto(s) de interés",
      "form.message": "Mensaje",
      "form.send": "Enviar Mensaje",
      "form.reset": "Restablecer",
      "contact.direct": "Contacto Directo",
      "contact.email.label": "Correo",
      "contact.phone.label": "Teléfono / WhatsApp",
      "contact.address.label": "Dirección",
      "contact.address.value": "Zona Industrial, Nuadibú, Mauritania",
      "contact.hours.label": "Horario",
      "contact.hours.value": "Lun — Sáb: 07:00 — 20:00 GMT",

      "form.sending": "Enviando…",
      "form.success": "¡Gracias! Tu mensaje ha sido enviado.",
      "form.error.required": "Completa los campos obligatorios (Empresa, Correo, Mensaje).",
      "form.error.generic": "Algo salió mal. Inténtalo de nuevo.",
      "form.error.network": "Error de red. Inténtalo de nuevo.",
"factory.fact.storage": "Capacidad de Almacenamiento",
"factory.fact.storage.unit": "t/día",
"form.responseNote": "Responderemos en un plazo de 24 horas.",


    },

    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.factory": "Notre usine",
      "nav.compliance": "Conformité",
      "nav.products": "Produits",
      "nav.shipment": "Expédition",
      "nav.contact": "Contact",

      "hero.title": "Produits de la mer mauritaniens premium — directement de l’océan",
      "hero.subtitle": "Des produits de la mer de haute qualité et durables des riches eaux de Mauritanie, transformés dans notre usine agréée UE et livrés surgelés aux marchés internationaux.",
      "hero.button": "Demander un devis",

      "about.heading": "À propos de notre entreprise",
      "about.intro": "Fondée en 2017, WOMA PÊCHE est une entreprise mauritanienne de transformation et d’exportation de produits de la mer premium. Nous combinons des lignes modernes avec des contrôles HACCP stricts et une traçabilité complète — de la capture au conteneur.",
      "about.tl.2018.title": "Mise en service de l’usine",
      "about.tl.2018.li1": "Mise en ligne du site de Nouadhibou",
      "about.tl.2018.li2": "Chambres de congélation haute capacité",
      "about.tl.2018.li3": "Lignes modernes de transformation et de filetage",
      "about.tl.2019.title": "Approbation d’exportation UE",
      "about.tl.2019.text": "Accord sanitaire obtenu ; conforme aux normes mauritaniennes et européennes.",
      "about.tl.2023.title": "Augmentation de capacité",
      "about.tl.2023.text": "Infrastructures modernisées avec un financement international — capacité triplée.",

      "factory.heading": "Notre usine",
      "factory.intro": "Située à Nouadhibou, Mauritanie, notre usine agréée UE est équipée de technologies avancées de congélation et de transformation garantissant fraîcheur, sécurité et qualité.",
      "factory.fact.founded": "Fondation",
      "factory.fact.employees": "Employés",
      "factory.fact.storage": "Capacité de stockage",
      "factory.details.processing.title": "Transformation & Équipements",
      "factory.details.processing.li1": "Deux chambres froides — <strong>250 tonnes chacune</strong>",
      "factory.details.processing.li2": "Deux tunnels de congélation (<strong>10 t</strong>) + un (<strong>5 t</strong>)",
      "factory.details.processing.li3": "Salles dédiées au filetage et à la transformation",
      "factory.details.processing.li4": "Salle à <strong>0°C</strong> pour le frais",
      "factory.details.processing.li5": "Zone des sous-produits et gestion des déchets",
      "factory.details.quality.title": "Qualité & Sécurité",
      "factory.details.quality.li1": "Conforme aux normes alimentaires mauritaniennes et européennes",
      "factory.details.quality.li2": "Chaque expédition comprend un <strong>certificat sanitaire</strong> officiel",
      "factory.details.quality.li3": "Inspections <strong>SGS</strong> disponibles avant toute commande",

      "qc.heading": "Qualité & Conformité",
      "qc.intro": "Certifiés, inspectés et entièrement traçables — nos produits répondent aux normes internationales les plus élevées.",
      "qc.card.standards.title": "Normes internationales",
      "qc.card.standards.text": "Approbation d’exportation UE et contrôles HACCP stricts à chaque étape.",
      "qc.card.standards.cta": "Télécharger le certificat",
      "qc.card.standards.meta": "PDF • 1 page",
      "qc.card.trace.title": "Traçabilité complète",
      "qc.card.trace.text": "De la capture au conteneur — documentation complète.",
      "qc.card.sgs.title": "Partenaire Sécurité SGS",
      "qc.card.sgs.text": "Inspections indépendantes disponibles avant toute commande.",

      "products.heading": "Produits phares",
      "products.intro": "Produits de la mer premium, FAO 34, transformés selon les standards d’exportation.",
      "products.octopus.title": "Poulpe",
      "products.octopus.types": "<strong>Types :</strong> TAKO 1–8 ; PR 1–4",
      "products.lobster.title": "Langouste",
      "products.crab.title": "Crabe",
      "products.squid.title": "Calmar",
      "products.squid.types": "<strong>Types :</strong> GG , G , M , MIX , P , 2P , 3P , 4P",
      "products.seabream.title": "Daurade Royale",
      "products.bottarga.title": "Boutargue",

      "shipment.heading": "Expédition",
      "shipment.intro": "Nous travaillons avec des partenaires maritimes de classe mondiale pour assurer des livraisons rapides, sûres et traçables. Produits chargés en conteneurs frigorifiques, selon les réglementations maritimes et alimentaires.",
      "shipment.li1": "Délai de transit : 2–4 semaines selon destination",
      "shipment.li2": "Température contrôlée : -18°C ou moins",
      "shipment.li3": "Documentation d’exportation et de sécurité :",
      "shipment.docs.health": "Certificat Sanitaire",
      "shipment.docs.bol": "Connaissement",
      "shipment.docs.origin": "Certificat d’Origine",
      "shipment.docs.packing": "Liste de Colisage",
      "shipment.partners.title": "Partenaires d’Expédition",
      "shipment.partners.text": "Des transporteurs mondiaux de confiance pour des livraisons ponctuelles.",

      "contact.heading": "Nous contacter",
      "contact.intro": "Indiquez vos besoins — spécifications, volumes, destination et délais.",
      "form.name": "Nom",
      "form.company": "Société",
      "form.email": "Email",
      "form.phone": "Téléphone / WhatsApp",
      "form.products": "Produit(s) d’intérêt",
      "form.message": "Message",
      "form.send": "Envoyer",
      "form.reset": "Réinitialiser",
      "contact.direct": "Contact direct",
      "contact.email.label": "Email",
      "contact.phone.label": "Téléphone / WhatsApp",
      "contact.address.label": "Adresse",
      "contact.address.value": "Zone industrielle, Nouadhibou, Mauritanie",
      "contact.hours.label": "Horaires",
      "contact.hours.value": "Lun — Sam : 07:00 — 20:00 GMT",

      "form.sending": "Envoi…",
      "form.success": "Merci ! Votre message a été envoyé.",
      "form.error.required": "Veuillez remplir les champs obligatoires (Société, Email, Message).",
      "form.error.generic": "Une erreur s’est produite. Réessayez.",
      "form.error.network": "Erreur réseau. Réessayez.",
"factory.fact.storage": "Capacité de stockage",
"factory.fact.storage.unit": "t/jour",
"form.responseNote": "Nous vous répondrons sous 24 heures.",


    },

    it: {
      "nav.home": "Home",
      "nav.about": "Chi siamo",
      "nav.factory": "Il nostro impianto",
      "nav.compliance": "Conformità",
      "nav.products": "Prodotti",
      "nav.shipment": "Spedizioni",
      "nav.contact": "Contatti",

      "hero.title": "Frutti di mare premium mauritani — direttamente dall’oceano",
      "hero.subtitle": "Prodotti ittici di alta qualità e sostenibili dalle ricche acque della Mauritania, lavorati nel nostro impianto approvato UE e consegnati surgelati ai mercati internazionali.",
      "hero.button": "Richiedi un preventivo",

      "about.heading": "Chi siamo",
      "about.intro": "Fondata nel 2017, WOMA PÊCHE è un’azienda mauritana che trasforma ed esporta frutti di mare premium. Uniamo linee moderne a rigorosi controlli HACCP e piena tracciabilità — dalla cattura al container.",
      "about.tl.2018.title": "Avviamento dello stabilimento",
      "about.tl.2018.li1": "Stabilimento di Nouadhibou operativo",
      "about.tl.2018.li2": "Celle frigorifere ad alta capacità",
      "about.tl.2018.li3": "Linee moderne di lavorazione e filettatura",
      "about.tl.2019.title": "Approvazione all’export UE",
      "about.tl.2019.text": "Accordo sanitario ottenuto; conforme agli standard mauritani ed europei.",
      "about.tl.2023.title": "Espansione della capacità",
      "about.tl.2023.text": "Infrastruttura potenziata con finanziamenti internazionali — capacità triplicata.",

      "factory.heading": "Il nostro impianto",
      "factory.intro": "Situato a Nouadhibou, Mauritania, il nostro impianto approvato UE dispone di tecnologie avanzate per garantire freschezza, sicurezza e qualità.",
      "factory.fact.founded": "Fondazione",
      "factory.fact.employees": "Dipendenti",
      "factory.fact.storage": "Capacità di stoccaggio",
      "factory.details.processing.title": "Lavorazione e Attrezzature",
      "factory.details.processing.li1": "Due celle frigorifere — <strong>250 t ciascuna</strong>",
      "factory.details.processing.li2": "Due tunnel di congelamento (<strong>10 t</strong>) + uno (<strong>5 t</strong>)",
      "factory.details.processing.li3": "Sale dedicate a filettatura e lavorazione",
      "factory.details.processing.li4": "Sala a <strong>0°C</strong> per il fresco",
      "factory.details.processing.li5": "Area sottoprodotti e gestione rifiuti",
      "factory.details.quality.title": "Qualità e Sicurezza",
      "factory.details.quality.li1": "Conforme agli standard alimentari di Mauritania e UE",
      "factory.details.quality.li2": "Ogni spedizione include un <strong>certificato sanitario</strong> ufficiale",
      "factory.details.quality.li3": "Ispezioni <strong>SGS</strong> disponibili prima di qualsiasi ordine",

      "qc.heading": "Qualità e Conformità",
      "qc.intro": "Certificati, ispezionati e pienamente tracciabili — i nostri prodotti rispettano i massimi standard internazionali.",
      "qc.card.standards.title": "Standard internazionali",
      "qc.card.standards.text": "Approvazione export UE e severi controlli HACCP a ogni fase.",
      "qc.card.standards.cta": "Scarica il certificato",
      "qc.card.standards.meta": "PDF • 1 pagina",
      "qc.card.trace.title": "Piena tracciabilità",
      "qc.card.trace.text": "Dalla cattura al container — documentazione completa.",
      "qc.card.sgs.title": "Partner SGS per la sicurezza",
      "qc.card.sgs.text": "Ispezioni indipendenti disponibili prima di qualsiasi ordine.",

      "products.heading": "Prodotti Principali",
      "products.intro": "Frutti di mare premium (FAO 34), lavorati secondo standard di esportazione.",
      "products.octopus.title": "Polpo",
      "products.octopus.types": "<strong>Tipi:</strong> TAKO 1–8; PR 1–4",
      "products.lobster.title": "Aragosta Spinosa",
      "products.crab.title": "Granchio",
      "products.squid.title": "Calamaro",
      "products.squid.types": "<strong>Tipi:</strong> GG , G , M , MIX , P , 2P , 3P , 4P",
      "products.seabream.title": "Orata (Sparus aurata)",
      "products.bottarga.title": "Bottarga",

      "shipment.heading": "Spedizioni",
      "shipment.intro": "Collaboriamo con compagnie marittime di livello mondiale per consegne rapide, sicure e tracciabili. Prodotti spediti in container refrigerati nel rispetto delle normative.",
      "shipment.li1": "Tempi di transito: 2–4 settimane in base alla destinazione",
      "shipment.li2": "Controllo della temperatura: mantenuta a -18°C o inferiore",
      "shipment.li3": "Documentazione di esportazione e sicurezza:",
      "shipment.docs.health": "Certificato Sanitario",
      "shipment.docs.bol": "Polizza di Carico",
      "shipment.docs.origin": "Certificato d’Origine",
      "shipment.docs.packing": "Packing List",
      "shipment.partners.title": "Partner di Spedizione",
      "shipment.partners.text": "Vettori globali affidabili per consegne puntuali.",

      "contact.heading": "Contattaci",
      "contact.intro": "Raccontaci le tue esigenze — specifiche, volumi, destinazione e tempi.",
      "form.name": "Nome",
      "form.company": "Azienda",
      "form.email": "Email",
      "form.phone": "Telefono / WhatsApp",
      "form.products": "Prodotto/i di interesse",
      "form.message": "Messaggio",
      "form.send": "Invia",
      "form.reset": "Ripristina",
      "contact.direct": "Contatto diretto",
      "contact.email.label": "Email",
      "contact.phone.label": "Telefono / WhatsApp",
      "contact.address.label": "Indirizzo",
      "contact.address.value": "Zona Industriale, Nouadhibou, Mauritania",
      "contact.hours.label": "Orari",
      "contact.hours.value": "Lun — Sab: 07:00 — 20:00 GMT",

      "form.sending": "Invio…",
      "form.success": "Grazie! Il tuo messaggio è stato inviato.",
      "form.error.required": "Compila i campi obbligatori (Azienda, Email, Messaggio).",
      "form.error.generic": "Qualcosa è andato storto. Riprova.",
      "form.error.network": "Errore di rete. Riprova.",
"factory.fact.storage": "Capacità di stoccaggio",
"factory.fact.storage.unit": "t/giorno",
"form.responseNote": "Risponderemo entro 24 ore.",


    },

    ar: {
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.factory": "مصنعنا",
      "nav.compliance": "الجودة",
      "nav.products": "المنتجات",
      "nav.shipment": "الشحن",
      "nav.contact": "التواصل",

      "hero.title": "منتجات بحرية موريتانية مميزة — مباشرة من المحيط",
      "hero.subtitle": "منتجات بحرية عالية الجودة ومستدامة من مياه موريتانيا الغنية، تُعالج في مصنعنا المعتمد من الاتحاد الأوروبي وتُسلم مجمدة إلى الأسواق الدولية.",
      "hero.button": "اطلب عرض ",

      "about.heading": "نبذة عن شركتنا",
      "about.intro": "تأسست WOMA PÊCHE عام 2017، وهي شركة موريتانية لمعالجة وتصدير المأكولات البحرية المميزة. نجمع بين خطوط حديثة وضوابط HACCP صارمة وتتبع كامل — من الصيد إلى الحاوية.",
      "about.tl.2018.title": "تشغيل المصنع",
      "about.tl.2018.li1": "بدء تشغيل منشأة نواذيبو",
      "about.tl.2018.li2": "غرف تجميد عالية السعة",
      "about.tl.2018.li3": "خطوط تقطيع ومعالجة حديثة",
      "about.tl.2019.title": "اعتماد التصدير إلى الاتحاد الأوروبي",
      "about.tl.2019.text": "الحصول على الاتفاق الصحي؛ مطابق للمعايير الموريتانية والأوروبية.",
      "about.tl.2023.title": "توسعة القدرة الاستيعابية",
      "about.tl.2023.text": "ترقية البنية التحتية بتمويل دولي — تضاعفت القدرة ثلاث مرات.",

      "factory.heading": "مصنعنا",
      "factory.intro": "يقع في نواذيبو، موريتانيا، ومجهّز بتقنيات متقدمة للتجميد والمعالجة لضمان الطزاجة والسلامة والجودة للأسواق العالمية.",
      "factory.fact.founded": "تأسست",
      "factory.fact.employees": "الموظفون",
      "factory.fact.storage": "سعة التخزين",
      "factory.details.processing.title": "المعالجة والمعدات",
      "factory.details.processing.li1": "غرفتا تبريد — <strong>250 طن لكل منهما</strong>",
      "factory.details.processing.li2": "نفقا تجميد (<strong>10 طن</strong>) + واحد (<strong>5 طن</strong>)",
      "factory.details.processing.li3": "غرف مخصصة للتقطيع والمعالجة",
      "factory.details.processing.li4": "غرفة تبريد عند <strong>0°م</strong>",
      "factory.details.processing.li5": "منطقة للمنتجات الثانوية وإدارة النفايات",
      "factory.details.quality.title": "الجودة والسلامة",
      "factory.details.quality.li1": "مطابقة لمعايير الغذاء في موريتانيا والاتحاد الأوروبي",
      "factory.details.quality.li2": "يتضمن كل شحن <strong>شهادة صحية</strong> رسمية",
      "factory.details.quality.li3": "فحوصات <strong>SGS</strong> مستقلة قبل أي طلب",

      "qc.heading": "الجودة والسلامة",
      "qc.intro": "معتمدة ومفتشة وقابلة للتتبع بالكامل — منتجاتنا تلبي أعلى المعايير الدولية.",
      "qc.card.standards.title": "معايير دولية",
      "qc.card.standards.text": "اعتماد تصدير الاتحاد الأوروبي وضوابط HACCP صارمة في كل مرحلة.",
      "qc.card.standards.cta": "تحميل الشهادة",
      "qc.card.standards.meta": "PDF • صفحة واحدة",
      "qc.card.trace.title": "تتبع كامل",
      "qc.card.trace.text": "من الصيد إلى الحاوية — توثيق كامل للمنتج.",
      "qc.card.sgs.title": "شريك السلامة SGS",
      "qc.card.sgs.text": "فحوصات مستقلة متاحة قبل أي طلب.",

      "products.heading": "المنتجات الرئيسية",
      "products.intro": "منتجات بحرية مميزة من منطقة FAO 34، تُعالج وفق معايير التصدير.",
      "products.octopus.title": "الأخطبوط",
      "products.octopus.types": "<strong>الأنواع:</strong> TAKO 1–8؛ PR 1–4",
      "products.lobster.title": "سرطان البحر الشوكي",
      "products.crab.title": "السلطعون",
      "products.squid.title": "الحبار",
      "products.squid.types": "<strong>الأنواع:</strong> GG ، G ، M ، MIX ، P ، 2P ، 3P ، 4P",
      "products.seabream.title": "الدنيس ",
      "products.bottarga.title": "البوتارغا",

      "shipment.heading": "الشحن",
      "shipment.intro": "نتعاون مع شركات شحن عالمية لضمان توصيل سريع وآمن وقابل للتتبع. تُشحن المنتجات في حاويات مبردة وفق اللوائح البحرية والغذائية.",
      "shipment.li1": "مدة العبور: 2–4 أسابيع حسب الوجهة",
      "shipment.li2": "التحكم بالحرارة: يحافظ على -18°م أو أقل",
      "shipment.li3": "وثائق التصدير والسلامة:",
      "shipment.docs.health": "شهادة صحية",
      "shipment.docs.bol": "سند شحن",
      "shipment.docs.origin": "شهادة منشأ",
      "shipment.docs.packing": "قائمة التعبئة",
      "shipment.partners.title": "شركاء الشحن",
      "shipment.partners.text": "ناقلون عالميون موثوقون لضمان التسليم في الوقت المحدد.",

      "contact.heading": "تواصل معنا",
      "contact.intro": "أخبرنا باحتياجاتك — المواصفات والكميات والوجهة والجداول الزمنية.",
      "form.name": "الاسم",
      "form.company": "الشركة",
      "form.email": "البريد الإلكتروني",
      "form.phone": "الهاتف / واتساب",
      "form.products": "المنتجات المطلوبة",
      "form.message": "الرسالة",
      "form.send": "إرسال",
      "form.reset": "مسح",
      "contact.direct": "اتصال مباشر",
      "contact.email.label": "البريد الإلكتروني",
      "contact.phone.label": "الهاتف / واتساب",
      "contact.address.label": "العنوان",
      "contact.address.value": "المنطقة الصناعية، نواذيبو، موريتانيا",
      "contact.hours.label": "ساعات العمل",
      "contact.hours.value": "الاثنين — السبت: 07:00 — 20:00 بتوقيت غرينتش",

      "form.sending": "جارٍ الإرسال…",
      "form.success": "شكرًا! تم إرسال رسالتك.",
      "form.error.required": "يرجى تعبئة الحقول الإلزامية (الشركة، البريد الإلكتروني، الرسالة).",
      "form.error.generic": "حدث خطأ ما. حاول مرة أخرى.",
      "form.error.network": "خطأ في الشبكة. حاول مرة أخرى.",

"factory.fact.storage": "سعة التخزين",
"factory.fact.storage.unit": "طن/اليوم",
"form.responseNote": "سنرد خلال 24 ساعة.",

    }
  };

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") el.innerHTML = val;
    });
  }

  function setDirByLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir  = (lang === "ar" ? "rtl" : "ltr");
    if (lang === "ar") document.documentElement.classList.add("rtl");
    else document.documentElement.classList.remove("rtl");

    // keep hidden _language in sync for native fallback
    const formLangInput = document.getElementById("formLang");
    if (formLangInput) formLangInput.value = lang;
  }

  // --- Language init (robust) ---
  (function initLang() {
    const saved   = localStorage.getItem("woma_lang");
    const initial = saved || (langSelect && langSelect.value) || "en";

    setDirByLang(initial);
    applyTranslations(initial);

    if (langSelect) {
      langSelect.value = initial;
      langSelect.addEventListener("change", () => {
        const lang = langSelect.value || "en";
        localStorage.setItem("woma_lang", lang);
        setDirByLang(lang);
        applyTranslations(lang);
      });
    }
  })();

  // --- Contact form submission via Formspree (AJAX on web, native fallback locally) ---
  const contactForm   = document.getElementById("contactForm");
  const contactSubmit = document.getElementById("contactSubmit");
  const formStatus    = document.getElementById("formStatus");
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldlqqlk";

  function t(key, fallback){
    const lang = localStorage.getItem("woma_lang") || "en";
    const dict = (translations && translations[lang]) || translations.en || {};
    return dict[key] || fallback || key;
  }

  if (contactForm && contactSubmit && formStatus){
    const isLocalFile = window.location.protocol === "file:";

    const onSubmit = async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()){
        contactForm.reportValidity();
        return;
      }

      const fd = new FormData(contactForm);
      const company = (fd.get("company") || "").toString().trim();
      const email   = (fd.get("email")   || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();
      const trap    = (fd.get("_gotcha") || "").toString().trim();

      if (trap) return;

      if (!company || !email || !message){
        formStatus.textContent = t("form.error.required", "Please fill the required fields (Company, Email, Message).");
        formStatus.style.color = "#e11d48";
        return;
      }

      fd.set("_replyto", email);
      fd.set("_language", document.documentElement.lang || "en");

      if (isLocalFile){
        contactForm.removeEventListener("submit", onSubmit);
        contactForm.submit();
        return;
      }

      const originalText = contactSubmit.textContent;
      contactSubmit.disabled = true;
      contactSubmit.textContent = t("form.sending", "Sending…");
      formStatus.textContent = "";

      try{
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: fd,
          mode: "cors",
        });

        if (res.ok){
          contactForm.reset();
          formStatus.textContent = t("form.success", "Thanks! Your message has been sent.");
          formStatus.style.color = "#065f46";
        }else{
          contactForm.removeEventListener("submit", onSubmit);
          contactForm.submit();
        }
      }catch(err){
        contactForm.removeEventListener("submit", onSubmit);
        contactForm.submit();
      }finally{
        contactSubmit.disabled = false;
        contactSubmit.textContent = originalText;
      }
    };

    contactForm.addEventListener("submit", onSubmit);
  }
});
