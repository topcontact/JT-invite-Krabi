import React from 'react';
import { FadeInExpand } from '../animations/Motion';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Attending Choice Component
 * Yes/No radio selection for attendance
 * 
 * @param {string} attending - Current attending value ('yes' | 'no' | '')
 * @param {function} onSelect - Handler when selection changes
 */
const AttendingChoice = ({ attending, onSelect }) => {
  const { language } = useLanguage();
  return (
  <div className="space-y-5 mb-12">
    <label
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => onSelect('yes')}
    >
      <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${attending === 'yes' ? 'bg-white' : 'group-hover:border-white'}`}>
        {attending === 'yes' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
      </span>
      <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[400] antialiased text-xl md:text-2xl uppercase tracking-wide`}>
        {language === 'th' ? "ยินดีเข้าร่วมงาน" : "Joyfully Attend"}
      </span>
    </label>

    <label
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => onSelect('no')}
    >
      <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${attending === 'no' ? 'bg-white' : 'group-hover:border-white'}`}>
        {attending === 'no' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
      </span>
      <span className={`${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[400] antialiased text-xl md:text-2xl uppercase tracking-wide`}>
        {language === 'th' ? "ไม่สามารถเข้าร่วมได้" : "Declines with Regret"}
      </span>
    </label>
  </div>
  );
};

export default AttendingChoice;
