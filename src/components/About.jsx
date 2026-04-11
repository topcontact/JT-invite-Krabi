import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';
import { useLanguage } from '../contexts/LanguageContext';
import EventCard from './EventCard';

const About = () => {
    const { language } = useLanguage();

    const t = {
        titleVenue: "VENUE",
        titleAnd: "and",
        titleCeremony: "Celebration beneath the Grotto",
        descRailay: language === 'th'
            ? "ไร่เลย์เป็นคาบสมุทรที่สวยงามซึ่งเข้าถึงได้ทางเรือเท่านั้น เนื่องจากมีหน้าผาหินปูนสูงชันโอบล้อมเอาไว้ หน้าผาเหล่านี้ดึงดูดนักปีนหน้าผาจากทั่วโลก และสถานที่แห่งนี้ยังโดดเด่นด้วยชายหาดที่งดงามพร้อมบรรยากาศการพักผ่อนที่แสนสงบ"
            : "Railay is a beautiful peninsula accessible only by boat due to the high limestone cliffs cutting off mainland access. These cliffs attract rock climbers from all over the world, but the area is also known for its beautiful beaches and quiet relaxing atmosphere.",
        descCeremony1: language === 'th'
            ? "ขอเชิญร่วมเป็นส่วนหนึ่งในค่ำคืนแห่งความทรงจำ ในงานเลี้ยงฉลองมงคลสมรสจะจัดขึ้นที่ห้องอาหารเดอะ กรอตโต (โรงแรมรายาวดี) ซึ่งตั้งอยู่ใต้หน้าผาหินปูนโบราณริมหาดถ้ำพระนางอันงดงาม ซึ่งพิธีการจะดำเนินการในช่วงพระอาทิตย์ตก และต่อด้วยงานเลี้ยงฉลองมื้อเย็นภายใต้แสงดาวริมหาดไร่เลย์"
            : "Join us for an unforgettable evening. The wedding reception will be held at The Grotto Restaurant (Rayavadee Hotel), set beneath an ancient limestone cliff edge that fringes the beautiful Phranang Beach.",
        descCeremony2: language === 'th'
            ? ""
            : "Expect incredible sunset views, dinner under the stars, and a night of celebration."
    };

    return (
        <div id="location" className="relative w-full z-10 overflow-hidden">
            {/* --- 1. About Railay and our ceremony --- */}
            <section className="relative py-16 md:py-24 px-4 md:px-8 min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-[#1079a6]">
                    <img src="/railay-bg.jpg" alt="Railay Background" className="w-full h-full object-cover object-[center_30%] opacity-60" />
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1079a6]/80 via-[#1079a6]/30 to-[#1079a6]/90"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-[10.5vw] md:text-[64px] lg:text-[80px] font-chloe text-white mb-4 drop-shadow-lg leading-tight uppercase">{t.titleVenue}</h2>
                        <div className="w-24 h-px bg-white/40 mx-auto mt-8"></div>
                    </FadeIn>

                    <div className="flex justify-center">
                        <FadeIn delay={0.2} className="w-full max-w-4xl text-center space-y-12">
                            <p className={`text-white ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[300] antialiased leading-relaxed text-[4.26vw] md:text-[24px] lg:text-[32px] drop-shadow-md`}>
                                {t.descRailay}
                            </p>

                            <div className="bg-[#1079a6]/60 rounded-2xl border border-white/20 backdrop-blur-md mx-auto text-left relative overflow-hidden shadow-2xl w-full max-w-5xl flex flex-col mt-16">
                                {/* Subtle gleam effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky/50 to-transparent z-10"></div>

                                {/* Image Section */}
                                <div className="w-full aspect-video md:aspect-[21/9]">
                                    <img src="/ceremony-note.jpg" alt="Ceremony Note" className="w-full h-full object-cover" />
                                </div>

                                {/* Text Section */}
                                <div className="p-8 md:p-10 w-full flex flex-col justify-center">
                                    <h4 className="font-source-serif font-[300] antialiased text-[5.25vw] md:text-[32px] lg:text-[40px] text-white mb-6 leading-tight">
                                        {t.titleCeremony}
                                    </h4>
                                    <p className={`text-white ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[300] antialiased text-[4.26vw] md:text-[24px] lg:text-[32px] leading-relaxed ${t.descCeremony2 ? 'mb-6' : 'mb-10'}`}>
                                        {t.descCeremony1}
                                    </p>
                                    {t.descCeremony2 && (
                                        <p className={`text-white ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[300] antialiased text-[4.26vw] md:text-[24px] lg:text-[32px] leading-relaxed mb-10`}>
                                            {t.descCeremony2}
                                        </p>
                                    )}

                                </div>
                            </div>

                            {/* Location Card explicitly placed AFTER the two-column block */}
                            <div className="w-full mt-10 md:mt-16 flex justify-center">
                                <EventCard
                                    title={language === 'th' ? "งานมงคลสมรส และ เลี้ยงฉลอง" : "Wedding Ceremony and Reception"}
                                    date={language === 'th' ? "วันศุกร์ที่ 4 ธันวาคม 2026" : "Friday, December 4, 2026"}
                                    time={language === 'th' ? "เริ่มเวลา 16:00 น." : "Start at 16:00"}
                                    location="The Grotto Restaurant"
                                    hotel="Rayavadee Resort"
                                    mapLink="https://maps.google.com/?q=The+Grotto+Rayawadee+Krabi"
                                    color="blue"
                                    delay={0.2}
                                    bgImage="/Grotto pic.jpg"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
