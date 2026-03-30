import React from 'react';

/**
 * RSVP Header Component
 * Displays event venue, date, and response deadline
 */
const RSVPHeader = ({ t }) => (
  <div className="pt-12 pb-8 text-center">
    <h2 
      className="text-5xl md:text-6xl font-chloe uppercase tracking-[0.12em]" 
      style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}
    >
      RSVP
    </h2>
    <div className="px-8 md:px-12 pb-8 mt-8">
      <h3 className="font-chloe text-[12vw] md:text-[56px] lg:text-[72px] leading-[0.85] uppercase mb-8">
        <span className="block">Krabi</span>
        <span className="block">Ceremony</span>
      </h3>

      <p className="font-source-serif font-[300] antialiased text-[17px] md:text-[19px] uppercase tracking-wide mb-4 leading-relaxed">
        The Grotto Restaurant,<br />Rayavadee Hotel, Krabi
      </p>

      <p className="font-source-serif font-[300] antialiased text-[17px] md:text-[19px] uppercase tracking-wide mb-6">
        Friday, December 4, 2026
      </p>

      <p className="font-source-serif font-[300] antialiased text-[17px] md:text-[19px] uppercase tracking-wide mb-8">
        * Kindly Respond by April 30, 2026 *
      </p>
    </div>
  </div>
);

export default RSVPHeader;
