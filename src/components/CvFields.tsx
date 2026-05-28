import React from 'react';

interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, name, value, onChange, placeholder = "", type = "text" 
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition text-[12px] text-gray-700 placeholder-gray-400 font-medium w-full shadow-sm" 
    />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label, name, value, onChange, placeholder = "", rows = 4, maxLength
}) => (
  <div className="flex flex-col gap-1.5 h-full w-full">
    <label className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">{label}</label>
    <div className="relative flex-grow flex flex-col h-full">
      <textarea 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        rows={rows}
        maxLength={maxLength}
        className="px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition text-[12px] text-gray-700 placeholder-gray-400 resize-none h-full w-full font-medium shadow-sm" 
      />
      {maxLength && (
        <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 font-bold bg-white/80 px-1.5 py-0.5 rounded pointer-events-none">
          {(value || '').length}/{maxLength}
        </span>
      )}
    </div>
  </div>
);
