import { ChallengeHeader, ChallengeOngoing } from "@/components/challenge";
import ChallengeEmptyStateClient from "@/components/challenge/ChallengeEmptyStateClient";
import { getChallenge, getChallengeHistory } from "@/lib/api/challenge";
import { getUserProfile } from "@/lib/api/user";
import type { CurrentChallenge } from "@/lib/challenge";

export default async function ChallengePage() {
  let hasChallenge = false;
  let challengeData: CurrentChallenge | null = null;
  let userProfile = null;
  let challengeHistory = null;

  try {
    const [challengeResponse, userProfileResponse, challengeHistoryResponse] =
      await Promise.all([
        getChallenge(),
        getUserProfile(),
        getChallengeHistory(),
      ]);

    console.log("🔍 Challenge 페이지: 챌린지 조회 결과:", challengeResponse);
    console.log(
      "🔍 Challenge 페이지: 사용자 프로필 조회 결과:",
      userProfileResponse
    );
    console.log(
      "🔍 Challenge 페이지: 챌린지 히스토리 조회 결과:",
      challengeHistoryResponse
    );

    hasChallenge = Boolean(
      challengeResponse?.success &&
        challengeResponse?.data?.challenges &&
        Array.isArray(challengeResponse.data.challenges) &&
        challengeResponse.data.challenges.length > 0
    );
    challengeData = hasChallenge
      ? (challengeResponse.data.challenges[0] as CurrentChallenge)
      : null;
    userProfile = userProfileResponse;
    challengeHistory = challengeHistoryResponse;
  } catch (error) {
    console.error("데이터 조회 실패:", error);
    hasChallenge = false;
    challengeData = null;
    userProfile = null;
    challengeHistory = null;
  }

  if (hasChallenge && challengeData) {
    return (
      <>
        <ChallengeHeader hasChallenge={true} challengeData={challengeData} />
        <div className='h-[calc(100dvh-40px)] bg-indigo-200 overflow-y-auto'>
          <ChallengeOngoing
            challenge={challengeData}
            userProfile={userProfile}
            challengeHistory={challengeHistory}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <ChallengeHeader hasChallenge={false} />
      <div className='h-[calc(100dvh-40px)] bg-primary overflow-y-auto'>
        <ChallengeEmptyStateClient userProfile={userProfile} />
      </div>
    </>
  );
}
