import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Bed, Send, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingNav = () => {
    const { language, setLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine active section for highlighting
            const sections = ['ceremonies', 'location', 'getting-there', 'program', 'where-to-stay', 'rsvp'];
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
                    if (currentScrollY >= absoluteTop - window.innerHeight / 2) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);

            // Show after scrolling past 60% of viewport height
            if (currentScrollY > window.innerHeight * 0.6) {
                // Hide navbar entirely while in the ceremonies section
                if (current === 'ceremonies') {
                    setIsVisible(false);
                } else {
                    if (currentScrollY > lastScrollY.current + 2) {
                        // Scrolling DOWN - Hide Navbar
                        setIsVisible(false);
                    } else if (currentScrollY < lastScrollY.current - 2) {
                        // Scrolling UP - Show Navbar
                        setIsVisible(true);
                    }
                }
            } else {
                // At the top - Hide Navbar
                setIsVisible(false);
            }

            // Update last scroll position
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'location', label: language === 'th' ? 'สถานที่' : 'Location', icon: MapPin },
        { id: 'program', label: language === 'th' ? 'กำหนดการ' : 'Program', icon: Calendar },
        { id: 'where-to-stay', label: language === 'th' ? 'โรงแรม' : 'Hotels', icon: Bed },
        { id: 'rsvp', label: language === 'th' ? 'ตอบกลับ' : 'RSVP', icon: Send },
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
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="flex flex-col items-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-navy/80 md:hover:text-blue md:hover:bg-white/30 active:bg-white/30 md:hover:scale-105"
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className={`text-[9px] md:text-[10px] ${language === 'th' ? 'font-krub' : 'font-sans tracking-widest uppercase'}`}>{item.label}</span>
                                </a>
                            );
                        })}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                            className="flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-navy/80 md:hover:text-blue md:hover:bg-white/30 active:bg-white/30 md:hover:scale-105 cursor-pointer border-none bg-transparent"
                            aria-label="Toggle Language"
                        >
                            <Globe className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">
                                {language === 'en' ? 'TH' : 'EN'}
                            </span>
                        </button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default FloatingNav;
