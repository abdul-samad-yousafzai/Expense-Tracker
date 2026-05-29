import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-sm shadow-slate-950/10">
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
    />
  </div>
);

export default SearchBar;
