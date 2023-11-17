import { useEffect, useRef, useState } from "react";

export function useTypingEffect(textToType, interKeyStrokeDurationInMs) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const currentPositionRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;

      // Clear interval when reaching the end of the text
      if (currentPositionRef.current >= textToType.length) {
        clearInterval(intervalId);
        setIsCursorVisible(false); // Hide cursor when typing is complete
      }
    }, interKeyStrokeDurationInMs);

    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [interKeyStrokeDurationInMs, textToType]);

  return [textToType.substring(0, currentPosition) + (isCursorVisible ? "|" : ""), isCursorVisible];
}
