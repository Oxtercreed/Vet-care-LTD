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
    desc: "Comprehensive nose-to-tail checkup to evaluate your pet's overall health and catch potential issues early.",
    includes: [
      'Complete physical examination & vital signs',
      'Weight check & tailored nutritional advice',
      'Heart, lungs, eyes, ears & dental check'
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
    desc: 'Essential core vaccinations and parasite protection to keep your pet protected year-round.',
    includes: [
      'Core viral booster (DHLPP / FVRCP)',
      'Official Rabies immunization certificate',
      'Broad-spectrum deworming & tick/flea prevention'
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
    desc: 'Safe ultrasonic cleaning and polishing to remove tartar, prevent gum disease, and keep breath fresh.',
    includes: [
      'Ultrasonic tartar & plaque scaling',
      'Gentle tooth polishing & oral rinse',
      'Gingivitis check & home dental advice'
    ]
  },
  diagnostics: {
    key: 'diagnostics',
    title: 'Ultrasound & Lab Tests',
    category: 'Diagnostics',
    price: 'From TZS 60,000',
    image: 'assets/images/service-diagnostics.jpg',
    duration: '30 - 60 Minutes',
    suitability: 'Illness Investigation or Annual Screen',
    desc: 'Fast, precise in-house diagnostics and imaging for quick answers and effective care.',
    includes: [
      'High-resolution abdominal ultrasound scan',
      'Complete Blood Count (CBC) & organ chemistry',
      'Rapid tick-borne parasite & viral testing'
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
    desc: 'Gentle therapeutic baths and grooming to soothe sensitive skin and maintain coat vitality.',
    includes: [
      'Medicated wash & anti-tick/flea treatment',
      'Ear cleaning & safe nail trim',
      'Hygienic sanitary trim & paw pad care'
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
  const navMenu = document.getElementById('navMenu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('mobile-open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('mobile-open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
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
