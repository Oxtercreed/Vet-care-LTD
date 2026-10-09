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


try { window.SERVICES_DATA = SERVICES_DATA; } catch (e) {}
