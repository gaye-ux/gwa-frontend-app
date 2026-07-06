import { useState, useEffect, useCallback } from 'react';

/**
 * Counts down to a target ISO date string, returning days/hours/minutes remaining.
 * Updates every 60 seconds.
 */
export function useCountdown(targetDate: string) {
    const calculate = useCallback(() => {
        const diff = new Date(targetDate).getTime() - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
        };
    }, [targetDate]);

    const [time, setTime] = useState(calculate);

    useEffect(() => {
        const id = setInterval(() => setTime(calculate()), 60_000);
        return () => clearInterval(id);
    }, [calculate]);

    return time;
}
