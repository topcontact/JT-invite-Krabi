/**
 * Validation utility functions
 * Pure functions for form validation
 */

/**
 * Validate children input
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateChildren = (formData) => {
  if (formData.attending === 'yes' && formData.hasChildren === 'yes') {
    const totalChildren = 
      parseInt(formData.childrenOver12 || 0) +
      parseInt(formData.children7To12 || 0) +
      parseInt(formData.childrenUnder7 || 0);
    
    if (totalChildren === 0) {
      return {
        valid: false,
        message: "Please select the number of children in the respective age groups."
      };
    }
  }
  return { valid: true, message: '' };
};

/**
 * Validate room share input
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateRoomShare = (formData) => {
  if (
    formData.attending === 'yes' && 
    formData.waitGroupRate === 'yes' && 
    (formData.stayType === 'sharing' || formData.rooms === 'Share room' || formData.rooms === 'แชร์ห้องกับผู้อื่น')
  ) {
    if (!formData.isShareNotSure && !formData.shareWith?.trim()) {
      return {
        valid: false,
        message: "Please specify who you are sharing the room with, or select 'Not sure now'."
      };
    }
  }
  return { valid: true, message: '' };
};

/**
 * Validate room range selection
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateStayType = (formData) => {
  if (formData.attending === 'yes' && formData.waitGroupRate === 'yes') {
    if (!formData.stayType) {
      return {
        valid: false,
        message: "Please select if you are staying alone or sharing a room."
      };
    }
  }
  return { valid: true, message: '' };
};

export const validateRoomRange = (formData) => {
  if (formData.attending === 'yes' && formData.waitGroupRate === 'yes') {
    if (!formData.roomRange || formData.roomRange.length === 0) {
      return {
        valid: false,
        message: "Please select at least one Room Preference price range."
      };
    }
  }
  return { valid: true, message: '' };
};

/**
 * Validate dates for check-in and check-out
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateDates = (formData) => {
  if (formData.attending === 'yes' && formData.waitGroupRate === 'yes') {
    if (!formData.checkIn || !formData.checkOut) {
      return {
        valid: false,
        message: "Please select both Check-in and Check-out dates."
      };
    }
  }
  return { valid: true, message: '' };
};

/**
 * Validate attendance selection
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateAttendance = (formData) => {
  if (!formData.attending) {
    return {
      valid: false,
      message: "Please select whether you will attend."
    };
  }
  return { valid: true, message: '' };
};

/**
 * Validate English names for group rate
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateEnglishNames = (formData) => {
  if (formData.attending === 'yes' && formData.waitGroupRate === 'yes') {
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      return {
        valid: false,
        message: "Please enter your First Name and Last Name in English for the hotel group rate."
      };
    }
    
    const englishRegex = /^[a-zA-Z\s.-]+$/;
    if (!englishRegex.test(formData.firstName) || !englishRegex.test(formData.lastName)) {
      return {
        valid: false,
        message: "First Name and Last Name must contain only English characters."
      };
    }
  }
  return { valid: true, message: '' };
};

/**
 * Run all validations
 * @param {object} formData - Form data object
 * @returns {{valid: boolean, message: string}}
 */
export const validateRSVPForm = (formData) => {
  // Check attendance first
  const attendanceResult = validateAttendance(formData);
  if (!attendanceResult.valid) return attendanceResult;
  
  // Only validate other fields if attending
  if (formData.attending === 'yes') {
    const childrenResult = validateChildren(formData);
    if (!childrenResult.valid) return childrenResult;
    
    if (formData.waitGroupRate === 'yes') {
      // Add English Name validation
      const englishNamesResult = validateEnglishNames(formData);
      if (!englishNamesResult.valid) return englishNamesResult;

      const stayTypeResult = validateStayType(formData);
      if (!stayTypeResult.valid) return stayTypeResult;

      const roomRangeResult = validateRoomRange(formData);
      if (!roomRangeResult.valid) return roomRangeResult;
      
      const datesResult = validateDates(formData);
      if (!datesResult.valid) return datesResult;

      const roomShareResult = validateRoomShare(formData);
      if (!roomShareResult.valid) return roomShareResult;
    }
  }
  
  return { valid: true, message: '' };
};
