import React from 'react';
import { FadeInScale } from '../animations/Motion';
import { Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * RSVP Success Component
 * Displays thank you message after successful submission
 */
const RSVPSuccess = () => {
  const { language } = useLanguage();
  return (
  <section className="pt-20 pb-40 md:pb-48 px-4" id="rsvp">
    <FadeInScale className="max-w-2xl mx-auto rounded-3xl shadow-2xl p-12 text-center text-white bg-[#1079a6]">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <Send className="w-10 h-10 text-[#1079a6]" />
        </div>
      </div>
      <h2 className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} text-4xl text-white mb-4`}>
        {language === 'th' ? "ขอบคุณ!" : "Thank You!"}
      </h2>
      <p className={`text-lg text-white/80 ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[400] mb-8`}>
        {language === 'th' ? "เราได้รับข้อมูลการตอบรับของคุณเรียบร้อยแล้ว แล้วพบกันในวันงาน!" : "We have successfully received your RSVP. See you there!"}
      </p>
      <p className="text-white font-instrument font-medium uppercase tracking-wider">
        Supicha & Teerawat
      </p>
    </FadeInScale>
  </section>
  );
};

export default RSVPSuccess;
