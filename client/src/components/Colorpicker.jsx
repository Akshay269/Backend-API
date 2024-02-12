import React from 'react';

const Colorpicker = ({ color, setColor }) => {
  const handleColorChange = (e) => {
    // console.log(e.target);
    setColor(e.target.value);
  };

  return (
    <input
      type="color"
      value={color}
      onChange={handleColorChange}
      style={{ marginLeft: '10px' }}
    />
  );
};

export default Colorpicker;