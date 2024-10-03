import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that listens for changes to a media query and returns whether the query matches.
 * @param {string} query - The media query string (e.g., "(min-width: 768px)").
 * @returns {boolean} - A boolean value indicating whether the media query matches the current screen.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if the window object is available (to avoid SSR issues).
    return typeof window !== 'undefined' && window.matchMedia(query).matches;
  });

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  // Set up the media query listener and clean up on component unmount.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Avoid running in non-browser environments (e.g., SSR).
    const matchQueryList = window.matchMedia(query);

    // Add the event listener to listen for media query changes.
    matchQueryList.addEventListener('change', handleChange);

    // Clean up the event listener when the component unmounts or the query changes.
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  return matches;
}

export { useMediaQuery };
