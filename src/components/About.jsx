import React from 'react';
import { motion } from 'framer-motion';


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

const About = () => {
    return (
        <div id="location" className="relative w-full z-10 overflow-hidden">
            {/* --- 1. About Railay and our ceremony --- */}
            <section className="relative py-24 px-4 md:px-8 min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-navy">
                    <img src="/railay-bg.jpg" alt="Railay Background" className="w-full h-full object-cover object-[center_30%] opacity-60" />
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/30 to-navy/90"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-6xl md:text-7xl font-ballet text-white mb-4 drop-shadow-lg">About Railay</h2>
                        <h3 className="text-3xl font-serif text-sky mb-8 drop-shadow-md">and</h3>
                        <h3 className="text-3xl font-serif text-sky mb-8 drop-shadow-md">Our Ceremony</h3>
                        <div className="w-24 h-px bg-white/40 mx-auto"></div>
                    </FadeIn>

                    <div className="flex justify-center">
                        <FadeIn delay={0.2} className="w-full max-w-3xl text-center space-y-8">
                            <p className="text-white font-sans leading-relaxed text-lg md:text-xl drop-shadow-md">
                                Railay is a beautiful peninsula accessible only by boat due to the high limestone cliffs cutting off mainland access. These cliffs attract rock climbers from all over the world, but the area is also known for its beautiful beaches and quiet relaxing atmosphere.
                            </p>
                            <div className="bg-navy/60 rounded-2xl border border-white/20 backdrop-blur-md mx-auto text-left relative overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col md:flex-row mt-12">
                                {/* Subtle gleam effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky/50 to-transparent z-10"></div>

                                {/* Image Section */}
                                <div className="w-full md:w-1/2 aspect-video md:aspect-auto">
                                    <img src="/ceremony-note.jpg" alt="Ceremony Note" className="w-full h-full object-cover" />
                                </div>

                                {/* Text Section */}
                                <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center">
                                    <h4 className="font-serif text-2xl text-white mb-3 flex items-center gap-3">
                                        Our Ceremony
                                    </h4>
                                    <p className="text-sky/90 font-sans text-sm md:text-base leading-relaxed mb-4">
                                        Join us for an unforgettable evening. The wedding reception will be held at The Grotto Restaurant (Rayavadee Hotel), set beneath an ancient limestone cliff edge that fringes the beautiful Phranang Beach.
                                    </p>
                                    <p className="text-sky/90 font-sans text-sm md:text-base leading-relaxed">
                                        Expect incredible sunset views, dinner under the stars, and a night of celebration.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
