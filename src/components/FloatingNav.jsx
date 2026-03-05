import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Bed, Send } from 'lucide-react';

const FloatingNav = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 60% of viewport height (Hero section)
            if (window.scrollY > window.innerHeight * 0.6) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Determine active section for highlighting
            const sections = ['location', 'program', 'where-to-stay', 'rsvp'];
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - window.innerHeight / 2) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'program', label: 'Program', icon: Calendar },
        { id: 'where-to-stay', label: 'Hotels', icon: Bed },
        { id: 'rsvp', label: 'RSVP', icon: Send },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm md:max-w-[480px]"
                >
                    <div className="flex items-center justify-around bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] rounded-full px-2 py-3 md:px-4 md:py-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            // Check if active (rough check)
                            const isActive = activeSection === item.id;

                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 ${isActive ? 'text-blue bg-white/50 shadow-sm scale-105' : 'text-navy/80 hover:text-blue hover:bg-white/30 hover:scale-105'}`}
                                >
                                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-blue' : ''}`} />
                                    <span className="text-[10px] md:text-xs font-sans tracking-widest uppercase">{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default FloatingNav;
