import type { AIFeedbackResponse } from "@/types/aiFeedback";
import { privateApi } from "./instances";

type FeedbackType = "youtube" | "screentime" | "timer" | "all";
type PeriodType = "day" | "week";

interface AIFeedbackParams {
  period: PeriodType;
  date?: string;
  startDate?: string;
  type?: FeedbackType;
}

export const getAIFeedback = async ({
  period,
  date,
  startDate,
  type = "screentime",
}: AIFeedbackParams): Promise<AIFeedbackResponse> => {
  try {
    // Validate required parameters
    if (!period) {
      throw new Error("Period is required");
    }

    // Build query parameters
    const params = new URLSearchParams({
      period,
      type,
      ...(date && { date }),
      ...(startDate && { startDate }),
    });

    const url = `/api/analyze/ai-feedback?${params.toString()}`;
    console.log("[getAIFeedback] Request:", {
      period,
      type,
      date,
      startDate,
      url,
    });

    const response = await privateApi.get(url);
    console.log("[getAIFeedback] Raw response:", response);

    if (!response) {
      throw new Error("No response received from server");
    }

    // Handle different response structures
    const responseData = response.data || {};

    // Case 1: Direct AIFeedbackResponse format
    if (typeof responseData === "object" && "success" in responseData) {
      return responseData as AIFeedbackResponse;
    }

    // Case 2: Data is nested under a 'data' property
    if (responseData.data && typeof responseData.data === "object") {
      return {
        success: true,
        message: responseData.message || "Success",
        data: responseData.data,
      } as AIFeedbackResponse;
    }

    // Case 3: Raw data (treat as success with data)
    if (responseData) {
      return {
        success: true,
        message: "Success",
        data: {
          period,
          type: type as any,
          ...(date && { date }),
          ...(startDate && { startDate }),
          feedback: responseData.feedback || "",
          insights: Array.isArray(responseData.insights)
            ? responseData.insights
            : [],
          recommendations: Array.isArray(responseData.recommendations)
            ? responseData.recommendations
            : [],
        },
      };
    }

    // If we get here, the response format is unexpected
    throw new Error("Unexpected response format from server");
  } catch (error) {
    console.error("Error in getAIFeedback:", {
      error,
      period,
      date,
      startDate,
      type,
    });

    // Return a structured error response
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      data: {
        period,
        type: type as any,
        ...(date && { date }),
        ...(startDate && { startDate }),
        feedback: "",
        insights: [],
        recommendations: [],
      },
    };
  }
};
