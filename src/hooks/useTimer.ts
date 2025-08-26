"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useAnimationFrame from "use-animation-frame";

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  elapsedTime: number;
  selectedMission: string;
}

const INITIAL_TIMER_STATE: TimerState = {
  isRunning: false,
  isPaused: false,
  elapsedTime: 0,
  selectedMission: "",
};

export function useTimer() {
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);
  const startTimeRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);

  useEffect(() => {
    // 컴포넌트 마운트 시 초기화
    startTimeRef.current = 0;
    lastUpdateTimeRef.current = 0;
  }, []);

  // 브라우저 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.isRunning || state.isPaused) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.isRunning, state.isPaused]);

  useAnimationFrame((_deltaTime) => {
    if (!state.isRunning) return;

    const now = performance.now();
    if (now - lastUpdateTimeRef.current >= 100) {
      const elapsed = Date.now() - startTimeRef.current;
      setState((prev) => ({ ...prev, elapsedTime: elapsed }));
      lastUpdateTimeRef.current = now;
    }
  });

  const startTimer = useCallback(() => {
    const now = Date.now();
    startTimeRef.current = state.isPaused ? now - state.elapsedTime : now;
    lastUpdateTimeRef.current = performance.now();

    setState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }));
  }, [state.isPaused, state.elapsedTime]);

  const pauseTimer = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false, isPaused: true }));
  }, []);

  const endTimer = useCallback(() => {
    console.log("타이머 종료:", {
      mission: state.selectedMission,
      elapsedTime: state.elapsedTime,
      totalSeconds: Math.floor(state.elapsedTime / 1000),
    });

    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: false,
    }));

    return {
      mission: state.selectedMission,
      elapsedTime: state.elapsedTime,
      totalSeconds: Math.floor(state.elapsedTime / 1000),
    };
  }, [state.selectedMission, state.elapsedTime]);

  const resetTimer = useCallback(() => {
    setState(INITIAL_TIMER_STATE);
    startTimeRef.current = 0;
    lastUpdateTimeRef.current = 0;
  }, []);

  const setSelectedMission = useCallback((mission: string) => {
    setState((prev) => ({ ...prev, selectedMission: mission }));
  }, []);

  return {
    // 상태
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    elapsedTime: state.elapsedTime,
    selectedMission: state.selectedMission,

    // 액션
    startTimer,
    pauseTimer,
    endTimer,
    resetTimer,
    setSelectedMission,
  };
}
