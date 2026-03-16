import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';
import { Plane, Ship, Car } from 'lucide-react';
import TransferCard from './TransferCard';
import { useLanguage } from '../contexts/LanguageContext';

const HowToGet = () => {
    const { language } = useLanguage();

    const travelSteps = [
        {
            icon: Plane,
            title: language === 'th' ? "เที่ยวบินไปกระบี่" : "Flight to Krabi",
            description: language === 'th' ? "บินตรงสู่สนามบินนานาชาติกระบี่ (KBV) จากกรุงเทพฯ" : "Fly directly to Krabi International Airport (KBV) from Bangkok.",
            note: language === 'th' 
                ? "มีเที่ยวบินให้บริการจากทั้งสนามบินดอนเมือง\nและสนามบินสุวรรณภูมิ\nค่าโดยสารไป-กลับโดยประมาณ:\n4,000 – 7,000 บาท"
                : "Flights are available from both \nDon Mueang and Suvarnabhumi airports.\nEstimated round-trip fare: \n4,000 – 7,000 THB",
            delay: 0.1,
            bgImage: "/FlightPic.jpg"
        },
        {
            icon: Car,
            title: language === 'th' ? "ต่อรถไปท่าเรือ" : "Transfer to Pier",
            description: language === 'th' ? "นั่งแท็กซี่หรือรถตู้ที่นัดหมายไว้จากสนามบินไปท่าเรืออ่าวน้ำเมา (สะพานแขวน) หรืออ่าวนาง" : "Take a taxi or pre-arranged van from the airport to Ao Nam Mao Pier (Short bridge) or Ao Nang.",
            note: language === 'th'
                ? "เรามีบริการรถตู้รับ-ส่งจากสนามบินกระบี่ไปท่าเรือ\nในวันที่ 3 และ 4 ธันวาคม\nรถออกก่อนเวลา 12:00 น.\nใช้เวลาเดินทาง 40 นาทีไปยังท่าเรือ"
                : "We provide van transfers from KBV Airport to the pier \non December 3rd and 4th,\nDeparting before 12:00 PM. \nTravel time: 40 minutes to pier.",
            delay: 0.3,
            bgImage: "/VanTransferpIC.jpg"
        },
        {
            icon: Ship,
            title: language === 'th' ? "เรือไปไร่เลย์" : "Boat to Railay",
            description: language === 'th' ? "นั่งเรือหางยาว (ประมาณ 15-20 นาที) จากท่าเรือไปไร่เลย์" : "Longtail boat ride (approx. 15-20 min) from the pier to Railay.",
            note: language === 'th'
                ? "แขกที่ใช้บริการรถตู้รับ-ส่งของเราสามารถขึ้นเรือไปยังไร่เลย์ได้โดยตรง"
                : "Guests using our van transfer can board the boat to Railay directly.",
            delay: 0.5,
            bgImage: "/LongtailPic.jpg"
        }
    ];

    return (
        <section id="getting-there" className="max-w-6xl mx-auto px-12 md:px-20 py-15 bg-white">
            <FadeIn className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-script text-navy mb-4">
                    {language === 'th' ? "การเดินทาง" : "How to Get There"}
                </h2>
                <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                <p className="mt-6 text-gray-500 font-sans max-w-2xl mx-auto">
                    {language === 'th' 
                        ? "ไร่เลย์สามารถเข้าถึงได้โดยเรือเท่านั้น นี่คือเส้นทางการเดินทางที่เราแนะนำจากกรุงเทพฯ ไปยังกระบี่ และสุดท้ายไปยังไร่เลย์"
                        : "Railay can only be reached by boat. Here is our recommended travel route from Bangkok to Krabi, and finally to Railay."}
                </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-[64px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue/10 via-blue/30 to-blue/10 z-0"></div>

                {travelSteps.map((step, index) => (
                    <TransferCard
                        key={index}
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                        note={step.note}
                        delay={step.delay}
                        bgImage={step.bgImage}
                    />
                ))}
            </div>
        </section>
    );
};

export default HowToGet;
