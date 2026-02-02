import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce any fast-changing value.
 * The value will only update after the delay has passed without a new change.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timer to update the value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: If the user types again before the delay is over,
    // clear the old timer and start a new one.
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
