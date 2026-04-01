import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

/**
 * Slide To Confirm Component
 * Draggable slider for confirming actions
 * 
 * @param {object} props
 * @param {function} props.onConfirm - Callback when slide is completed
 * @param {boolean} props.isSubmitting - Whether submission is in progress
 * @param {string} props.label - Label text (default: "Slide to send")
 */
const SlideToConfirm = ({ onConfirm, isSubmitting, label = "Slide to send" }) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [confirmed, setConfirmed] = useState(false);
  const thumbWidth = 52;
  const [containerWidth, setContainerWidth] = useState(280);

  const maxDrag = containerWidth - thumbWidth - 8;
  
  // Motion transforms for visual effects
  const trackBlur = useTransform(x, [0, maxDrag], [8, 20]);
  const trackBgOpacity = useTransform(x, [0, maxDrag], [0.15, 0.05]);
  const trackBorderOpacity = useTransform(x, [0, maxDrag], [0.3, 0.6]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.4], [1, 0]);
  const thumbGlow = useTransform(x, [0, maxDrag], [0, 20]);

  const backdropFilter = useTransform(trackBlur, v => `blur(${v}px) saturate(180%)`);
  const backgroundColor = useTransform(trackBgOpacity, v => `rgba(255,255,255,${v})`);
  const borderColor = useTransform(trackBorderOpacity, v => `rgba(255,255,255,${v})`);
  const boxShadow = useTransform(thumbGlow, v => `0 2px 10px rgba(42,77,105,0.3), 0 0 ${v}px rgba(75,134,180,0.4)`);

  const handleDragEnd = () => {
    if (x.get() >= maxDrag * 0.85) {
      setConfirmed(true);
      onConfirm();
    }
  };

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (el) setContainerWidth(el.offsetWidth);
      }}
      className="relative h-14 rounded-full overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Liquid glass backdrop blur layer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          backgroundColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      />

      {/* Inner highlight */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] rounded-full pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
      />

      {/* Text label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="text-xs font-bold uppercase tracking-wider text-navy/50 ml-10 drop-shadow-sm">
          {label}
        </span>
      </motion.div>

      {/* Draggable thumb */}
      {!confirmed ? (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x, boxShadow }}
          className="absolute top-1 left-1 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          whileTap={{ scale: 0.95 }}
        >
          {/* Thumb glass */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, rgba(42,77,105,0.95), rgba(42,77,105,0.8))',
              backdropFilter: 'blur(10px) saturate(200%)',
              WebkitBackdropFilter: 'blur(10px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          <div className="relative z-10">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-mist/30 border-t-mist rounded-full animate-spin" />
            ) : (
              <ArrowRight size={20} className="text-white/90 drop-shadow-sm" />
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: maxDrag }}
          transition={{ duration: 0.2 }}
          className="absolute top-1 left-1 w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'linear-gradient(145deg, rgba(22,163,74,0.95), rgba(22,163,74,0.8))',
            backdropFilter: 'blur(10px) saturate(200%)',
            WebkitBackdropFilter: 'blur(10px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 2px 10px rgba(22,163,74,0.4), 0 0 20px rgba(22,163,74,0.3)',
          }}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Check size={20} className="text-white drop-shadow-sm" />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SlideToConfirm;
