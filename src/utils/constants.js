/**
 * Application-wide constants
 * Centralizes magic numbers, URLs, and configuration
 */

// API Configuration
export const SCRIPT_URL = "/api/rsvp";

// Event Dates
export const EVENT_DATE = "2026-12-04";
export const EVENT_DATE_FORMATTED = "December 4, 2026";
export const RSVP_DEADLINE = "April 30, 2026";

// Room Price Ranges
export const ROOM_RANGES = [
  "ประมาณ 4,000 - 6,000+ บาท / คืน",
  "ประมาณ 6,000 - 10,000+ บาท / คืน",
  "ประมาณ 25,000 - 40,000+ บาท / คืน"
];

// Date Constraints
export const CHECKIN_MAX_DATE = "2026-12-04";
export const CHECKIN_MIN_DATE = "2026-11-01";

// Form Defaults
export const INITIAL_FORM_DATA = {
  attending: '',
  name: '',
  phone: '',
  adults: 1,
  hasChildren: '',
  childrenOver12: 0,
  children7To12: 0,
  childrenUnder7: 0,
  dietary: '',
  waitGroupRate: '',
  firstName: '',
  lastName: '',
  rooms: 1,
  shareWith: '',
  isShareNotSure: false,
  roomRange: [],
  checkIn: '',
  checkOut: '',
};

// Navigation Items Configuration
export const NAV_ITEMS = [
  { id: 'location', label: 'Location' },
  { id: 'program', label: 'Program' },
  { id: 'where-to-stay', label: 'Hotels' },
  { id: 'rsvp', label: 'RSVP' },
];
