import { useState, useRef, useCallback } from 'react';
import { hasNonEnglishChars } from '../utils/formatters';

/**
 * Custom hook for RSVP form validation
 * Separates validation logic from form state
 * 
 * @returns {object} Validation state and handlers
 */
export const useRSVPValidation = () => {
  const [nameShake, setNameShake] = useState(0);
  const [englishWarning, setEnglishWarning] = useState(false);
  const warningTimer = useRef(null);

  /**
   * Handle name field validation (English-only)
   * Triggers shake animation and warning for non-English characters
   */
  const handleNameValidation = useCallback((value) => {
    if (hasNonEnglishChars(value)) {
      setNameShake(prev => prev + 1);
      setEnglishWarning(true);
      
      // Auto-hide warning after 2.5s
      if (warningTimer.current) {
        clearTimeout(warningTimer.current);
      }
      warningTimer.current = setTimeout(() => {
        setEnglishWarning(false);
      }, 2500);
      
      return false;
    }
    
    return true;
  }, []);

  /**
   * Reset validation state
   */
  const resetValidation = useCallback(() => {
    setNameShake(0);
    setEnglishWarning(false);
    if (warningTimer.current) {
      clearTimeout(warningTimer.current);
    }
  }, []);

  return {
    nameShake,
    englishWarning,
    handleNameValidation,
    resetValidation,
  };
};

export default useRSVPValidation;
