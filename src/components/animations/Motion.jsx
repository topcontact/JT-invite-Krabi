import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FadeInExpand = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInUp = ({ children, delay = 0, duration = 0.8, className = "", once = true, margin = "0px", style }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin }}
        transition={{ delay, duration }}
        className={className}
        style={style}
    >
        {children}
    </motion.div>
);

export const ElegantReveal = ({ children, delay = 0, duration = 1.2, className = "", yOffset = 40 }) => (
    <motion.div
        initial={{ opacity: 0, y: yOffset, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInScale = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInView = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeIn = ({ children, delay = 0, duration = 0.8, className = "" }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInUpOnLoad = ({ children, delay = 0, duration = 0.8, yOffset = 20, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration }}
        className={className}
    >
        {children}
    </motion.div>
);

export const Shake = ({ trigger, children, className }) => (
    <motion.div
        key={trigger}
        animate={trigger > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SlideInWarning = ({ isVisible, children, className }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className={className}
            >
                {children}
            </motion.p>
        )}
    </AnimatePresence>
);
