import { useState, useCallback } from 'react';
import { SCRIPT_URL } from '../utils/constants';
import { calculateNights } from '../utils/formatters';

/**
 * Custom hook for RSVP form submission
 * Handles API calls and submission state
 * 
 * @returns {object} Submission state and handlers
 */
export const useRSVPSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Transform form data into submission format
   * @param {object} formData - Raw form data
   * @returns {object} Transformed data for API
   */
  const transformFormData = useCallback((formData) => {
    const nights = calculateNights(formData.checkIn, formData.checkOut);

    return {
      inviteType: 'krabi',
      event: 'Krabi',
      attending: formData.attending,
      name: formData.name,
      phone: `'${formData.phone}'`, // Force Google Sheets to treat as string
      adults: formData.attending === 'yes' ? formData.adults : '',
      childrenUnder7: formData.attending === 'yes' && formData.hasChildren === 'yes' 
        ? formData.childrenUnder7 
        : (formData.attending === 'yes' ? '0' : ''),
      children7To12: formData.attending === 'yes' && formData.hasChildren === 'yes' 
        ? formData.children7To12 
        : (formData.attending === 'yes' ? '0' : ''),
      childrenOver12: formData.attending === 'yes' && formData.hasChildren === 'yes' 
        ? formData.childrenOver12 
        : (formData.attending === 'yes' ? '0' : ''),
      dietary: formData.attending === 'yes' ? formData.dietary : '',
      
      // Accommodation Section Fields
      "Wait for Group Rate": formData.attending === 'yes' ? (formData.waitGroupRate === 'yes' ? 'Yes' : 'No') : '',
      "First Name (English)": formData.attending === 'yes' ? (formData.firstName || '') : '',
      "Last Name (English)": formData.attending === 'yes' ? (formData.lastName || '') : '',
      "Number of Rooms Required": formData.attending === 'yes' ? (formData.rooms || '') : '',
      "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?": formData.attending === 'yes' ? 
          (formData.stayType === 'sharing' ? 'Yes' : (formData.stayType === 'alone' ? 'No' : '')) : '',
      "Roommate Name": formData.attending === 'yes' && formData.stayType === 'sharing' 
        ? (formData.isShareNotSure ? 'Not sure now' : formData.shareWith) : '',
      
      // Keep technical keys for backward compatibility with older Sheet headers
      roomMate: formData.attending === 'yes' ? (formData.stayType || '') : '',
      waitGroupRate: formData.attending === 'yes' ? (formData.waitGroupRate || '') : '',
      firstName: formData.attending === 'yes' ? (formData.firstName || '') : '',
      lastName: formData.attending === 'yes' ? (formData.lastName || '') : '',
      rooms: formData.attending === 'yes' ? (formData.rooms || '') : '',
      roommateName: formData.attending === 'yes' && formData.stayType === 'sharing' 
        ? (formData.isShareNotSure ? 'Not sure now' : formData.shareWith) : '',

      // Room Preferences
      "Room (4k-6k THB)": formData.attending === 'yes' && 
        Array.isArray(formData.roomRange) && 
        formData.roomRange.includes("ประมาณ 4,000 - 6,000+ บาท / คืน") ? 'Yes' : '',
      "Room (6k-10k THB)": formData.attending === 'yes' && 
        Array.isArray(formData.roomRange) && 
        formData.roomRange.includes("ประมาณ 6,000 - 10,000+ บาท / คืน") ? 'Yes' : '',
      "Room (25k-40k THB)": formData.attending === 'yes' && 
        Array.isArray(formData.roomRange) && 
        formData.roomRange.includes("ประมาณ 25,000 - 40,000+ บาท / คืน") ? 'Yes' : '',
      
      // Stay Dates
      "Check-in": formData.attending === 'yes' ? (formData.checkIn || '') : '',
      "Check-out": formData.attending === 'yes' ? (formData.checkOut || '') : '',
      "Night Stay": formData.attending === 'yes' && nights > 0 ? nights : '',
      "Message": formData.message || ''
    };
  }, []);

  /**
   * Submit RSVP data to API
   * @param {object} formData - Form data to submit
   * @returns {Promise<boolean>} Success status
   */
  const submitRSVP = useCallback(async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = transformFormData(formData);
      
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      });

      // Google Apps Script returns 302 redirect after successful write.
      // Via Vite proxy, we may receive the 302 directly (not followed).
      // Both 2xx and 3xx mean the data was saved successfully.
      if (!response.ok && response.status >= 400) {
        throw new Error(`Server returned ${response.status}`);
      }

      setIsSubmitted(true);
      return true;
    } catch (err) {
      console.error("Submission error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [transformFormData]);

  /**
   * Reset submission state
   */
  const resetSubmission = useCallback(() => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    isSubmitted,
    error,
    submitRSVP,
    resetSubmission,
  };
};

export default useRSVPSubmission;
