import { MainHeader } from "@/components/main";
import MainContent from "@/components/main/MainContent";
import {
  createOrUpdateScreenTime,
  getScreenTimeDay,
} from "@/lib/api/screentime";
import { getUserProfile } from "@/lib/api/user";

// Ensure this page is rendered per request so cookies-based API calls work
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Default screen time data structure
const defaultScreenTimeData = {
  success: true,
  message: "Using default screen time data",
  data: {
    screenTimes: [
      {
        date: new Date().toISOString().split("T")[0],
        totalMinutes: 0,
        appTimes: {
          instagram: 0,
          youtube: 0,
          kakaotalk: 0,
          chrome: 0,
        },
      },
    ],
  },
};

export default async function HomePage() {
  let userProfile = null;
  let screenTimeData = defaultScreenTimeData;

  try {
    // 1) 사용자 프로필 조회와 스크린타임 생성/갱신을 병렬 수행
    const [profileResponse, screenTimeResponse] = await Promise.allSettled([
      getUserProfile(),
      createOrUpdateScreenTime(),
    ]);

    // Handle user profile response
    if (profileResponse.status === "fulfilled") {
      userProfile = profileResponse.value;
      console.log(
        "🔍 Main 페이지: 사용자 프로필 조회 결과(서버):",
        userProfile
      );
    } else {
      console.error("메인: 사용자 프로필 조회 실패:", profileResponse.reason);
    }

    // Handle screen time response
    if (screenTimeResponse.status === "fulfilled") {
      console.log("🆗 스크린타임 생성/갱신 결과:", screenTimeResponse.value);

      // 2) 생성/갱신 이후, 일간 스크린타임 조회
      try {
        const dayData = await getScreenTimeDay();
        if (dayData.success && dayData.data?.screenTimes?.[0]) {
          screenTimeData = dayData;
        }
        console.log(
          "🔍 Main 페이지: 스크린타임 조회 결과(서버):",
          screenTimeData
        );
      } catch (e) {
        console.error("메인: 스크린타임 조회 실패:", e);
      }
    } else {
      console.error(
        "메인: 스크린타임 생성/갱신 실패:",
        screenTimeResponse.reason
      );
    }
  } catch (error) {
    console.error("메인 페이지 초기화 중 오류 발생:", error);
  }

  return (
    <>
      <MainHeader />
      <MainContent userProfile={userProfile} screenTimeData={screenTimeData} />
    </>
  );
}
