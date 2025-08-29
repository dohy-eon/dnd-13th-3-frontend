export interface AIFeedbackResponse {
  success: boolean;
  message: string;
  data: {
    period: "day" | "week";
    type: "youtube" | "screentime" | "timer" | "all";
    date?: string;
    startDate?: string;
    endDate?: string;
    feedback: string;
    insights: {
      title: string;
      content: string;
    }[];
    recommendations: {
      title: string;
      content: string;
    }[];
  };
}
