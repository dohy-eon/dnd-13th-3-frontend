import { MainHeader } from "@/components/main";
import MainContent from "@/components/main/MainContent";
import { getScreenTimeDay } from "@/lib/api/screentime";
import { getUserProfile } from "@/lib/api/user";

export default async function HomePage() {
  let userProfile = null;
  let screenTimeData = null;

  try {
    const [userProfileResult, screenTimeResult] = await Promise.all([
      getUserProfile(),
      getScreenTimeDay(),
    ]);

    userProfile = userProfileResult;
    screenTimeData = screenTimeResult;

    console.log("🔍 Main 페이지: 사용자 프로필 조회 결과:", userProfile);
    console.log("🔍 Main 페이지: 스크린타임 조회 결과:", screenTimeData);
  } catch (error) {
    console.error("데이터 조회 실패:", error);
  }

  return (
    <>
      <MainHeader />
      <MainContent userProfile={userProfile} screenTimeData={screenTimeData} />
    </>
  );
}
