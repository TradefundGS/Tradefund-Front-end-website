import { useEffect, useState } from "react";

interface DateCounterProps {
	endDate: string; // API can send 'YYYY-MM-DD' or 'DD/MM/YYYY' or 'DD-MM-YYYY'
}

const DateCounter: React.FC<DateCounterProps> = ({ endDate }) => {
	const [timeLeft, setTimeLeft] = useState<{
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	} | null>(null);

	// ✅ Utility to parse different date formats
	const parseDate = (dateStr: string): Date | null => {
		if (!dateStr) return null;

		// Case 1: YYYY-MM-DD
		if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(dateStr)) {
			const [year, month, day] = dateStr.split(/[-/]/).map(Number);
			return new Date(year, month - 1, day);
		}

		// Case 2: DD-MM-YYYY or DD/MM/YYYY
		if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(dateStr)) {
			const [day, month, year] = dateStr.split(/[-/]/).map(Number);
			return new Date(year, month - 1, day);
		}

		return null; // Fallback
	};

	useEffect(() => {
		const updateCountdown = () => {
			const endDateObject = parseDate(endDate);
			if (!endDateObject) {
				setTimeLeft(null);
				return;
			}

			const now = new Date();
			const diff = endDateObject.getTime() - now.getTime();
			if (diff <= 0) {
				setTimeLeft(null);
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			setTimeLeft({ days, hours, minutes, seconds });
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	}, [endDate]);

	if (!timeLeft) {
		return (
			<div className="rounded-xl bg-red-100 text-red-600 px-4 py-2 font-medium text-center shadow">
				Expired
			</div>
		);
	}

	return (
		<div className="flex gap-2 bg-gray-900 text-white rounded-2xl px-4 py-2 shadow-lg w-fit">
			{Object.entries(timeLeft).map(([label, value]) => (
				<div
					key={label}
					className="flex flex-col items-center w-12"
				>
					<span className="text-lg font-bold tabular-nums">
						{String(value).padStart(2, "0")}
					</span>
					<span className="text-[10px] uppercase tracking-wide text-gray-400">
						{label}
					</span>
				</div>
			))}
		</div>
	);
};

export default DateCounter;
