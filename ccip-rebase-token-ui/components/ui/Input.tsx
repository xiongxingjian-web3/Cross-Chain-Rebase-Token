import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: string;
  hint?: string;
}

export function Input({ label, suffix, hint, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`h-11 w-full rounded-xl border border-[#e2efe6] bg-[#f8fcf9] px-4 text-slate-800 placeholder:text-slate-400 transition-[border-color,box-shadow] duration-200 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 ${suffix ? "pr-16" : ""} ${className}`}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-emerald-600">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
