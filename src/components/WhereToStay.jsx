import React from 'react';
import { motion } from 'framer-motion';
import HotelCard from './HotelCard';
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

const WhereToStay = () => {
    const hotelData = [
        {
            options: [
                {
                    name: "Avatar Railay",
                    image: "/avatar-railay.webp",
                    mapLink: "https://maps.app.goo.gl/ZC8G6qj3oLhG7jaD8",
                    description: "The most cost-effective option. Perfect for travelers who spend the day exploring and need a comfortable, budget-friendly place to rest.",
                    note: "*Adults-Only*",
                    price: "Est. 4,000 - 6,000+ THB / night",
                    distance: "450m walk 6 min to wedding venue"
                },
                {
                    name: "Sea and Sand Resort",
                    image: "/sea-and-sand.jpg",
                    mapLink: "https://maps.app.goo.gl/NcswiQxHi9p26JtH6",
                    description: "This resort offers a peaceful retreat with stunning views of the Andaman Sea. Perfect for those who want to relax and unwind in style.",
                    price: "Est. 6,000 - 10,000+ THB / night",
                    distance: "230m walk 3 min to wedding venue"
                }
            ]
        },
        {
            options: [
                {
                    name: "Bhu Nga Thani",
                    image: "/bhunga-thani.jpg",
                    mapLink: "https://maps.app.goo.gl/ZC8G6qj3oLhG7jaD8",
                    description: "A step up in premium comfort. Located on the peaceful East Railay side, offering spacious rooms and pool villas. Great for couples or families wanting extra privacy.",
                    price: "Est. 6,000 - 10,000+ THB / night",
                    distance: "400m walk 5 min to wedding venue"
                },
                {
                    name: "Railay Village Resort",
                    image: "/railay-village.jpg",
                    mapLink: "https://maps.app.goo.gl/C5YZYhZQxonuouj57",
                    description: "Another fantastic option close to the action. Enjoy a relaxed atmosphere with convenient access to Railay's stunning views.",
                    price: "Est. 6,000 - 10,000+ THB / night",
                    distance: "600m walk 8 min to wedding venue"
                }
            ]
        },
        {
            // Static single card just passes the object directly (or a 1-item options array)
            name: "Rayavadee",
            image: "/rayavadee.jpg",
            mapLink: "https://maps.app.goo.gl/goey75aq786LVDrq7",
            description: "A 5-star ultra-luxury icon spanning three beaches (East Railay, West Railay, and Phra Nang Cave). Offers high-end service, ultimate privacy, and stunning natural surroundings.",
            price: "Est. 25,000 - 40,000+ THB / night",
            distance: "Wedding venue onsite"
        }
    ];

    return (
        <section id="where-to-stay" className="max-w-6xl mx-auto bg-white rounded-b-[40px] md:rounded-b-[80px] shadow-sm relative z-10 pb-8 mb-8 px-4">
            <div className="max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-12">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-script text-navy mb-4">Where to Stay</h2>
                    <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                    <p className="mt-6 text-gray-500 font-sans max-w-2xl mx-auto">
                        Railay has beautiful accommodations ranging from luxury resorts to cozy resorts rooms.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hotelData.map((hotel, index) => (
                        <HotelCard
                            key={index}
                            hotel={hotel}
                            delay={0.2 + (index * 0.2)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhereToStay;
