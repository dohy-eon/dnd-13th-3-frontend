import {
  ChallengeEmptyState,
  ChallengeHeader,
  ChallengeOngoing,
} from "@/components/challenge";
import { getChallenge } from "@/lib/api/challenge";
import { getUserProfile } from "@/lib/api/user";

export default async function ChallengePage() {
  let hasChallenge = false;
  let challengeData = null;
  let userProfile = null;

  try {
    const [challengeResponse, userProfileResponse] = await Promise.all([
      getChallenge(),
      getUserProfile(),
    ]);

    console.log("🔍 Challenge 페이지: 챌린지 조회 결과:", challengeResponse);
    console.log(
      "🔍 Challenge 페이지: 사용자 프로필 조회 결과:",
      userProfileResponse
    );

    hasChallenge = Boolean(
      challengeResponse?.success &&
        challengeResponse?.data?.challenges &&
        Array.isArray(challengeResponse.data.challenges) &&
        challengeResponse.data.challenges.length > 0
    );
    challengeData = hasChallenge ? challengeResponse.data.challenges[0] : null;
    userProfile = userProfileResponse;
  } catch (error) {
    console.error("데이터 조회 실패:", error);
    hasChallenge = false;
    challengeData = null;
    userProfile = null;
  }

  if (hasChallenge && challengeData) {
    return (
      <>
        <ChallengeHeader hasChallenge={true} />
        <div className='h-[calc(100dvh-40px)] bg-secondary overflow-y-auto'>
          <ChallengeOngoing
            challenge={challengeData}
            userProfile={userProfile}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <ChallengeHeader hasChallenge={false} />
      <div className='h-[calc(100dvh-40px)] bg-primary overflow-y-auto'>
        <ChallengeEmptyState userProfile={userProfile} />
      </div>
    </>
  );
}
