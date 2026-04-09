import React, { useState } from 'react';
import envelopeImg from '../assets/upscaleEnvelope.png';


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
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-1000 ease-in-out ${isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>

            {/* Full Screen Envelope Image */}
            {/* Using object-cover to ensure it fills the screen as requested ("paper full page") */}
            <div
                className="relative cursor-pointer flex items-center justify-center overflow-hidden w-full h-full md:p-8"
                onClick={handleOpen}
            >
                <div className="relative w-full h-full md:aspect-[4/3] md:h-auto md:max-h-[80vh] md:max-w-[106vh] flex items-center justify-center overflow-hidden md:rounded-3xl md:shadow-2xl md:-translate-y-6">
                    <img
                        src={envelopeImg}
                        alt="Wedding Envelope"
                        className="w-full h-full object-cover object-[center_65%] transition-transform hover:scale-105 duration-700"
                    />
                </div>

                {/* Hint Text */}
                <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none z-10">
                    <p className="text-navy/80 md:text-navy/60 font-serif animate-pulse drop-shadow-md bg-white/30 backdrop-blur-sm inline-block px-4 py-1 rounded-full">Tap anywhere to open</p>
                </div>
            </div>

        </div>
    );
};

export default Envelope;
