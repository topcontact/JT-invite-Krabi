import React from 'react';
import { FadeInExpand } from '../animations/Motion';
import InputField from '../shared/InputField';
import { Baby } from 'lucide-react';

/**
 * Children Section Component
 * Handles children age group inputs
 * 
 * @param {object} props
 * @param {string} props.hasChildren - 'yes' | 'no' | ''
 * @param {number} props.childrenUnder7 - Count of children under 7
 * @param {number} props.children7To12 - Count of children 7-12
 * @param {number} props.childrenOver12 - Count of children over 12
 * @param {function} props.onHasChildrenChange - Handler for hasChildren change
 * @param {function} props.onFieldChange - Handler for field updates
 */
const ChildrenSection = ({
  hasChildren,
  childrenUnder7,
  children7To12,
  childrenOver12,
  onHasChildrenChange,
  onFieldChange,
}) => (
  <div className="mt-6 p-6 bg-white/10 rounded-xl border border-white/20">
    <h4 className="font-source-serif font-[300] text-xl text-white mb-4">Children</h4>
    <div className="space-y-3 mb-4">
      <label className="flex items-center gap-3 cursor-pointer" onClick={() => onHasChildrenChange('yes')}>
        <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${hasChildren === 'yes' ? 'bg-white' : ''}`}>
          {hasChildren === 'yes' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
        </span>
        <span className="text-white/90 font-source-serif font-[300]">Yes</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer" onClick={() => onHasChildrenChange('no')}>
        <span className={`w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 ${hasChildren === 'no' ? 'bg-white' : ''}`}>
          {hasChildren === 'no' && <span className="w-2.5 h-2.5 rounded-full bg-[#1079a6]"></span>}
        </span>
        <span className="text-white/90 font-source-serif font-[300]">No</span>
      </label>
    </div>

    {hasChildren === 'yes' && (
      <FadeInExpand className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch w-full min-w-0">
          <div className="w-full sm:w-1/3 flex min-w-0">
            <InputField
              label="Under 7 yrs"
              type="select"
              options={Array.from({ length: 11 }, (_, i) => i)}
              value={childrenUnder7}
              onChange={(e) => onFieldChange('childrenUnder7', e.target.value)}
              icon={Baby}
            />
          </div>
          <div className="w-full sm:w-1/3 flex min-w-0">
            <InputField
              label="7 - 12 yrs"
              type="select"
              options={Array.from({ length: 11 }, (_, i) => i)}
              value={children7To12}
              onChange={(e) => onFieldChange('children7To12', e.target.value)}
              icon={Baby}
            />
          </div>
          <div className="w-full sm:w-1/3 flex min-w-0">
            <InputField
              label="Over 12 yrs"
              type="select"
              options={Array.from({ length: 11 }, (_, i) => i)}
              value={childrenOver12}
              onChange={(e) => onFieldChange('childrenOver12', e.target.value)}
              icon={Baby}
            />
          </div>
        </div>
      </FadeInExpand>
    )}
  </div>
);

export default ChildrenSection;
