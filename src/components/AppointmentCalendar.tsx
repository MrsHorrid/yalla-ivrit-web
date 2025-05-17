import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { he } from 'date-fns/locale';
import { format, addDays, setHours, setMinutes, isAfter, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button';

// Register Hebrew locale
registerLocale('he', he);

// Define available time slots
const generateTimeSlots = (date: Date) => {
  const timeSlots = [];
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && 
                  date.getMonth() === today.getMonth() && 
                  date.getFullYear() === today.getFullYear();
  
  // Business hours: 9:00 - 18:00
  const startHour = 9;
  const endHour = 18;
  
  // 1-hour slots
  for (let hour = startHour; hour < endHour; hour++) {
    const slotTime = setHours(setMinutes(date, 0), hour);
    
    // If it's today, only show future time slots
    if (isToday && isBefore(slotTime, new Date())) {
      continue;
    }
    
    timeSlots.push(slotTime);
  }
  
  return timeSlots;
};

// Define unavailable dates (example: weekends)
const isWeekday = (date: Date) => {
  const day = date.getDay();
  return day !== 5 && day !== 6; // 5 is Friday, 6 is Saturday
};

interface AppointmentCalendarProps {
  onSelectTimeSlot: (date: Date) => void;
  selectedTimeSlot: Date | null;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  onSelectTimeSlot, 
  selectedTimeSlot 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    
    // Generate available time slots for the selected date
    const timeSlots = generateTimeSlots(date);
    setAvailableTimeSlots(timeSlots);
  };

  const handleTimeSlotSelect = (timeSlot: Date) => {
    onSelectTimeSlot(timeSlot);
  };

  // Format time slot for display
  const formatTimeSlot = (date: Date) => {
    return format(date, 'HH:mm');
  };

  return (
    <div className="space-y-6 rtl">
      <div className="space-y-2">
        <label className="block text-lg font-medium">בחר תאריך</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          filterDate={isWeekday}
          locale="he"
          dateFormat="dd/MM/yyyy"
          className="w-full p-2 rounded-md bg-white/10 border border-aidea-green/50 text-white"
          placeholderText="לחץ לבחירת תאריך"
        />
      </div>

      {selectedDate && availableTimeSlots.length > 0 && (
        <div className="space-y-2">
          <label className="block text-lg font-medium">בחר שעה</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableTimeSlots.map((timeSlot, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                className={`${
                  selectedTimeSlot && 
                  selectedTimeSlot.getTime() === timeSlot.getTime()
                    ? "bg-aidea-green text-black border-aidea-green shadow-[0_0_10px_rgba(193,255,69,0.5)] hover:bg-aidea-green hover:text-black hover:shadow-[0_0_15px_rgba(193,255,69,0.6)]"
                    : "border-aidea-green text-aidea-green bg-transparent hover:bg-aidea-green hover:text-black hover:shadow-[0_0_15px_rgba(193,255,69,0.5)] transition-all duration-300"
                }`}
                onClick={() => handleTimeSlotSelect(timeSlot)}
              >
                {formatTimeSlot(timeSlot)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && availableTimeSlots.length === 0 && (
        <div className="text-center p-4 bg-red-500/20 rounded-md">
          <p>אין זמנים פנויים בתאריך זה</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
