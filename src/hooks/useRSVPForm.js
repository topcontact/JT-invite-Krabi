import { useState, useCallback } from 'react';
import { formatPhoneNumber, filterEnglishOnly } from '../utils/formatters';
import { INITIAL_FORM_DATA } from '../utils/constants';
import { validateRSVPForm } from '../utils/validators';

/**
 * Simplified RSVP Form State Hook
 * Manages form data state only (validation and submission are separate hooks)
 * 
 * @returns {object} Form state and handlers
 */
export const useRSVPForm = () => {
  const [formData, setFormData] = useState({ krabi: { ...INITIAL_FORM_DATA } });
  const [showReview, setShowReview] = useState(false);

  /**
   * Update a specific field in the Krabi form data
   * @param {string} field - Field name to update
   * @param {any} value - New value
   */
  const updateKrabi = useCallback((field, value) => {
    let finalValue = value;

    // Apply formatting for specific fields
    if (field === 'phone') {
      finalValue = formatPhoneNumber(value);
    }

    setFormData(prev => {
      const newData = {
        ...prev,
        krabi: { ...prev.krabi, [field]: finalValue }
      };

      // Handle Date dependencies
      if (field === 'checkIn') {
        const checkIn = finalValue;
        const checkOut = newData.krabi.checkOut;
        
        // If check-in is cleared, clear check-out too
        if (!checkIn) {
          newData.krabi.checkOut = '';
        } 
        // If check-out exists and is NOT after check-in, clear it
        else if (checkOut && checkOut <= checkIn) {
          newData.krabi.checkOut = '';
        }
      }

      return newData;
    });
  }, []);

  /**
   * Handle name field change with English-only filter
   * @param {string} field - Field name ('firstName' or 'lastName')
   * @param {string} value - Input value
   * @param {function} onInvalid - Callback when non-English chars detected
   */
  const handleNameChange = useCallback((field, value, onInvalid) => {
    const hasNonEnglish = /[^a-zA-Z\s.-]/.test(value);
    
    if (hasNonEnglish && onInvalid) {
      onInvalid();
    }
    
    const filtered = filterEnglishOnly(value);
    updateKrabi(field, filtered);
  }, [updateKrabi]);

  /**
   * Handle room range checkbox toggle
   * @param {string} range - Room range value to toggle
   * @param {boolean} checked - Whether it's checked
   */
  const updateRoomRange = useCallback((range, checked) => {
    setFormData(prev => {
      const currentRanges = prev.krabi.roomRange || [];
      const newRanges = checked
        ? [...currentRanges, range]
        : currentRanges.filter(r => r !== range);
      
      return {
        ...prev,
        krabi: { ...prev.krabi, roomRange: newRanges }
      };
    });
  }, []);

  /**
   * Validate form and show review if valid
   * @param {Event} e - Form submit event
   * @returns {boolean} Whether validation passed
   */
  const handleReview = useCallback((e) => {
    e.preventDefault();
    
    const validation = validateRSVPForm(formData.krabi);
    
    if (!validation.valid) {
      alert(validation.message);
      return false;
    }
    
    setShowReview(true);
    return true;
  }, [formData]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData({ krabi: { ...INITIAL_FORM_DATA } });
    setShowReview(false);
  }, []);

  return {
    formData,
    showReview,
    setShowReview,
    updateKrabi,
    handleNameChange,
    updateRoomRange,
    handleReview,
    resetForm,
  };
};

export default useRSVPForm;
