import React from 'react';
import { FadeInScale } from '../animations/Motion';
import { Send } from 'lucide-react';

/**
 * RSVP Success Component
 * Displays thank you message after successful submission
 */
const RSVPSuccess = () => (
  <section className="pt-20 pb-40 md:pb-48 px-4" id="rsvp">
    <FadeInScale className="max-w-2xl mx-auto rounded-3xl shadow-2xl p-12 text-center text-white bg-[#1079a6]">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Send className="w-10 h-10 text-green-600" />
        </div>
      </div>
      <h2 className="text-4xl font-serif text-navy mb-4">Thank You!</h2>
      <p className="text-lg text-white/80 font-source-serif mb-8">
        Your RSVP has been sent successfully. We are so excited to celebrate with you!
      </p>
      <p className="text-white font-instrument font-medium uppercase tracking-wider">
        Supicha & Teerawat
      </p>
    </FadeInScale>
  </section>
);

export default RSVPSuccess;
