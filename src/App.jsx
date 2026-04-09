import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Ceremonies from './components/Ceremonies';
import About from './components/About';
import HowToGet from './components/HowToGet';
import CeremonyProgram from './components/CeremonyProgram';
import WhereToStay from './components/WhereToStay';
import RSVP from './components/RSVP/index';
import Envelope from './components/Envelope';
import FloatingNav from './components/FloatingNav';

import { useLanguage } from './contexts/LanguageContext';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (isEnvelopeOpen) {
      document.body.style.backgroundColor = '#0f79a6';
    } else {
      document.body.style.backgroundColor = '#ede2e1';
    }
  }, [isEnvelopeOpen]);

  // For Krabi Standalone project, we don't need URL parsing.

  return (
    <div className={`min-h-[100dvh] relative ${language === 'th' ? 'font-krub' : ''}`}>
      <Envelope onOpen={() => setIsEnvelopeOpen(true)} />

      {/* Main Content - hidden behind envelope until opened */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Hero />
        <Ceremonies />
        <div className="bg-mist w-full">
            <About />
            <HowToGet />
            <CeremonyProgram />
            <WhereToStay />
            <RSVP />
        </div>
      </div>
      <FloatingNav />
    </div>
  );
}

export default App;
