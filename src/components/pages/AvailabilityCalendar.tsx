import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

interface AvailabilityCalendarProps {
  selectedCheckIn?: string;
  selectedCheckOut?: string;
  onDateSelect: (date: string, type: 'checkin' | 'checkout') => void;
}

interface Reservation {
  id: string;
  checkin: string;
  checkout: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  selectedCheckIn,
  selectedCheckOut,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Načtení rezervací z Firebase
  useEffect(() => {
    // Načteme VŠECHNY rezervace (kromě zrušených) od dnešního dne dopředu
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
      collection(db, 'reservations')
      // Nefiltrujeme podle datumu zde, uděláme to v kódu
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservationsData: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Zahrneme pouze rezervace, které nejsou zrušené a ještě neskončily
        if (data.status !== 'cancelled' && new Date(data.checkout) >= today) {
          reservationsData.push({
            id: doc.id,
            checkin: data.checkin,
            checkout: data.checkout,
            status: data.status
          });
        }
      });
      
      console.log('Načtené rezervace:', reservationsData); // Debug
      setReservations(reservationsData);
      setLoading(false);
    }, (error) => {
      console.error('Chyba načítání rezervací:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const isDateOccupied = (date: Date) => {
    const dateStr = formatDate(date);
    
    const occupied = reservations.some(reservation => {
      const checkinDate = new Date(reservation.checkin);
      const checkoutDate = new Date(reservation.checkout);
      const currentDate = new Date(dateStr);
      
      // Datum je obsazené, pokud je mezi checkin (včetně) a checkout (vylučuje)
      // Např: checkin 15.1., checkout 17.1. → obsazené: 15.1., 16.1. (17.1. je volné)
      const isOccupied = currentDate >= checkinDate && currentDate < checkoutDate;
      
      if (isOccupied) {
        console.log(`Datum ${dateStr} je obsazené rezervací:`, {
          id: reservation.id,
          checkin: reservation.checkin,
          checkout: reservation.checkout,
          status: reservation.status
        });
      }
      
      return isOccupied;
    });
    
    return occupied;
  };

  const getDateStatus = (date: Date) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return 'past';
    if (selectedCheckIn === dateStr) return 'checkin';
    if (selectedCheckOut === dateStr) return 'checkout';
    
    // Check if date is in selected range
    if (selectedCheckIn && selectedCheckOut) {
      const checkIn = new Date(selectedCheckIn);
      const checkOut = new Date(selectedCheckOut);
      if (date > checkIn && date < checkOut) return 'inrange';
    }
    
    // Check if date is occupied by existing reservation
    if (isDateOccupied(date)) return 'occupied';
    
    return 'available';
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
      const selectedCheckinDate = new Date(selectedCheckIn);
      if (date > selectedCheckinDate) {
        // Check if there's any occupied date between checkin and this date
        const daysBetween = [];
        for (let d = new Date(selectedCheckinDate); d < date; d.setDate(d.getDate() + 1)) {
          daysBetween.push(new Date(d));
        }
        
        const hasOccupiedBetween = daysBetween.some(d => isDateOccupied(d));
        if (hasOccupiedBetween) {
          // Can't select this checkout date because there's an occupied date in between
          alert('Nelze vybrat tento datum odjezdu, protože některé dny jsou již obsazené.');
          return;
        }
        
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
        return `${base} text-gray-300 cursor-not-allowed bg-gray-50`;
      case 'occupied':
        return `${base} bg-red-200 text-red-900 cursor-not-allowed border-2 border-red-400 font-semibold`;
      case 'available':
        return `${base} hover:bg-blue-50 hover:border-blue-200 border border-transparent ${isToday(date) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`;
      case 'checkin':
        return `${base} bg-gray-900 text-white shadow-lg`;
      case 'checkout':
        return `${base} bg-gray-900 text-white shadow-lg`;
      case 'inrange':
        return `${base} bg-gray-100 text-gray-900 border-t border-b border-gray-200`;
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
          disabled={loading}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-light">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          {loading && (
            <span className="ml-2 text-sm text-gray-500">
              (načítání...)
            </span>
          )}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={loading}
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
            title={
              getDateStatus(date) === 'occupied' 
                ? 'Obsazeno - rezervováno' 
                : getDateStatus(date) === 'past'
                ? 'Minulý termín'
                : getDateStatus(date) === 'available'
                ? 'Dostupné pro rezervaci'
                : ''
            }
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded border border-gray-300"></div>
            <span className="text-gray-600">Volno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-200 rounded border-2 border-red-400"></div>
            <span className="text-gray-600">Obsazeno/Rezervováno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-900 rounded"></div>
            <span className="text-gray-600">Váš výběr</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 rounded border border-blue-200"></div>
            <span className="text-gray-600">Dnes</span>
          </div>
        </div>
        
        {loading && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
            <div className="w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            Načítání rezervací z databáze...
          </div>
        )}
        
        {!loading && (
          <div className="mt-3 text-xs text-gray-500">
            {reservations.length > 0 ? (
              <div>
                <div>Zobrazuje {reservations.length} aktivních rezervací</div>
                <div className="mt-1">
                  {reservations.map((res, i) => (
                    <div key={res.id} className="text-xs">
                      {i + 1}. {res.checkin} → {res.checkout} ({res.status})
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              'Žádné aktivní rezervace'
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;