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

export default async function HomePage() {
  let userProfile = null;
  let screenTimeData = null;

  // 1) 사용자 프로필 조회와 스크린타임 생성/갱신을 병렬 수행
  const [profileSettled, generateSettled] = await Promise.allSettled([
    getUserProfile(),
    createOrUpdateScreenTime(),
  ]);

  if (profileSettled.status === "fulfilled") {
    userProfile = profileSettled.value;
    console.log("🔍 Main 페이지: 사용자 프로필 조회 결과(서버):", userProfile);
  } else {
    console.error("메인: 사용자 프로필 조회 실패:", profileSettled.reason);
  }

  if (generateSettled.status === "fulfilled") {
    console.log("🆗 스크린타임 생성/갱신 결과:", generateSettled.value);
  } else {
    console.error("메인: 스크린타임 생성/갱신 실패:", generateSettled.reason);
  }

  // 2) 생성/갱신 이후, 일간 스크린타임 조회
  try {
    screenTimeData = await getScreenTimeDay();
    console.log("🔍 Main 페이지: 스크린타임 조회 결과(서버):", screenTimeData);
  } catch (e) {
    console.error("메인: 스크린타임 조회 실패:", e);
  }

  return (
    <>
      <MainHeader />
      <MainContent userProfile={userProfile} screenTimeData={screenTimeData} />
    </>
  );
}
