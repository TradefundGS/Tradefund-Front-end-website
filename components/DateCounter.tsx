import { useEffect, useState } from 'react';

interface DateCounterProps {
  endDate: string; // Expected format: '21/05/2025'
}

const DateCounter: React.FC<DateCounterProps> = ({ endDate }) => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    // Function to update the countdown
    const updateCountdown = () => {
      if (!endDate || typeof endDate !== 'string') {
        setCountdown('Invalid date');
        return;
      }

      // Split and parse the endDate string
      const [year, month, day] = endDate.split('-').map(Number);

      // Validate parsed values
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        setCountdown('Invalid date');
        return;
      }

      // Create Date object
      const endDateObject = new Date(year, month - 1, day); // JavaScript months are 0-based

      // Get the current date
      const currentDate = new Date();

      // Calculate the time difference
      const timeDiff = endDateObject.getTime() - currentDate.getTime();
      if (timeDiff <= 0) {
        setCountdown('Expired');
        return;
      }

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      // Update the countdown state
      setCountdown(`${days} days, ${hours} hours, ${minutes} minutes`);
    };

    // Update countdown initially
    updateCountdown();

    // Update countdown every minute
    const interval = setInterval(updateCountdown, 60000); // 60,000 ms = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
      {countdown}
    </span>
  );
};

export default DateCounter;
