"use client";
import React from "react";

export default function TextBox({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 3,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full border border-[#7F60FF] rounded-4xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F60FF] resize-none"
      />
    </div>
  );
}
