/**
 * ==========================================================================
 * VET CARE LTD - MAIN APPLICATION INITIALIZER
 * Modularized Architecture:
 * - js/services-data.js: Catalog data dictionary for all veterinary services
 * - js/navigation.js: Mobile menu drawer and smooth scroll nav highlighting
 * - js/services-carousel.js: Services track swiping and filter pills
 * - js/service-modal.js: Service detail popup modal handler
 * - js/faq.js: Accordion single-open toggle logic
 * - js/booking.js: Dedicated 4-step fullscreen appointment booking system
 * ==========================================================================
 */

function initApp() {
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initServicesShowcase === 'function') initServicesShowcase();
  if (typeof initServiceModal === 'function') initServiceModal();
  if (typeof initFaqAccordion === 'function') initFaqAccordion();
  if (typeof initSmoothScrollAndActiveNav === 'function') initSmoothScrollAndActiveNav();
  if (typeof initScrolledNavbar === 'function') initScrolledNavbar();
  if (typeof initFullscreenBookingSystem === 'function') initFullscreenBookingSystem();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
