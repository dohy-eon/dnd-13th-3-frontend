import { useState } from "react";
import { sanitizeNickname } from "@/lib/onboarding";

export function useNicknameInput(initialValue = "") {
  const [nickname, setNickname] = useState(initialValue);
  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    if (isComposing) {
      setNickname(rawValue);
      return;
    }
    setNickname(sanitizeNickname(rawValue));
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    setNickname(sanitizeNickname(event.currentTarget.value.normalize("NFC")));
  };

  return {
    nickname,
    setNickname,
    isComposing,
    setIsComposing,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
  } as const;
}
