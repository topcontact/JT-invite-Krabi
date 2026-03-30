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
    formData.rooms === 'Share room'
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
    
    const roomShareResult = validateRoomShare(formData);
    if (!roomShareResult.valid) return roomShareResult;
    
    if (formData.waitGroupRate === 'yes') {
      const roomRangeResult = validateRoomRange(formData);
      if (!roomRangeResult.valid) return roomRangeResult;
      
      const datesResult = validateDates(formData);
      if (!datesResult.valid) return datesResult;
    }
  }
  
  return { valid: true, message: '' };
};
