import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.8 }}
        className={className}
    >
        {children}
    </motion.div>
);

const HotelCard = ({ hotel, delay }) => {
    // If hotel has 'options' array, it's a slider. Otherwise, it's a single static card (represented as a 1-item array for consistency).
    const isSlider = Array.isArray(hotel.options) && hotel.options.length > 1;
    const options = isSlider ? hotel.options : [hotel];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % options.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    };

    const handleDotClick = (idx) => {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            handleNext();
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const currentOption = options[currentIndex];

    // Single static card render (like Rayavadee currently)
    if (!isSlider) {
        return (
            <FadeIn delay={delay} className="flex flex-col bg-gradient-to-br from-mist/50 to-white p-6 md:p-8 rounded-3xl border border-sky/30 shadow-lg text-center h-full">
                <a href={currentOption.mapLink} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100 group relative flex-shrink-0">
                    <img src={currentOption.image} alt={currentOption.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </a>

                <h3 className="text-xl font-serif text-navy mb-4 h-12 flex items-center justify-center">{currentOption.name}</h3>

                <div className="mb-4">
                    <a href={currentOption.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue text-white hover:bg-navy transition-colors font-sans font-semibold text-xs md:text-sm rounded-full px-5 py-2 shadow-sm">
                        Map and Review
                    </a>
                </div>

                <div className="flex-col h-[140px] mb-6 flex justify-start items-center">
                    <p className="text-gray-600 font-sans text-sm flex-grow">
                        {currentOption.description}
                    </p>
                </div>

                <div className="mt-auto">
                    <span className="inline-block bg-mist/80 text-blue font-sans font-semibold text-xs px-4 py-2 rounded-full border border-blue/10">
                        {currentOption.price}
                    </span>
                    <span className="inline-block text-blue font-sans font-semibold text-xs px-4 py-2">
                        {currentOption.distance}
                    </span>
                </div>
            </FadeIn>
        );
    }

    // Slider render
    return (
        <FadeIn delay={delay} className="flex flex-col bg-gradient-to-br from-mist/50 to-white p-6 md:p-8 rounded-3xl border border-sky/30 shadow-lg text-center h-full relative overflow-hidden">
            {/* Image Slider */}
            <div className="block w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100 group relative flex-shrink-0 bg-gray-50">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                    >
                        <img
                            src={currentOption.image}
                            alt={currentOption.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none"></div>

                {/* Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all z-20"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy p-1.5 rounded-full shadow-md backdrop-blur-sm transition-all z-20"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <h3 className="text-xl font-serif text-navy mb-4 h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentOption.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {currentOption.name}
                    </motion.span>
                </AnimatePresence>
            </h3>

            <div className="mb-4">
                <a href={currentOption.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue text-white hover:bg-navy transition-colors font-sans font-semibold text-xs md:text-sm rounded-full px-5 py-2 shadow-sm">
                    Map and Review
                </a>
            </div>

            <div className="flex-col h-[140px] mb-6 flex justify-start items-center">
                <p className="text-gray-600 font-sans text-sm flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentOption.description}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentOption.description}
                        </motion.span>
                    </AnimatePresence>
                </p>
                <AnimatePresence mode="wait">
                    {currentOption.note && (
                        <motion.p
                            key={`note-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-600 font-sans mt-2 text-sm"
                        >
                            {currentOption.note}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-4">
                {options.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-navy w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
            </div>

            <div className="mt-auto">
                <span className="inline-block bg-mist/80 text-blue font-sans font-semibold text-xs px-4 py-2 rounded-full border border-blue/10">
                    {currentOption.price}
                </span>
            </div>

            <div className="mt-auto">
                <span className="inline-block text-blue font-sans font-semibold text-xs px-4 py-2 ">
                    {currentOption.distance}
                </span>
            </div>
        </FadeIn>
    );
};

export default HotelCard;
