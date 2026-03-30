import React from 'react';

/**
 * Reusable Radio Group Component
 * Displays a group of radio options
 * 
 * @param {string} label - Group label
 * @param {string} name - Radio group name
 * @param {array} options - Array of { value, label } objects
 * @param {string} value - Currently selected value
 * @param {function} onChange - Change handler, receives selected value
 * @param {boolean} inline - Whether to display inline (default: true)
 */
const RadioGroup = ({ 
  label, 
  name, 
  options = [], 
  value, 
  onChange, 
  inline = true 
}) => (
  <div className="mb-6">
    {label && (
      <label className="block text-navy font-sans mb-2 text-sm uppercase tracking-wider">
        {label}
      </label>
    )}
    <div className={`${inline ? 'flex gap-4' : 'flex flex-col gap-2'}`}>
      {options.map((opt) => (
        <label 
          key={opt.value} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="text-navy focus:ring-navy"
          />
          <span className="font-sans text-navy">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
