import React from 'react';
import HotelCard from './HotelCard';
import { FadeInUp as FadeIn } from './animations/Motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhereToStay = () => {
    const { language } = useLanguage();
    const hotelData = [
        {
            options: [
                {
                    name: "Avatar Railay",
                    image: "/avatar-railay.webp",
                    mapLink: "https://maps.app.goo.gl/ZC8G6qj3oLhG7jaD8",
                    description: language === 'th' ? "ตัวเลือกที่คุ้มค่าที่สุด เหมาะสำหรับนักเดินทางที่ใช้เวลาทั้งวันท่องเที่ยวและต้องการที่พักที่สะดวกสบายในราคาประหยัดเพื่อพักผ่อน" : "The most cost-effective option. Perfect for travelers who spend the day exploring and need a comfortable, budget-friendly place to rest.",
                    note: language === 'th' ? "*สำหรับผู้ใหญ่เท่านั้น*" : "*Adults-Only*",
                    price: "Est. 4,000 - 6,000+ THB / night",
                    distance: "450m walk 6 min to wedding venue"
                },
                {
                    name: "Sea and Sand Resort",
                    image: "/sea-and-sand.jpg",
                    mapLink: "https://maps.app.goo.gl/NcswiQxHi9p26JtH6",
                    description: language === 'th' ? "รีสอร์ทแห่งนี้มอบการพักผ่อนที่เงียบสงบพร้อมวิวทะเลอันดามันที่สวยงาม เหมาะสำหรับผู้ที่ต้องการพักผ่อนและผ่อนคลายอย่างมีสไตล์" : "This resort offers a peaceful retreat with stunning views of the Andaman Sea. Perfect for those who want to relax and unwind in style.",
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
                    description: language === 'th' ? "ยกระดับความสะดวกสบายระดับพรีเมียม ตั้งอยู่บนฝั่งไร่เลย์ตะวันออกที่เงียบสงบ ให้บริการห้องพักกว้างขวางและพูลวิลล่า เหมาะสำหรับคู่รักหรือครอบครัวที่ต้องการความเป็นส่วนตัวเป็นพิเศษ" : "A step up in premium comfort. Located on the peaceful East Railay side, offering spacious rooms and pool villas. Great for couples or families wanting extra privacy.",
                    price: "Est. 6,000 - 10,000+ THB / night",
                    distance: "400m walk 5 min to wedding venue"
                },
                {
                    name: "Railay Village Resort",
                    image: "/railay-village.jpg",
                    mapLink: "https://maps.app.goo.gl/C5YZYhZQxonuouj57",
                    description: language === 'th' ? "อีกหนึ่งตัวเลือกที่ยอดเยี่ยม สะดวกสบายและใกล้ชิดธรรมชาติ เพลิดเพลินกับบรรยากาศที่ผ่อนคลายพร้อมจุดชมวิวที่สวยงามของไร่เลย์" : "Another fantastic option close to the action. Enjoy a relaxed atmosphere with convenient access to Railay's stunning views.",
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
            description: language === 'th' ? "สัญลักษณ์แห่งความหรูหราระดับ 5 ดาว ครอบคลุมพื้นที่ 3 ชายหาด (ไร่เลย์ตะวันออก, ไร่เลย์ตะวันตก และถ้ำพระนาง) มอบบริการระดับไฮเอนด์ ความเป็นส่วนตัวสูงสุด และสภาพแวดล้อมทางธรรมชาติที่งดงาม" : "A 5-star ultra-luxury icon spanning three beaches (East Railay, West Railay, and Phra Nang Cave). Offers high-end service, ultimate privacy, and stunning natural surroundings.",
            price: "Est. 25,000 - 40,000+ THB / night",
            distance: "Wedding venue onsite"
        }
    ];

    return (
        <section id="where-to-stay" className="max-w-6xl mx-auto bg-white rounded-b-[40px] md:rounded-b-[80px] shadow-sm relative z-10 pb-8 mb-8 px-4">
            <div className="max-w-6xl mx-auto px-4 md:px-8 pt-20 pb-12">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-[10.5vw] md:text-[92pt] lg:text-[119pt] font-chloe text-navy mb-4 drop-shadow-lg leading-tight uppercase">Where to Stay</h2>
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
