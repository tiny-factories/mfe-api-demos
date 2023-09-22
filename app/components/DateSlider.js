import { useEffect, useRef, useState } from "react";

function DateSlider({ data, onDateChange }) {
  const dates = data.map((ds) => ds.date).sort();
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const handleChange = (e) => {
    const newIndex = e.target.value;
    setCurrentDateIndex(newIndex);
    onDateChange(dates[newIndex]);
  };

  return (
    <div className="date-slider">
      <input
        type="range"
        min="0"
        max={dates.length - 1}
        value={currentDateIndex}
        onChange={handleChange}
      />
    </div>
  );
}
export default DateSlider;
