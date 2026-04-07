/**
 * Formatter utility functions
 * Pure functions for data transformation
 */

/**
 * Calculate number of nights between two dates
 * @param {string} start - Check-in date (ISO string)
 * @param {string} end - Check-out date (ISO string)
 * @returns {number} Number of nights
 */
export const calculateNights = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get the day after a given date
 * @param {string} dateString - Date in ISO format
 * @returns {string} Next day in ISO format
 */
export const getNextDay = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
};

/**
 * Format phone number as 0xx-xxx-xxxx
 * @param {string} value - Raw phone input
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const trimmed = phoneNumber.slice(0, 10);
  
  // Format as 0xx-xxx-xxxx
  if (trimmed.length < 4) return trimmed;
  if (trimmed.length < 7) return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
  return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
};

/**
 * Filter non-English characters from string
 * @param {string} value - Input string
 * @returns {string} English-only string
 */
export const filterEnglishOnly = (value) => {
  return value.replace(/[^a-zA-Z\s.-]/g, '');
};

/**
 * Check if string contains non-English characters
 * @param {string} value - Input string
 * @returns {boolean} True if contains non-English
 */
export const hasNonEnglishChars = (value) => {
  return /[^a-zA-Z\s.-]/.test(value);
};

/**
 * Calculate days before event date
 * @param {string} checkInDate - Check-in date
 * @param {string} eventDate - Event date (default: 2026-12-04)
 * @returns {number} Days before event
 */
export const getDaysBeforeEvent = (checkInDate, eventDate = '2026-12-04') => {
  const event = new Date(eventDate);
  const checkIn = new Date(checkInDate);
  return Math.round((event.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Get arrival message based on days before event
 * @param {number} daysBefore - Days before event
 * @returns {string|null} Arrival message or null
 */
export const getArrivalMessage = (daysBefore, language = 'en') => {
  if (daysBefore === 0) {
    return language === 'th' 
      ? "คุณเข้าพักในวันแต่งงานของเราพอดี!" 
      : "You'll be arriving right on our wedding day!";
  } else if (daysBefore > 0) {
    if (language === 'th') {
      return `คุณเข้าพักก่อนถึงวันงาน ${daysBefore} คืน`;
    }
    const suffix = daysBefore > 1 ? 's' : '';
    return `You will arrive ${daysBefore} night${suffix} before our wedding.`;
  }
  return null;
};
