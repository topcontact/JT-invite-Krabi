import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex bg-white/50 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg relative items-center pointer-events-auto">
        {/* Background highlight pill */}
        <div
          className={`absolute left-1 top-1 bottom-1 w-[46px] bg-navy rounded-full transition-transform duration-300 ease-in-out ${
            language === 'th' ? 'translate-x-[46px]' : 'translate-x-0'
          }`}
        />

        {/* EN Button */}
        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 w-[46px] text-xs font-sans font-medium uppercase tracking-wider py-2 rounded-full transition-colors duration-300 ${
            language === 'en' ? 'text-white' : 'text-navy hover:text-navy/70'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>

        {/* TH Button */}
        <button
          onClick={() => setLanguage('th')}
          className={`relative z-10 w-[46px] text-xs font-sans font-medium uppercase tracking-wider py-2 rounded-full transition-colors duration-300 ${
            language === 'th' ? 'text-white' : 'text-navy hover:text-navy/70'
          }`}
          aria-label="Switch to Thai"
        >
          TH
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
