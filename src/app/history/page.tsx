import { ChallengeHistoryClient } from "@/components/challenge";
import { getChallengeHistory } from "@/lib/api/challenge";
import { getUserProfile } from "@/lib/api/user";

export default async function ChallengeHistoryPage() {
  let challengeHistory = null;
  let userProfile = null;

  try {
    const [challengeHistoryResponse, userProfileResponse] = await Promise.all([
      getChallengeHistory(),
      getUserProfile(),
    ]);

    console.log(
      "🔍 Challenge History 페이지: 챌린지 히스토리 조회 결과:",
      challengeHistoryResponse
    );
    challengeHistory = challengeHistoryResponse;
    userProfile = userProfileResponse;
  } catch (error) {
    console.error("데이터 조회 실패:", error);
    challengeHistory = null;
    userProfile = null;
  }

  return (
    <div className='h-[100dvh] bg-gray-50'>
      <ChallengeHistoryClient
        challengeHistory={challengeHistory}
        userProfile={userProfile}
      />
    </div>
  );
}
