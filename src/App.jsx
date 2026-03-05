import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Location from './components/Location';
import HowToGet from './components/HowToGet';
import CeremonyProgram from './components/CeremonyProgram';
import WhereToStay from './components/WhereToStay';
import RSVP from './components/RSVP';
import Envelope from './components/Envelope';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // For Krabi Standalone project, we don't need URL parsing.

  return (
    <div className="min-h-screen bg-mist relative">
      <Envelope onOpen={() => setIsEnvelopeOpen(true)} />

      {/* Main Content - can be hidden or just behind the envelope */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Hero />
        <About />
        <Location />
        <HowToGet />
        <CeremonyProgram />
        <WhereToStay />
        <RSVP />
      </div>
    </div>
  );
}

export default App;
