import React from 'react';
import FieldGuide from './FieldGuide';

export default function GuidedTextarea({
  label,
  helpText,
  exampleValue,
  draftValue,
  gacpGmpTip,
  isRequired,
  value,
  onChange,
  placeholder,
  rows = 3,
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
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Ej: Detalle ${label ? label.toLowerCase() : "información"}...`}
        rows={rows}
        className={`w-full bg-slate-800 border ${isRequired && !value ? 'border-amber-500/30' : 'border-slate-700'} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors ${className} placeholder-slate-400 placeholder:font-bold`}
        {...props}
      />
    </FieldGuide>
  );
}
