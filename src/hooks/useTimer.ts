"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    localStorage.removeItem("timerState");
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

  // localStorage에 상태 저장
  useEffect(() => {
    if (isMounted && (state.isRunning || state.isPaused)) {
      localStorage.setItem(
        "timerState",
        JSON.stringify({
          ...state,
          startTime: startTimeRef.current,
        })
      );
    }
  }, [state, isMounted]);

  const startTimer = useCallback(() => {
    const now = Date.now();
    startTimeRef.current = state.isPaused ? now - state.elapsedTime : now;

    setState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }));

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setState((prev) => ({ ...prev, elapsedTime: elapsed }));
    }, 100);
  }, [state.isPaused, state.elapsedTime]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState((prev) => ({ ...prev, isRunning: false, isPaused: true }));
  }, []);

  const endTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(INITIAL_TIMER_STATE);
    localStorage.removeItem("timerState");
    startTimeRef.current = 0;
  }, []);

  const setSelectedMission = useCallback((mission: string) => {
    setState((prev) => ({ ...prev, selectedMission: mission }));
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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