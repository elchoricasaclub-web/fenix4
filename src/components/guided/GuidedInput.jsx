import React from 'react';
import FieldGuide from './FieldGuide';

export default function GuidedInput({
  label,
  helpText,
  exampleValue,
  draftValue,
  gacpGmpTip,
  isRequired,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
  name,
  ...props
}) {
  const handleUseDraft = (draft) => {
    if (onChange) {
      // Simulamos el evento
      onChange({ target: { value: draft, name: name } });
    }
  };

  return (
    <FieldGuide
      label={label}
      helpText={helpText}
      exampleValue={exampleValue}
      draftValue={draftValue}
      gacpGmpTip={gacpGmpTip}
      isRequired={isRequired}
      onUseDraft={handleUseDraft}
      value={value}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Ej: Ingrese ${label ? label.toLowerCase() : "valor"}`}
        className={`w-full bg-slate-800 border ${isRequired && !value ? 'border-amber-500/30' : 'border-slate-700'} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors ${className} placeholder-slate-400 placeholder:font-bold`}
        {...props}
      />
    </FieldGuide>
  );
}
