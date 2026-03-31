import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Input Field Component
 * Supports text, select, date, and textarea types
 * 
 * @param {string} label - Field label
 * @param {string} type - Input type ('text', 'select', 'date', 'tel', 'email')
 * @param {string} value - Current value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {React.Component} icon - Icon component from lucide-react
 * @param {boolean} required - Whether field is required
 * @param {boolean} disabled - Whether field is disabled
 * @param {array} options - Options for select type
 * @param {object} props - Additional props passed to input
 */
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  required = false, 
  disabled = false, 
  options = [], 
  ...props 
}) => (
  <div className={`mb-4 flex flex-col w-full min-w-0 ${disabled ? 'opacity-50' : ''}`}>
    <label className="block text-navy font-source-serif-4-variable mb-1 text-sm uppercase tracking-wider truncate">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative mt-auto w-full min-w-0">
      {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-blue z-10 pointer-events-none" />}
      
      {type === 'select' ? (
        <>
          <select
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            {...props}
            className={`w-full min-w-0 p-3 ${Icon ? 'pl-10' : ''} pr-10 border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm appearance-none cursor-pointer ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-navy/50 pointer-events-none" />
        </>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...props}
          className={`w-full min-w-0 p-3 ${Icon ? 'pl-10' : ''} border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...props}
          className={`w-full min-w-0 p-3 ${Icon ? 'pl-10' : ''} border border-blue/30 rounded-lg focus:outline-none focus:border-navy bg-white/50 backdrop-blur-sm ${type === 'date' ? 'appearance-none' : ''} ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
      )}
    </div>
  </div>
);

export default InputField;
