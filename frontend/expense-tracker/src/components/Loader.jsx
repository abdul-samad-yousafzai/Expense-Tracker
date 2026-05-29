import React from 'react';

const Loader = ({ size = 32 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        style={{ width: size, height: size }}
        className="border-4 border-t-transparent border-white rounded-full animate-spin"
      />
    </div>
  );
};

export default Loader;
