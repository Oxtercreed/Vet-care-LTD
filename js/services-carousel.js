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
