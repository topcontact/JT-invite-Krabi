import React, { useState } from 'react';
import envelopeImg from '../assets/envelope.png';

const Envelope = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Wait for animation to finish before hiding
        setTimeout(() => {
            onOpen();
            setIsHidden(true);
        }, 1000);
    };

    if (isHidden) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out ${isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>

            {/* Full Screen Envelope Image */}
            {/* Using object-cover to ensure it fills the screen as requested ("paper full page") */}
            <div
                className="relative w-full h-full cursor-pointer"
                onClick={handleOpen}
            >
                <img
                    src={envelopeImg}
                    alt="Wedding Envelope"
                    className="w-full h-full object-cover"
                />

                {/* Hint Text */}
                <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
                    <p className="text-white/80 md:text-navy/60 font-serif animate-pulse drop-shadow-md">Tap anywhere to open</p>
                </div>
            </div>

        </div>
    );
};

export default Envelope;
