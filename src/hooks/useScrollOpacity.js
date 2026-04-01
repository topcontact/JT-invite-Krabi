import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-based opacity calculation
 * Shared between navigation components
 * 
 * @param {object} options - Configuration options
 * @param {number} options.threshold - Scroll distance before opacity starts fading (default: 250)
 * @param {number} options.minOpacity - Minimum opacity value (default: 0)
 * @returns {object} { opacity, scrollY, isActive }
 */
export const useScrollOpacity = ({ 
  threshold = 250, 
  minOpacity = 0 
} = {}) => {
  const [opacity, setOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate opacity based on scroll position
      const newOpacity = Math.max(minOpacity, 1 - currentScrollY / threshold);
      setOpacity(newOpacity);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, minOpacity]);

  return {
    opacity,
    scrollY,
    isActive: opacity > 0.1,
  };
};

/**
 * Custom hook for element visibility-based opacity
 * Calculates opacity based on element's position in viewport
 * 
 * @param {React.RefObject} elementRef - Ref to the target element
 * @param {object} options - Configuration options
 * @param {number} options.threshold - Scroll distance for fade (default: 250)
 * @returns {object} { opacity, isVisible }
 */
export const useElementScrollOpacity = (elementRef, { 
  threshold = 250 
} = {}) => {
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) {
        setOpacity(1);
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const top = rect.top;

      // Calculate opacity based on how far we've scrolled past the element
      if (top <= 0) {
        const scrolledPast = -top;
        const newOpacity = Math.max(0, 1 - scrolledPast / threshold);
        setOpacity(newOpacity);
        setIsVisible(newOpacity > 0.1);
      } else {
        setOpacity(1);
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, threshold]);

  return {
    opacity,
    isVisible,
  };
};

export default useScrollOpacity;
