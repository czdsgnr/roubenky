import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface AvailabilityCalendarProps {
  selectedCheckIn?: string;
  selectedCheckOut?: string;
  onDateSelect: (date: string, type: 'checkin' | 'checkout') => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  selectedCheckIn,
  selectedCheckOut,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock availability data - in real app this would come from API
  const availability = {
    '2025-01-15': 'available',
    '2025-01-16': 'available', 
    '2025-01-17': 'available',
    '2025-01-18': 'occupied',
    '2025-01-19': 'occupied',
    '2025-01-20': 'occupied',
    '2025-01-21': 'available',
    '2025-01-22': 'available',
    '2025-01-23': 'available',
    '2025-01-24': 'occupied',
    '2025-01-25': 'occupied',
    '2025-01-26': 'occupied',
    '2025-01-27': 'occupied',
    '2025-01-28': 'available',
    '2025-01-29': 'available',
    '2025-01-30': 'available',
    '2025-01-31': 'available',
    '2025-02-01': 'available',
    '2025-02-02': 'available',
    '2025-02-03': 'occupied',
    '2025-02-04': 'occupied',
    '2025-02-05': 'occupied',
    '2025-02-06': 'available',
    '2025-02-07': 'available',
    '2025-02-08': 'available',
    '2025-02-09': 'available',
    '2025-02-10': 'occupied',
    '2025-02-11': 'occupied',
    '2025-02-12': 'occupied',
    '2025-02-13': 'occupied',
    '2025-02-14': 'available',
    '2025-02-15': 'available',
  };

  const monthNames = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];

  const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Start from Monday
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - dayOfWeek);

    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - ((lastDay.getDay() + 6) % 7)));

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDateStatus = (date: Date) => {
    const dateStr = formatDate(date);
    const today = new Date();
    
    if (date < today) return 'past';
    if (selectedCheckIn === dateStr) return 'checkin';
    if (selectedCheckOut === dateStr) return 'checkout';
    
    // Check if date is in selected range
    if (selectedCheckIn && selectedCheckOut) {
      const checkIn = new Date(selectedCheckIn);
      const checkOut = new Date(selectedCheckOut);
      if (date > checkIn && date < checkOut) return 'inrange';
    }
    
    return availability[dateStr] || 'available';
  };

  const handleDateClick = (date: Date) => {
    const dateStr = formatDate(date);
    const status = getDateStatus(date);
    
    if (status === 'past' || status === 'occupied') return;
    
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Start new selection
      onDateSelect(dateStr, 'checkin');
    } else if (selectedCheckIn && !selectedCheckOut) {
      // Set checkout date
      if (date > new Date(selectedCheckIn)) {
        onDateSelect(dateStr, 'checkout');
      } else {
        // If clicked date is before checkin, set as new checkin
        onDateSelect(dateStr, 'checkin');
      }
    }
  };

  const getDateClass = (date: Date) => {
    const status = getDateStatus(date);
    const base = "w-10 h-10 flex items-center justify-center text-sm transition-all duration-200 cursor-pointer rounded-lg";
    
    if (!isCurrentMonth(date)) {
      return `${base} text-gray-300 cursor-not-allowed`;
    }
    
    switch (status) {
      case 'past':
        return `${base} text-gray-300 cursor-not-allowed`;
      case 'occupied':
        return `${base} bg-red-100 text-red-800 cursor-not-allowed`;
      case 'available':
        return `${base} hover:bg-gray-100 ${isToday(date) ? 'ring-2 ring-blue-500' : ''}`;
      case 'checkin':
        return `${base} bg-gray-900 text-white`;
      case 'checkout':
        return `${base} bg-gray-900 text-white`;
      case 'inrange':
        return `${base} bg-gray-100 text-gray-900`;
      default:
        return `${base} hover:bg-gray-100`;
    }
  };

  const days = getDaysInMonth();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-light">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div
            key={index}
            className={getDateClass(date)}
            onClick={() => handleDateClick(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded border border-green-300"></div>
            <span className="text-gray-600">Volno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 rounded border border-red-300"></div>
            <span className="text-gray-600">Obsazeno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-900 rounded"></div>
            <span className="text-gray-600">Váš výběr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;