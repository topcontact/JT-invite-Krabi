import React, { useState, useRef } from 'react';
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
  const snapContainerRef = useRef(null);

  // For Krabi Standalone project, we don't need URL parsing.

  return (
    <div className={`min-h-[100dvh] relative ${language === 'th' ? 'font-krub' : ''}`}>
      <Envelope onOpen={() => setIsEnvelopeOpen(true)} />

      {/* Main Content - always fully rendered behind envelope, just hidden until opened */}
      <div className={isEnvelopeOpen ? '' : 'h-0 overflow-hidden'}>
        {/* Scroll Snap Container: เฉพาะ Hero ↔ Ceremonies */}
        <div
          id="snap-container"
          ref={snapContainerRef}
          className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory shrink-0"
          style={{ scrollSnapStop: 'always' }}
        >
          <Hero scrollContainerRef={snapContainerRef} />
          <Ceremonies />
        </div>
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
