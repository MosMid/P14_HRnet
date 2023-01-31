import React, { useState } from 'react';

const DatePicker = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const maxDate = new Date();
    if(props.minAge){
        maxDate.setFullYear(maxDate.getFullYear() - props.minAge);
    }

    const handleChange = (event) => {
      const date = new Date(event.target.value);
      setSelectedDate(date);
      props.onSelectedDate(date);
    }
      
    return (
      <input
        type="date"
        max={maxDate.toISOString().substr(0, 10)}
        onChange={handleChange}
        style={props.style}
      />
    );
}

export default DatePicker;