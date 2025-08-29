import { useState } from "react";
import { sanitizeNickname } from "@/lib/onboarding";

export function useNicknameInput(initialValue = "") {
  const [nickname, setNickname] = useState(initialValue);
  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    // 입력 중일 때는 필터링하지 않고 그대로 설정
    if (isComposing) {
      setNickname(rawValue);
      return;
    }
    // 입력이 완료된 후에만 필터링 적용
    setNickname(sanitizeNickname(rawValue));
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    // 한글 입력이 완료된 후 필터링 적용
    const finalValue = event.currentTarget.value;
    setNickname(sanitizeNickname(finalValue));
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
