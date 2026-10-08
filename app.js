/* ==========================================================================
   VET CARE LTD - INTERACTIVE JAVASCRIPT LOGIC
   Micro-interactions, Service Filtering, Horizontal Track & Detail Modal
   ========================================================================== */

/**
 * Service Information Dictionary for Vet Care LTD
 */
const SERVICES_DATA = {
  wellness: {
    key: 'wellness',
    title: 'Health & Wellness Exam',
    category: 'Wellness',
    price: 'From TZS 35,000',
    image: 'assets/images/service-wellness.jpg',
    duration: '30 - 45 Minutes',
    suitability: 'Dogs & Cats of All Ages',
    desc: "Our gentle nose-to-tail wellness examination evaluates every aspect of your companion's vitality. From cardiovascular rhythm and respiratory clarity to weight trends, coat condition, and joint mobility, we ensure potential health issues are identified early in a calm, stress-free clinical setting.",
    includes: [
      'Comprehensive 12-point physical examination & vitals assessment',
      'Weight, body condition score & tailored nutritional guidance',
      'Ophthalmic (eyes), otic (ears), and oral mucous membrane checks',
      'Heart rhythm & lung sound stethoscope auscultation',
      'Personalized lifetime wellness plan & preventative care consultation'
    ]
  },
  vaccines: {
    key: 'vaccines',
    title: 'Vaccines & Prevention',
    category: 'Prevention',
    price: 'From TZS 45,000',
    image: 'assets/images/service-vaccine.jpg',
    duration: '20 - 30 Minutes',
    suitability: 'Puppies, Kittens, Adult Dogs & Cats',
    desc: 'Protect your pet against fatal viral diseases prevalent in coastal Tanzania (such as Rabies, Canine Parvovirus, Distemper, Hepatitis, and Feline Panleukopenia). Includes gentle booster administration, official veterinary vaccine certificate, and tailored parasite protection.',
    includes: [
      'Core 5-in-1 / 7-in-1 viral vaccine booster (DHLPP / FVRCP)',
      'Official Rabies immunization certificate with clinic validation stamp',
      'Broad-spectrum oral deworming tablet administration',
      'Tick, flea, and heartworm preventative consultation & treatment',
      'Pre-vaccination temperature and health screening'
    ]
  },
  dental: {
    key: 'dental',
    title: 'Dental Care & Hygiene',
    category: 'Dental Care',
    price: 'From TZS 50,000',
    image: 'assets/images/service-dental.jpg',
    duration: '45 - 60 Minutes',
    suitability: 'Adult & Senior Dogs & Cats',
    desc: 'Periodontal disease is the #1 preventable health problem affecting domestic pets. Our ultrasonic dental scaling safely eliminates calcified plaque, tartar buildup, and foul breath bacteria, preventing premature tooth loss and protecting internal organs from systemic strain.',
    includes: [
      'Ultrasonic supragingival and subgingival plaque scaling',
      'Enamel polishing to smooth surfaces and retard future plaque adhesion',
      'Gingivitis assessment, periodontal pocket inspection & oral exam',
      'Antiseptic oral rinse & deodorizing veterinary mouth wash',
      'Home dental care guidance & recommended dental chews'
    ]
  },
  diagnostics: {
    key: 'diagnostics',
    title: 'Ultrasound & Lab Tests',
    category: 'Diagnostics',
    price: 'From TZS 60,000',
    image: 'assets/images/service-diagnostics.jpg',
    duration: '30 - 60 Minutes',
    suitability: 'Illness Investigation, Senior Wellness, or Annual Screen',
    desc: 'When pets are unwell, prompt answers provide peace of mind and speed recovery. Our clinic is equipped with high-resolution abdominal ultrasound imaging and in-house diagnostic blood analyzers for rapid, reliable same-day clinical insights.',
    includes: [
      'High-resolution abdominal organ ultrasound examination',
      'Complete Blood Count (CBC) and essential organ biochemistry panel',
      'Tick-borne parasite blood smear examination (Ehrlichia / Babesia)',
      'Rapid infectious disease antigen screening cassettes',
      'Same-day veterinary diagnostic review & immediate treatment roadmap'
    ]
  },
  grooming: {
    key: 'grooming',
    title: 'Medicated Pet Grooming',
    category: 'Grooming & Skin',
    price: 'From TZS 40,000',
    image: 'assets/images/service-grooming.jpg',
    duration: '45 - 75 Minutes',
    suitability: 'All Breeds & Fur Types (Dogs & Cats)',
    desc: 'A therapeutic, stress-free grooming experience formulated specifically for dermatological health and coat vitality. We utilize veterinary-prescribed hypoallergenic and antimicrobial shampoos to soothe sensitive skin, eliminate parasites, and keep coats fresh.',
    includes: [
      'Warm hydro-massage bath with veterinary medicated shampoo',
      'Protective anti-tick and anti-flea dip / rinse',
      'Gentle hygienic sanitary trim & paw pad feather clipping',
      'Deep ear canal flush & debris cleansing',
      'Safe nail trimming & organic nourishing paw balm application'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initServicesShowcase();
  initServiceModal();
  initFaqAccordion();
  initSmoothScrollAndActiveNav();
});

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/**
 * Services Horizontal Track & Category Filters
 */
function initServicesShowcase() {
  const filterPills = document.querySelectorAll('.service-filter-pill');
  const serviceCards = document.querySelectorAll('.service-photo-card');
  const track = document.getElementById('servicesTrack');
  const prevBtn = document.getElementById('serviceScrollPrev');
  const nextBtn = document.getElementById('serviceScrollNext');

  if (!filterPills.length || !serviceCards.length) return;

  // Filter Pill Click Handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Toggle active states
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterValue = pill.getAttribute('data-filter');

      // Filter cards
      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          }, 15);
        } else {
          card.style.display = 'none';
        }
      });

      // Smooth scroll track to the beginning (left)
      if (track) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });

  // Carousel Arrow Controls
  if (prevBtn && track) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = serviceCards[0] ? serviceCards[0].offsetWidth + 26 : 360;
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn && track) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = serviceCards[0] ? serviceCards[0].offsetWidth + 26 : 360;
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }
}

/**
 * Service Detail Pop-up Modal Controller
 */
function initServiceModal() {
  const overlay = document.getElementById('serviceModalOverlay');
  const closeBtn = document.getElementById('serviceModalClose');
  const secondaryCloseBtn = document.getElementById('modalCloseSecondaryBtn');
  const serviceCards = document.querySelectorAll('.service-photo-card');

  if (!overlay) return;

  // Elements inside modal to populate
  const modalImg = document.getElementById('modalServiceImg');
  const modalCat = document.getElementById('modalServiceCat');
  const modalTitle = document.getElementById('modalServiceTitle');
  const modalPrice = document.getElementById('modalServicePrice');
  const modalDuration = document.getElementById('modalDurationText');
  const modalSuitability = document.getElementById('modalSuitabilityText');
  const modalDesc = document.getElementById('modalServiceDesc');
  const modalIncludes = document.getElementById('modalServiceIncludes');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  // Open modal with specific service data
  function openServiceModal(serviceKey) {
    const service = SERVICES_DATA[serviceKey];
    if (!service) return;

    if (modalImg) {
      modalImg.src = service.image;
      modalImg.alt = `${service.title} at Vet Care LTD`;
    }
    if (modalCat) modalCat.textContent = service.category;
    if (modalTitle) modalTitle.textContent = service.title;
    if (modalPrice) modalPrice.textContent = service.price;
    if (modalDuration) modalDuration.textContent = service.duration;
    if (modalSuitability) modalSuitability.textContent = service.suitability;
    if (modalDesc) modalDesc.textContent = service.desc;

    // Populate checklist items
    if (modalIncludes) {
      modalIncludes.innerHTML = service.includes
        .map(item => `<li><span class="check-bullet">&#10003;</span> <span>${item}</span></li>`)
        .join('');
    }

    // Direct WhatsApp inquiry with personalized greeting
    if (modalWhatsAppBtn) {
      const clinicNumber = '255713325000';
      const msg = `Habari Vet Care Ltd, ningependa kufahamu zaidi kuhusu huduma ya ${service.title} (${service.price}).`;
      modalWhatsAppBtn.href = `https://wa.me/${clinicNumber}?text=${encodeURIComponent(msg)}`;
    }

    // Show modal
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (closeBtn) closeBtn.focus();
  }

  // Close modal
  function closeServiceModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click listener to each card
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const serviceKey = card.getAttribute('data-service');
      if (serviceKey) {
        openServiceModal(serviceKey);
      }
    });

    // Keyboard support (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const serviceKey = card.getAttribute('data-service');
        if (serviceKey) {
          openServiceModal(serviceKey);
        }
      }
    });
  });

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
  if (secondaryCloseBtn) secondaryCloseBtn.addEventListener('click', closeServiceModal);

  // Click outside modal content
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeServiceModal();
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeServiceModal();
    }
  });
}

/**
 * FAQ Accordion Single Open Behavior
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.open) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });
}

/**
 * Smooth Active Navigation Link Highlighting
 */
function initSmoothScrollAndActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}
