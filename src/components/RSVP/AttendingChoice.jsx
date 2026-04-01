import React from 'react';
import { FadeInExpand } from '../animations/Motion';

/**
 * Attending Choice Component
 * Yes/No radio selection for attendance
 * 
 * @param {string} attending - Current attending value ('yes' | 'no' | '')
 * @param {function} onSelect - Handler when selection changes
 */
const AttendingChoice = ({ attending, onSelect }) => (
  <div className="space-y-5 mb-12">
    <label
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => onSelect('yes')}
    >
      <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${attending === 'yes' ? 'bg-white' : 'group-hover:border-white'}`}>
        {attending === 'yes' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
      </span>
      <span className="font-krub font-[400] antialiased text-xl md:text-2xl uppercase tracking-wide">
        ยินดีเข้าร่วมงาน
      </span>
    </label>

    <label
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => onSelect('no')}
    >
      <span className={`w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0 transition-all ${attending === 'no' ? 'bg-white' : 'group-hover:border-white'}`}>
        {attending === 'no' && <span className="w-3 h-3 rounded-full bg-[#1079a6]"></span>}
      </span>
      <span className="font-krub font-[400] antialiased text-xl md:text-2xl uppercase tracking-wide">
        ไม่สามารถเข้าร่วมได้
      </span>
    </label>
  </div>
);

export default AttendingChoice;
