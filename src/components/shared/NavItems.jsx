import { MapPin, Calendar, Bed, Send, Globe } from 'lucide-react';

/**
 * Navigation items configuration
 * Shared between Ceremonies and FloatingNav components
 */
export const NAV_ITEMS = [
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'program', label: 'Program', icon: Calendar },
  { id: 'where-to-stay', label: 'Hotels', icon: Bed },
  { id: 'rsvp', label: 'RSVP', icon: Send },
];

/**
 * Language toggle configuration
 */
export const LANGUAGE_TOGGLE = {
  icon: Globe,
  getLabel: (language) => language === 'en' ? 'TH' : 'EN',
};

/**
 * Get navigation items for a given context
 * @param {string} context - 'ceremonies' | 'floating'
 * @returns {array} Navigation items array
 */
export const getNavItems = (context = 'default') => {
  // Future: could filter items based on context
  return NAV_ITEMS;
};

export default NAV_ITEMS;
