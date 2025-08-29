"use client";

import { useCallback, useMemo, useState } from "react";
import { saveTimerRecord } from "@/lib/api/timer";
import { useTimer } from "../../hooks/useTimer";
import ConfirmEndModal from "./ConfirmEndModal";
import MissionSelectModal from "./MissionSelectModal";
import ResultModal from "./ResultModal";
import TimerDisplay from "./TimerDisplay";

interface ModalState {
  showMissionModal: boolean;
  showConfirmModal: boolean;
  showResultModal: boolean;
}

const INITIAL_MODAL_STATE: ModalState = {
  showMissionModal: false,
  showConfirmModal: false,
  showResultModal: false,
};

export default function TimerContainer() {
  const {
    isRunning,
    isPaused,
    elapsedTime,
    selectedMission,
    startTimer: timerStart,
    pauseTimer,
    endTimer: timerEnd,
    resetTimer,
    setSelectedMission,
  } = useTimer();

  const [modalState, setModalState] = useState<ModalState>(INITIAL_MODAL_STATE);

  const startTimer = useCallback(() => {
    if (!selectedMission) {
      setModalState((prev) => ({ ...prev, showMissionModal: true }));
      return;
    }

    setModalState((prev) => ({ ...prev, showMissionModal: false }));
    timerStart();
  }, [selectedMission, timerStart]);

  const endTimer = useCallback(async () => {
    const result = timerEnd();
    try {
      const totalSeconds = Math.floor(result.elapsedTime / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const now = new Date();
      const startedAt = new Date(now.getTime() - result.elapsedTime);

      await saveTimerRecord({
        category: result.mission,
        duration_hours: hours,
        duration_minutes: minutes,
        duration_seconds: seconds,
        started_at: startedAt.toISOString(),
        ended_at: now.toISOString(),
      });
    } catch (_error) {}

    setModalState((prev) => ({
      ...prev,
      showConfirmModal: false,
      showResultModal: true,
    }));
    return result;
  }, [timerEnd]);

  const confirmResult = useCallback(() => {
    resetTimer();
    setModalState(INITIAL_MODAL_STATE);
  }, [resetTimer]);

  const handleEndClick = useCallback(() => {
    pauseTimer();
    setModalState((prev) => ({
      ...prev,
      showConfirmModal: true,
    }));
  }, [pauseTimer]);

  const handleContinueClick = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      showConfirmModal: false,
    }));
    timerStart();
  }, [timerStart]);

  const handleMissionSelect = useCallback(() => {
    if (isRunning || isPaused) {
      alert("타이머 실행 중에는 모드를 변경할 수 없습니다.");
      return;
    }
    setModalState((prev) => ({ ...prev, showMissionModal: true }));
  }, [isRunning, isPaused]);

  const selectMission = useCallback(
    (mission: string) => {
      setSelectedMission(mission);
    },
    [setSelectedMission]
  );

  const closeMissionModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, showMissionModal: false }));
  }, []);

  const buttonState = useMemo(() => {
    const isActive = isRunning || isPaused;
    return {
      showStartButton: !isActive,
      showActionButtons: isActive,
      isPaused,
    };
  }, [isRunning, isPaused]);

  return (
    <div className='max-w-mobile mx-auto w-full flex flex-col'>
      <TimerDisplay
        elapsedTime={elapsedTime}
        selectedMission={selectedMission}
        onSelectMission={handleMissionSelect}
        isModalOpen={modalState.showMissionModal}
      />

      <div className='flex gap-3 mt-8 mb-4'>
        {buttonState.showStartButton ? (
          <button
            type='button'
            onClick={startTimer}
            disabled={!selectedMission}
            className={`flex-1 btn-main ${
              selectedMission
                ? "btn-primary"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            시작
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={buttonState.isPaused ? startTimer : pauseTimer}
              className={`flex-1 btn-main ${
                buttonState.isPaused
                  ? "bg-gray-200 text-gray-500"
                  : "btn-secondary"
              }`}
            >
              {buttonState.isPaused ? "이어서 시작" : "일시정지"}
            </button>
            <button
              type='button'
              onClick={handleEndClick}
              className='flex-1 btn-main btn-primary'
            >
              끝내기
            </button>
          </>
        )}
      </div>

      {modalState.showMissionModal && (
        <MissionSelectModal
          selectedMission={selectedMission}
          onSelect={selectMission}
          onClose={closeMissionModal}
        />
      )}

      {modalState.showConfirmModal && (
        <ConfirmEndModal onConfirm={endTimer} onCancel={handleContinueClick} />
      )}

      {modalState.showResultModal && (
        <ResultModal
          mission={selectedMission}
          elapsedTime={elapsedTime}
          onConfirm={confirmResult}
        />
      )}
    </div>
  );
}
