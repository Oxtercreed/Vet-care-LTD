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

// Global hook to open booking modal from anywhere
let openBookingServiceModal = function() {};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initServicesShowcase();
  initServiceModal();
  initFaqAccordion();
  initSmoothScrollAndActiveNav();
  initFullscreenBookingSystem();
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
  const modalBookServiceBtn = document.getElementById('modalBookServiceBtn');
  let currentActiveKey = 'wellness';

  // Open modal with specific service data
  function openServiceModal(serviceKey) {
    const service = SERVICES_DATA[serviceKey];
    if (!service) return;
    currentActiveKey = serviceKey;

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

    // Show modal
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (closeBtn) closeBtn.focus();
  }

  // Hook Book Appointment button inside service card modal
  if (modalBookServiceBtn) {
    modalBookServiceBtn.addEventListener('click', () => {
      closeServiceModal();
      openBookingServiceModal(currentActiveKey);
    });
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

/**
 * ==========================================================================
 * FULLSCREEN DEDICATED PAGE-STYLE BOOKING SYSTEM
 * Multi-modal / Step Flow: Service Selection -> Date/Time Slots -> Confirmed
 * ==========================================================================
 */
function initFullscreenBookingSystem() {
  // Elements for Modal 1 (Choose Service)
  const modal1 = document.getElementById('bookingServiceModal');
  const closeBtn1 = document.getElementById('closeBookingModal1');
  const cancelBtn1 = document.getElementById('cancelBookingStep1');
  const confirmServiceBtn = document.getElementById('confirmServiceBtn');
  const bookingCards = document.querySelectorAll('.booking-service-card');
  const filterChips = document.querySelectorAll('.booking-filter-chip');
  const dockSummaryText = document.getElementById('dockSummaryText');

  // Elements for Modal 2 (Date & Time Slots)
  const modal2 = document.getElementById('bookingDateTimeModal');
  const closeBtn2 = document.getElementById('closeBookingModal2');
  const backToServicesBtn = document.getElementById('backToServicesBtn');
  const bannerChangeServiceBtn = document.getElementById('bannerChangeServiceBtn');
  const bannerServiceTitle = document.getElementById('bannerServiceTitle');
  const bannerServiceMeta = document.getElementById('bannerServiceMeta');
  const dateRibbonTrack = document.getElementById('dateRibbonTrack');
  const bookingCustomDate = document.getElementById('bookingCustomDate');
  const morningSlotsGrid = document.getElementById('morningSlotsGrid');
  const afternoonSlotsGrid = document.getElementById('afternoonSlotsGrid');
  const eveningSlotsGrid = document.getElementById('eveningSlotsGrid');
  const dockSelectedDateTimeText = document.getElementById('dockSelectedDateTimeText');
  const backToServicesFromDateBtn = document.getElementById('backToServicesFromDateBtn');
  const continueToPatientBtn = document.getElementById('continueToPatientBtn');

  // Elements for Modal 3 (Pet & Guardian Info - Dedicated Page)
  const modal3 = document.getElementById('bookingPatientModal');
  const closeBtn3 = document.getElementById('closeBookingModal3');
  const backToDateTimeBtn = document.getElementById('backToDateTimeBtn');
  const bookingForm = document.getElementById('bookingDetailsForm');
  const guardianNameInput = document.getElementById('guardianName');
  const guardianPhoneInput = document.getElementById('guardianPhone');
  const petNameInput = document.getElementById('petName');
  const petTypeSelect = document.getElementById('petType');
  const visitNotesInput = document.getElementById('visitNotes');
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const snapServiceTitle = document.getElementById('snapServiceTitle');
  const snapDateText = document.getElementById('snapDateText');
  const snapTimeText = document.getElementById('snapTimeText');
  const snapPriceText = document.getElementById('snapPriceText');
  const editServiceStepBtn = document.getElementById('editServiceStepBtn');
  const editDateTimeStepBtn = document.getElementById('editDateTimeStepBtn');

  // Elements for Modal 4 (Confirmation Pass - Official Clinic Ticket)
  const modal4 = document.getElementById('bookingConfirmedModal');
  const closeBtn4 = document.getElementById('closeBookingConfirmed');
  const confDoneBtn = document.getElementById('confDoneBtn');
  const confPetNameDisplay = document.getElementById('confPetNameDisplay');
  const confReferenceCode = document.getElementById('confReferenceCode');
  const confServiceTitle = document.getElementById('confServiceTitle');
  const confDateTime = document.getElementById('confDateTime');
  const confPatientGuardian = document.getElementById('confPatientGuardian');
  const confDurationPrice = document.getElementById('confDurationPrice');
  const confPhone = document.getElementById('confPhone');
  const confWhatsAppSyncBtn = document.getElementById('confWhatsAppSyncBtn');
  const confGoogleCalBtn = document.getElementById('confGoogleCalBtn');

  // External Triggers across the page
  const heroBookBtn = document.getElementById('heroBookBtn');
  const navBookBtn = document.getElementById('navBookBtn');
  const ratingBannerBookBtn = document.getElementById('ratingBannerBookBtn');
  const footerBookBtn = document.getElementById('footerBookBtn');

  // Central Booking State
  const state = {
    serviceKey: 'wellness',
    serviceTitle: 'Health & Wellness Exam',
    servicePrice: 'From TZS 35,000',
    serviceDuration: '30 - 45 Minutes',
    selectedDate: '',
    selectedTimeSlot: '10:00 AM',
    guardianName: '',
    guardianPhone: '',
    petName: '',
    petType: 'Dog',
    visitNotes: '',
    refCode: ''
  };

  // Helper functions to open and close modals
  function showModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    const anyActive = document.querySelector('.fullscreen-booking-modal.active, .service-modal-overlay.active');
    if (!anyActive) {
      document.body.style.overflow = '';
    }
  }

  function hideAllBookingModals() {
    hideModal(modal1);
    hideModal(modal2);
    hideModal(modal3);
    hideModal(modal4);
    document.body.style.overflow = '';
  }

  // Globally accessible entrypoint to start booking flow
  openBookingServiceModal = function(serviceKey) {
    hideModal(modal2);
    hideModal(modal3);
    hideModal(modal4);
    showModal(modal1);

    const keyToSelect = serviceKey || state.serviceKey || 'wellness';
    selectServiceCard(keyToSelect);

    if (closeBtn1) closeBtn1.focus();
  };

  // Select service card in Modal 1
  function selectServiceCard(key) {
    const service = SERVICES_DATA[key];
    if (!service) return;

    state.serviceKey = key;
    state.serviceTitle = service.title;
    state.servicePrice = service.price;
    state.serviceDuration = service.duration;

    bookingCards.forEach(card => {
      const isMatch = card.getAttribute('data-service') === key;
      card.classList.toggle('selected', isMatch);
      card.setAttribute('aria-checked', isMatch ? 'true' : 'false');
    });

    if (dockSummaryText) {
      dockSummaryText.innerHTML = `Selected: <strong>${service.title}</strong> &bull; <span style="color:var(--terracotta); font-weight:700;">${service.price}</span> (${service.duration})`;
    }

    if (confirmServiceBtn) {
      confirmServiceBtn.removeAttribute('disabled');
    }
  }

  // Filter chips in Modal 1
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const filter = chip.getAttribute('data-bfilter');
      bookingCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Service card click & keyboard selection in Modal 1
  bookingCards.forEach(card => {
    const key = card.getAttribute('data-service');
    card.addEventListener('click', () => {
      selectServiceCard(key);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectServiceCard(key);
      }
    });
  });

  // Modal 1 close buttons
  if (closeBtn1) closeBtn1.addEventListener('click', hideAllBookingModals);
  if (cancelBtn1) cancelBtn1.addEventListener('click', hideAllBookingModals);

  // Modal 1 Confirm -> Modal 2 Popup
  if (confirmServiceBtn) {
    confirmServiceBtn.addEventListener('click', () => {
      if (!state.serviceKey) return;
      hideModal(modal1);
      openDateTimeModal();
    });
  }

  // =========================================================================
  // STEP 2: DATE & TIME MODAL
  // =========================================================================
  function openDateTimeModal() {
    showModal(modal2);

    // Update banner in Modal 2
    if (bannerServiceTitle) bannerServiceTitle.textContent = state.serviceTitle;
    if (bannerServiceMeta) bannerServiceMeta.textContent = `${state.servicePrice} • ${state.serviceDuration} • Migombani St Clinic`;

    // Render interactive 7-day ribbon (including today)
    renderDateRibbon();

    // Render interactive time slots
    renderTimeSlots();

    // Update bottom dock summary
    updateDateTimeDock();

    if (continueToPatientBtn) continueToPatientBtn.focus();
  }

  // Back to Services from Modal 2
  if (backToServicesBtn) {
    backToServicesBtn.addEventListener('click', () => {
      hideModal(modal2);
      showModal(modal1);
    });
  }
  if (backToServicesFromDateBtn) {
    backToServicesFromDateBtn.addEventListener('click', () => {
      hideModal(modal2);
      showModal(modal1);
    });
  }
  if (bannerChangeServiceBtn) {
    bannerChangeServiceBtn.addEventListener('click', () => {
      hideModal(modal2);
      showModal(modal1);
    });
  }
  if (closeBtn2) closeBtn2.addEventListener('click', hideAllBookingModals);

  // Generate EXACTLY 7-day interactive ribbon (today + next 6 days)
  function renderDateRibbon() {
    if (!dateRibbonTrack) return;
    dateRibbonTrack.innerHTML = '';

    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayOfWeek = daysOfWeek[d.getDay()];
      const dayNum = d.getDate();
      const monthName = months[d.getMonth()];
      const year = d.getFullYear();
      const formattedDate = `${dayOfWeek}, ${monthName} ${dayNum}, ${year}`;
      const isSunday = d.getDay() === 0;

      // Select today by default if nothing selected yet
      if (!state.selectedDate && i === 0) {
        state.selectedDate = formattedDate;
      }

      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'date-card-pill';
      pill.setAttribute('role', 'radio');
      const isSelected = state.selectedDate === formattedDate;
      if (isSelected) pill.classList.add('selected');
      pill.setAttribute('aria-checked', isSelected ? 'true' : 'false');

      pill.innerHTML = `
        <span class="date-pill-day">${i === 0 ? 'Today' : (i === 1 ? 'Tmrw' : dayOfWeek)}</span>
        <span class="date-pill-num">${dayNum}</span>
        <span class="date-pill-month">${monthName}</span>
        <span class="date-pill-status">${isSunday ? 'On-Call' : 'Available'}</span>
      `;

      pill.addEventListener('click', () => {
        dateRibbonTrack.querySelectorAll('.date-card-pill').forEach(p => {
          p.classList.remove('selected');
          p.setAttribute('aria-checked', 'false');
        });
        pill.classList.add('selected');
        pill.setAttribute('aria-checked', 'true');
        state.selectedDate = formattedDate;
        if (bookingCustomDate) bookingCustomDate.value = '';
        updateDateTimeDock();
      });

      dateRibbonTrack.appendChild(pill);
    }

    if (bookingCustomDate) {
      bookingCustomDate.min = today.toISOString().split('T')[0];
    }
  }

  // Handle custom date fallback
  if (bookingCustomDate) {
    bookingCustomDate.addEventListener('change', (e) => {
      if (!e.target.value) return;
      const parts = e.target.value.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedDate = `${daysOfWeek[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      state.selectedDate = formattedDate;

      if (dateRibbonTrack) {
        dateRibbonTrack.querySelectorAll('.date-card-pill').forEach(p => {
          p.classList.remove('selected');
          p.setAttribute('aria-checked', 'false');
        });
      }
      updateDateTimeDock();
    });
  }

  // Time Slots Definition
  const timeSlotsData = {
    morning: ['08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'],
    afternoon: ['12:15 PM', '01:00 PM', '02:00 PM', '02:45 PM', '03:30 PM'],
    evening: ['04:15 PM', '05:00 PM', '05:45 PM', '06:30 PM']
  };

  // Render Time Slots
  function renderTimeSlots() {
    if (!state.selectedTimeSlot) {
      state.selectedTimeSlot = '10:00 AM';
    }

    function populateGrid(container, slots, bookedIndex) {
      if (!container) return;
      container.innerHTML = '';
      slots.forEach((slot, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';
        btn.setAttribute('role', 'radio');
        btn.textContent = slot;

        if (idx === bookedIndex) {
          btn.classList.add('booked');
          btn.setAttribute('aria-disabled', 'true');
          btn.title = 'Slot reserved by another pet parent';
          btn.textContent = `${slot} (Full)`;
        } else {
          if (state.selectedTimeSlot === slot) {
            btn.classList.add('selected');
            btn.setAttribute('aria-checked', 'true');
          } else {
            btn.setAttribute('aria-checked', 'false');
          }

          btn.addEventListener('click', () => {
            document.querySelectorAll('.time-slot-btn').forEach(b => {
              b.classList.remove('selected');
              b.setAttribute('aria-checked', 'false');
            });
            btn.classList.add('selected');
            btn.setAttribute('aria-checked', 'true');
            state.selectedTimeSlot = slot;
            updateDateTimeDock();
          });
        }

        container.appendChild(btn);
      });
    }

    populateGrid(morningSlotsGrid, timeSlotsData.morning, 1);
    populateGrid(afternoonSlotsGrid, timeSlotsData.afternoon, 3);
    populateGrid(eveningSlotsGrid, timeSlotsData.evening, -1);
  }

  // Update bottom dock on Modal 2
  function updateDateTimeDock() {
    if (dockSelectedDateTimeText) {
      if (state.selectedDate && state.selectedTimeSlot) {
        dockSelectedDateTimeText.innerHTML = `<strong>${state.selectedDate}</strong> at <strong style="color:var(--terracotta);">${state.selectedTimeSlot}</strong>`;
      } else if (state.selectedDate) {
        dockSelectedDateTimeText.innerHTML = `<strong>${state.selectedDate}</strong> &bull; Please pick a time slot`;
      } else {
        dockSelectedDateTimeText.textContent = 'Please pick a date & time';
      }
    }
  }

  // Modal 2 Dock Continue Button -> Modal 3
  if (continueToPatientBtn) {
    continueToPatientBtn.addEventListener('click', () => {
      if (!state.selectedDate) {
        alert('Please choose an appointment date to continue.');
        return;
      }
      if (!state.selectedTimeSlot) {
        alert('Please choose an appointment time slot to continue.');
        return;
      }
      hideModal(modal2);
      openPatientModal();
    });
  }

  // =========================================================================
  // STEP 3: PET & GUARDIAN DETAILS MODAL (DEDICATED FULLSCREEN PAGE)
  // =========================================================================
  function openPatientModal() {
    showModal(modal3);

    // Populate Appointment Summary Card on Step 3
    if (snapServiceTitle) snapServiceTitle.textContent = state.serviceTitle;
    if (snapDateText) snapDateText.textContent = state.selectedDate || 'Please pick a date';
    if (snapTimeText) snapTimeText.textContent = state.selectedTimeSlot || 'Please pick a time';
    if (snapPriceText) snapPriceText.textContent = state.servicePrice;

    // Pre-populate input values if already filled in state
    if (guardianNameInput && state.guardianName) guardianNameInput.value = state.guardianName;
    if (guardianPhoneInput && state.guardianPhone) guardianPhoneInput.value = state.guardianPhone;
    if (petNameInput && state.petName) petNameInput.value = state.petName;
    if (petTypeSelect && state.petType) petTypeSelect.value = state.petType;
    if (visitNotesInput && state.visitNotes) visitNotesInput.value = state.visitNotes;

    if (guardianNameInput) guardianNameInput.focus();
  }

  // Modal 3 Navigation & Edits
  if (backToDateTimeBtn) {
    backToDateTimeBtn.addEventListener('click', () => {
      hideModal(modal3);
      showModal(modal2);
    });
  }
  if (editServiceStepBtn) {
    editServiceStepBtn.addEventListener('click', () => {
      hideModal(modal3);
      showModal(modal1);
    });
  }
  if (editDateTimeStepBtn) {
    editDateTimeStepBtn.addEventListener('click', () => {
      hideModal(modal3);
      showModal(modal2);
    });
  }
  if (closeBtn3) closeBtn3.addEventListener('click', hideAllBookingModals);

  // Bind inputs on Modal 3
  if (guardianNameInput) {
    guardianNameInput.addEventListener('input', (e) => {
      state.guardianName = e.target.value.trim();
      guardianNameInput.style.borderColor = '';
    });
  }
  if (guardianPhoneInput) {
    guardianPhoneInput.addEventListener('input', (e) => {
      state.guardianPhone = e.target.value.trim();
      guardianPhoneInput.style.borderColor = '';
    });
  }
  if (petNameInput) {
    petNameInput.addEventListener('input', (e) => {
      state.petName = e.target.value.trim();
      petNameInput.style.borderColor = '';
    });
  }
  if (petTypeSelect) {
    petTypeSelect.addEventListener('change', (e) => { state.petType = e.target.value; });
  }
  if (visitNotesInput) {
    visitNotesInput.addEventListener('input', (e) => { state.visitNotes = e.target.value.trim(); });
  }

  // Form submission on Modal 3 -> Modal 4
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingConfirmation();
    });
  }

  function handleBookingConfirmation() {
    if (!state.selectedDate) {
      alert('Please select an appointment date from the available dates.');
      hideModal(modal3);
      showModal(modal2);
      return;
    }
    if (!state.selectedTimeSlot) {
      alert('Please select a time slot for your appointment.');
      hideModal(modal3);
      showModal(modal2);
      return;
    }

    const name = guardianNameInput ? guardianNameInput.value.trim() : state.guardianName;
    const phone = guardianPhoneInput ? guardianPhoneInput.value.trim() : state.guardianPhone;
    const pet = petNameInput ? petNameInput.value.trim() : state.petName;

    if (!name) {
      if (guardianNameInput) {
        guardianNameInput.focus();
        guardianNameInput.style.borderColor = 'var(--terracotta)';
      }
      return;
    }
    if (!phone) {
      if (guardianPhoneInput) {
        guardianPhoneInput.focus();
        guardianPhoneInput.style.borderColor = 'var(--terracotta)';
      }
      return;
    }
    if (!pet) {
      if (petNameInput) {
        petNameInput.focus();
        petNameInput.style.borderColor = 'var(--terracotta)';
      }
      return;
    }

    state.guardianName = name;
    state.guardianPhone = phone;
    state.petName = pet;
    if (petTypeSelect) state.petType = petTypeSelect.value;
    if (visitNotesInput) state.visitNotes = visitNotesInput.value.trim();

    if (submitBookingBtn) {
      submitBookingBtn.innerHTML = `<span>Reserving Appointment Slot...</span>`;
      submitBookingBtn.style.opacity = '0.75';
      submitBookingBtn.disabled = true;
    }

    const randNum = Math.floor(10000 + Math.random() * 90000);
    state.refCode = `#VCL-2026-${randNum}`;

    setTimeout(() => {
      if (submitBookingBtn) {
        submitBookingBtn.innerHTML = `<span>Confirm Appointment &rarr;</span>`;
        submitBookingBtn.style.opacity = '1';
        submitBookingBtn.disabled = false;
      }

      hideModal(modal3);
      openConfirmationModal();
    }, 450);
  }

  // =========================================================================
  // STEP 4: CONFIRMATION SUCCESS MODAL (OFFICIAL PASS)
  // =========================================================================
  function openConfirmationModal() {
    showModal(modal4);

    if (confPetNameDisplay) confPetNameDisplay.textContent = state.petName;
    if (confReferenceCode) confReferenceCode.textContent = state.refCode;
    if (confServiceTitle) confServiceTitle.textContent = state.serviceTitle;
    if (confDateTime) confDateTime.textContent = `${state.selectedDate} at ${state.selectedTimeSlot}`;
    if (confPatientGuardian) confPatientGuardian.textContent = `${state.petName} (${state.petType}) • ${state.guardianName}`;
    if (confDurationPrice) confDurationPrice.textContent = `${state.servicePrice} (${state.serviceDuration})`;
    if (confPhone) confPhone.textContent = state.guardianPhone;

    // Direct WhatsApp Sync
    if (confWhatsAppSyncBtn) {
      const clinicNumber = '255713325000';
      const msg = `Habari Vet Care LTD, nimefanya booking ya miadi mtandaoni:\n\n📋 Ref: ${state.refCode}\n🩺 Huduma: ${state.serviceTitle}\n📅 Tarehe: ${state.selectedDate}\n⏰ Saa: ${state.selectedTimeSlot}\n🐾 Mnyama: ${state.petName} (${state.petType})\n👤 Mlezi: ${state.guardianName} (${state.guardianPhone})\n📍 Mikocheni Clinic\n\nAsanteni sana!`;
      confWhatsAppSyncBtn.href = `https://wa.me/${clinicNumber}?text=${encodeURIComponent(msg)}`;
    }

    // Google Calendar Sync
    if (confGoogleCalBtn) {
      const title = `Vet Care LTD: ${state.serviceTitle} for ${state.petName}`;
      const details = `Booking Ref: ${state.refCode}\nService: ${state.serviceTitle}\nPet: ${state.petName} (${state.petType})\nGuardian: ${state.guardianName}\nPhone: ${state.guardianPhone}\nClinic: Vet Care LTD, Migombani St, Mikocheni, Dar es Salaam (+255 713 325 000)`;
      const location = 'Vet Care LTD, Migombani St, Mikocheni, Dar es Salaam';
      confGoogleCalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    }

    if (closeBtn4) closeBtn4.focus();
  }

  // Modal 4 close triggers
  if (closeBtn4) closeBtn4.addEventListener('click', hideAllBookingModals);
  if (confDoneBtn) {
    confDoneBtn.addEventListener('click', () => {
      hideAllBookingModals();
      const visitSection = document.getElementById('visit');
      if (visitSection) {
        visitSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Hook up external CTAs across the site to start booking
  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingServiceModal();
    });
  }
  if (navBookBtn) {
    navBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingServiceModal();
    });
  }
  const heroRatingBanner = document.getElementById('heroRatingBanner');
  if (heroRatingBanner) {
    heroRatingBanner.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingServiceModal();
    });
  }
  if (ratingBannerBookBtn) {
    ratingBannerBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openBookingServiceModal();
    });
  }
  if (footerBookBtn) {
    footerBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingServiceModal();
    });
  }

  // Global Escape key support across all 4 modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal4 && modal4.classList.contains('active')) {
        hideModal(modal4);
      } else if (modal3 && modal3.classList.contains('active')) {
        hideModal(modal3);
      } else if (modal2 && modal2.classList.contains('active')) {
        hideModal(modal2);
      } else if (modal1 && modal1.classList.contains('active')) {
        hideModal(modal1);
      }
    }
  });
}
