import React, { forwardRef } from 'react';

const Input = forwardRef(({ className = "", type = "text", error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={`w-full px-3 py-2 bg-slate-800 text-white border rounded-lg focus:outline-none placeholder-slate-500 placeholder:font-bold focus:ring-2 focus:ring-emerald-500 transition-colors ${
          error ? 'border-rose-500' : 'border-slate-600'
        } ${className}`}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-rose-500">
          {error.message || error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };