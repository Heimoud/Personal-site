// ===== WOMA PÊCHE – Script (menu, year, smooth scroll, i18n) =====
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
          window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
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
      // nav & cta
      "nav.home": "Home",
      "nav.about": "About",
      "nav.factory": "Our Factory",
      "nav.compliance": "Compliance",
      "nav.products": "Products",
      "nav.shipment": "Shipment",
      "nav.contact": "Contact",
      "cta.quote": "Request a quote",

      // hero
      "hero.title": "Premium Mauritanian Seafood — direct from the ocean",
      "hero.subtitle": "High-quality, sustainably sourced seafood from the rich waters of Mauritania, processed in our EU-approved facility and delivered fresh-frozen to international markets.",

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
      "qc.card.trace.title": "Full Traceability",
      "qc.card.trace.text": "From catch to container — complete product documentation.",
      "qc.card.sgs.title": "SGS Safety Partner",
      "qc.card.sgs.text": "Independent inspections available prior to any order.",
      "qc.card.standards.cta": "Download Certificate",
      "qc.card.standards.meta": "PDF • 1 page",

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
      "contact.hours.value": "Mon — Sat: 07:00 — 20:00 GMT"
    },

    es: {
      "nav.home": "Inicio",
      "nav.about": "Sobre nosotros",
      "nav.factory": "Nuestra planta",
      "nav.compliance": "Cumplimiento",
      "nav.products": "Productos",
      "nav.shipment": "Envíos",
      "nav.contact": "Contacto",
      "cta.quote": "Solicitar cotización",
      "hero.title": "Mariscos premium de Mauritania — directo del océano",
      "hero.subtitle": "Productos de mar de alta calidad y origen sostenible de las ricas aguas de Mauritania, procesados en nuestra planta aprobada por la UE y entregados ultracongelados a mercados internacionales.",
      // ... (rest unchanged – keeping your full object)
    },

    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.factory": "Notre usine",
      "nav.compliance": "Conformité",
      "nav.products": "Produits",
      "nav.shipment": "Expédition",
      "nav.contact": "Contact",
      "cta.quote": "Demander un devis",
      "hero.title": "Produits de la mer mauritaniens premium — directement de l’océan",
      "hero.subtitle": "Des produits de la mer de haute qualité et durables des riches eaux de Mauritanie, transformés dans notre usine agréée UE et livrés surgelés aux marchés internationaux.",
      // ... (rest unchanged)
    },

    it: {
      "nav.home": "Home",
      "nav.about": "Chi siamo",
      "nav.factory": "Il nostro impianto",
      "nav.compliance": "Conformità",
      "nav.products": "Prodotti",
      "nav.shipment": "Spedizioni",
      "nav.contact": "Contatti",
      "cta.quote": "Richiedi un preventivo",
      "hero.title": "Frutti di mare premium mauritani — direttamente dall’oceano",
      "hero.subtitle": "Prodotti ittici di alta qualità e sostenibili dalle ricche acque della Mauritania, lavorati nel nostro impianto approvato UE e consegnati surgelati ai mercati internazionali.",
      // ... (rest unchanged)
    },

    ar: {
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.factory": "مصنعنا",
      "nav.compliance": "الجودة",
      "nav.products": "المنتجات",
      "nav.shipment": "الشحن",
      "nav.contact": "التواصل",
      "cta.quote": "اطلب عرض ",
      "hero.title": "منتجات بحرية موريتانية مميزة — مباشرة من المحيط",
      "hero.subtitle": "منتجات بحرية عالية الجودة ومستدامة من مياه موريتانيا الغنية، تُعالج في مصنعنا المعتمد من الاتحاد الأوروبي وتُسلم مجمدة إلى الأسواق الدولية.",
      // ... (rest unchanged)
    }
  };

  function setDirByLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    if (lang === "ar") document.documentElement.classList.add("rtl");
    else document.documentElement.classList.remove("rtl");
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    $('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (typeof val === 'string') {
        el.innerHTML = val; // allow <strong>
      }
    });
  }

  // ---- Compact option labels on phones (EN/ES/FR/IT/AR) ----
  const FULL = { en: "English", es: "Español", fr: "Français", it: "Italiano", ar: "العربية" };
  const SHORT = { en: "EN", es: "ES", fr: "FR", it: "IT", ar: "AR" };

  function setSelectLabels(short) {
    if (!langSelect) return;
    const map = short ? SHORT : FULL;
    Array.from(langSelect.options).forEach(opt => {
      if (map[opt.value]) opt.text = map[opt.value];
    });
  }

  function adaptSelectLabels() {
    const isPhone = window.matchMedia('(max-width: 480px)').matches;
    setSelectLabels(isPhone);
  }

  // ---- Init language + listeners ----
  function initLang() {
    const saved = localStorage.getItem('woma_lang') || 'en';
    if (langSelect) {
      langSelect.value = saved;
      langSelect.addEventListener('change', () => {
        const lang = langSelect.value;
        setDirByLang(lang);
        applyTranslations(lang);
        localStorage.setItem('woma_lang', lang);
        // keep label style after change
        adaptSelectLabels();
      });
    }
    setDirByLang(saved);
    applyTranslations(saved);
    adaptSelectLabels();
  }

  // Update labels on resize/orientation changes
  window.addEventListener('resize', adaptSelectLabels);
  window.addEventListener('orientationchange', adaptSelectLabels);

  initLang();
});
