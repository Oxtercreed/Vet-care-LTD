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
    window.scrollTo({ left: 0, top: window.scrollY });
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
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