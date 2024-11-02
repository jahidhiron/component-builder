import { useState, useCallback } from "react";

export const useHistory = () => {
  const [history, setHistory] = useState([[]]);
  const [position, setPosition] = useState(0);

  const addToHistory = useCallback(
    (newState) => {
      const currentState = history[position];
      if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
        const updatedHistory = [...history.slice(0, position + 1), newState];
        setHistory(updatedHistory);
        setPosition(updatedHistory.length - 1);
      }
    },
    [history, position]
  );

  const undo = useCallback(() => {
    if (position > 0) {
      setPosition((prevPosition) => prevPosition - 1);
    }
  }, [position]);

  const redo = useCallback(() => {
    if (position < history.length - 1) {
      setPosition((prevPosition) => prevPosition + 1);
    }
  }, [position, history]);

  const canUndo = position > 0;
  const canRedo = position < history.length - 1;

  return {
    history: history[position] || [],
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
