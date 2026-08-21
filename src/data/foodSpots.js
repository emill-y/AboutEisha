export const seedFoodSpots = [
  {
    id: 'f1',
    name: 'Tiny Dumpling Co.',
    city: 'Berkeley',
    cuisine: 'Chinese',
    rating: 5,
    verdict: 'Four items on the menu and every one is correct.',
    notes:
      'Order the chive dumplings and the soup dumplings, split them, don\'t overthink it. Counter seating only, cash preferred. Line moves fast even when it looks long.',
    wouldReturn: true,
    tags: ['great for studying', 'solo lunch', 'quick bite'],
  },
  {
    id: 'f2',
    name: 'Fern & Fig',
    city: 'Berkeley',
    cuisine: 'Café',
    rating: 4,
    verdict: 'Reliable laptop café with unreasonably good pastries.',
    notes:
      'The pistachio croissant sells out by 10am on weekends, worth the early trip. Wifi is solid, outlets are scarce — get there before the 9am rush if you need one.',
    wouldReturn: true,
    tags: ['great for studying', 'date spot', 'good wifi'],
  },
  {
    id: 'f3',
    name: 'Nonna\'s Table',
    city: 'Oakland',
    cuisine: 'Italian',
    rating: 4.5,
    verdict: 'The kind of red-sauce spot that makes you forgive every other Italian place you\'ve settled for.',
    notes:
      'Went for a birthday dinner, stayed for the tiramisu. Reservations recommended on weekends. Ask for the off-menu garlic bread — they\'ll know what you mean.',
    wouldReturn: true,
    tags: ['date spot', 'special occasion'],
  },
  {
    id: 'f4',
    name: 'Corner Bodega Sandwiches',
    city: 'San Francisco',
    cuisine: 'Sandwiches',
    rating: 3.5,
    verdict: 'Good in a pinch, not worth crossing the bridge for.',
    notes:
      'The turkey club is genuinely great. Everything else is fine. Small space, mostly takeout — don\'t plan on sitting down.',
    wouldReturn: false,
    tags: ['solo lunch', 'quick bite'],
  },
  {
    id: 'f5',
    name: 'Marigold',
    city: 'San Francisco',
    cuisine: 'South Asian',
    rating: 5,
    verdict: 'Tastes like someone\'s grandmother is quietly running the kitchen.',
    notes:
      'The thali changes weekly and it\'s always the move. Went with my whole floor from the dorm and everyone left with leftovers, which never happens.',
    wouldReturn: true,
    tags: ['group dinner', 'special occasion'],
  },
  {
    id: 'f6',
    name: 'Late Nite Noodle Bar',
    city: 'Oakland',
    cuisine: 'Japanese',
    rating: 4,
    verdict: 'The 11pm ramen you didn\'t know you needed until you needed it.',
    notes:
      'Open till 1am on weekends, which is the whole appeal. Broth is rich without being heavy. Counter seats are the move if you\'re solo.',
    wouldReturn: true,
    tags: ['solo lunch', 'late night'],
  },
]

// --- localStorage-backed persistence for the food log ---
// This is a placeholder data layer. To connect a real backend/CMS later
// (e.g. Supabase, a headless CMS, or a small Express API), replace the
// three functions below with real network calls — the rest of the Food
// page only depends on this module's exported function signatures, so
// no other file needs to change.

const STORAGE_KEY = 'eisha-food-log-entries'
const ADMIN_KEY = 'eisha-food-log-admin'
// NOTE: this is a placeholder client-side gate, not real auth — anyone
// can read this value in devtools. Fine for a personal demo; swap for
// real authentication before handling anything sensitive.
const ADMIN_PASSWORD = 'dumplings'

export function loadFoodSpots() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedFoodSpots
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : seedFoodSpots
  } catch {
    return seedFoodSpots
  }
}

export function saveFoodSpots(spots) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(spots))
}

export function checkAdminPassword(pw) {
  const ok = pw === ADMIN_PASSWORD
  if (ok) sessionStorage.setItem(ADMIN_KEY, '1')
  return ok
}

export function isAdminUnlocked() {
  return sessionStorage.getItem(ADMIN_KEY) === '1'
}
