import React from 'react';
import FieldGuide from './FieldGuide';

export default function GuidedSelect({
  label,
  helpText,
  exampleValue,
  draftValue,
  gacpGmpTip,
  isRequired,
  value,
  onChange,
  options = [],
  className = "",
  name,
  ...props
}) {
  const handleUseDraft = (draft) => {
    if (onChange) {
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-slate-800 border ${isRequired && !value ? 'border-amber-500/30' : 'border-slate-700'} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors ${className} placeholder-slate-400 placeholder:font-bold`}
        {...props}
      >
        <option value="">Seleccione una opción...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldGuide>
  );
}
