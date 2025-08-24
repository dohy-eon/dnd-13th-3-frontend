export interface UserProfile {
  id: string;
  email: string;
  name: string;
  nickname: string;
  goal: {
    type: string;
  };
  screenTimeGoal: {
    type: string;
  };
}

export interface GoalType {
  type: string;
  custom?: string;
}

export interface ScreenTimeGoalType {
  type: string;
  custom?: string;
}
