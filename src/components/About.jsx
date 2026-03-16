import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
    const { language } = useLanguage();

    const t = {
        titleRailay: "About Railay",
        titleAnd: "and",
        titleCeremony: "Our Ceremony",
        descRailay: language === 'th'
            ? "ไร่เลย์เป็นคาบสมุทรที่สวยงามซึ่งเข้าถึงได้ทางเรือเท่านั้น เนื่องจากมีหน้าผาหินปูนสูงชันโอบล้อมเอาไว้ หน้าผาเหล่านี้ดึงดูดนักปีนหน้าผาจากทั่วโลก และสถานที่แห่งนี้ยังโดดเด่นด้วยชายหาดที่งดงามพร้อมบรรยากาศการพักผ่อนที่แสนสงบ"
            : "Railay is a beautiful peninsula accessible only by boat due to the high limestone cliffs cutting off mainland access. These cliffs attract rock climbers from all over the world, but the area is also known for its beautiful beaches and quiet relaxing atmosphere.",
        descCeremony1: language === 'th'
            ? "ขอเชิญร่วมเป็นส่วนหนึ่งในค่ำคืนแห่งความทรงจำ งานเลี้ยงฉลองมงคลสมรสจะจัดขึ้นที่ห้องอาหารเดอะ กรอตโต (โรงแรมรายาวดี) ซึ่งตั้งอยู่ใต้หน้าผาหินปูนโบราณริมหาดถ้ำพระนางอันงดงาม"
            : "Join us for an unforgettable evening. The wedding reception will be held at The Grotto Restaurant (Rayavadee Hotel), set beneath an ancient limestone cliff edge that fringes the beautiful Phranang Beach.",
        descCeremony2: language === 'th'
            ? "เตรียมพบกับวิวพระอาทิตย์ตกที่แสนงดงาม ดินเนอร์ใต้แสงดาว และค่ำคืนแห่งการเฉลิมฉลองไปกับเรา"
            : "Expect incredible sunset views, dinner under the stars, and a night of celebration."
    };

    return (
        <div id="about" className="relative w-full z-10 overflow-hidden">
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
                        <h2 className="text-6xl md:text-7xl font-ballet text-white mb-4 drop-shadow-lg">{t.titleRailay}</h2>
                        <h3 className="text-3xl font-serif text-sky mb-8 drop-shadow-md">{t.titleAnd}</h3>
                        <h3 className="text-3xl font-serif text-sky mb-8 drop-shadow-md">{t.titleCeremony}</h3>
                        <div className="w-24 h-px bg-white/40 mx-auto"></div>
                    </FadeIn>

                    <div className="flex justify-center">
                        <FadeIn delay={0.2} className="w-full max-w-3xl text-center space-y-8">
                            <p className="text-white font-sans leading-relaxed text-lg md:text-xl drop-shadow-md">
                                {t.descRailay}
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
                                        {t.titleCeremony}
                                    </h4>
                                    <p className="text-sky/90 font-sans text-sm md:text-base leading-relaxed mb-4">
                                        {t.descCeremony1}
                                    </p>
                                    <p className="text-sky/90 font-sans text-sm md:text-base leading-relaxed">
                                        {t.descCeremony2}
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
