import React from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, FadeInView } from './animations/Motion';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ title, date, time, location, hotel, mapLink, color, delay, bgImage }) => (
    <FadeInUp
        delay={delay}
        duration={0.8}
        className={`bg-white relative p-8 rounded-2xl shadow-xl w-full md:w-1/3 text-center flex flex-col items-center h-full overflow-hidden`}
        style={bgImage ? {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.95)), url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } : {}}
    >
        <div className="relative z-10 flex flex-col items-center gap-4 text-gray-600 font-sans flex-grow w-full">
            {/* Location - Secondary */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue" />
                    <span className="text-lg font-sans text-navy font-bold">{location}</span>
                </div>
                <span className="text-md font-sans text-navy uppercase tracking-wider">{hotel}</span>
            </div>

            {/* Date - Most Important */}
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-navy" />
                <span className="text-md font-sans text-navy">{date}</span>
            </div>

            {/* Time - Tertiary */}
            {time && (
                <div className="text-lg font-sans text-navy">
                    {time}
                </div>
            )}

            {/* Title - Least Important (Descriptive) */}
            <h3 className="text-sm font-sans text-navy-400 uppercase tracking-widest mt-4 mb-2">{title}</h3>

            {mapLink && (
                <div className="w-full flex flex-col items-center mt-auto gap-4">
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white/90 border border-blue text-blue rounded-full hover:bg-blue hover:text-white transition-colors text-sm uppercase tracking-wider"
                    >
                        View Map
                    </a>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full border-0"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    </FadeInUp>
);

const Location = () => {

    return (
        <section id="location" className="max-w-6xl mx-auto bg-white py-16 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-10px_30px_rgba(0,0,50,0.05)] relative z-20 -mt-8">
            <FadeInView>
                <h2 className="text-5xl md:text-6xl font-script text-blue mb-16 text-center">
                    Location
                </h2>
            </FadeInView>

            <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl gap-8 px-4">
                <EventCard
                    title="Wedding Ceremony and Reception"
                    date="Friday, December 4, 2026"
                    time="Start at 16:00"
                    location="The Grotto Restaurant"
                    hotel="Rayavadee Resort"
                    mapLink="https://maps.google.com/?q=The+Grotto+Rayawadee+Krabi"
                    color="blue"
                    delay={0.2}
                    bgImage="/Grotto pic.jpg"
                />
            </div>
        </section>
    );
};

export default Location;
