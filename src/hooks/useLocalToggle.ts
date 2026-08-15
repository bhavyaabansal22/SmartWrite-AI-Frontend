import { useCallback, useEffect, useState } from "react";

export function useLocalToggle(key: string, defaultValue = true) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored === "true" || stored === "false") setValue(stored === "true");
  }, [key]);

  const set = useCallback(
    (next: boolean) => {
      setValue(next);
      window.localStorage.setItem(key, String(next));
    },
    [key],
  );

  return [value, set] as const;
}