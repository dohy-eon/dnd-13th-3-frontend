import { ChallengeDetailClient } from "@/components/challenge";
import { getChallengeHistory } from "@/lib/api/challenge";
import { getUserProfile } from "@/lib/api/user";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const { id } = await params;
  let challengeHistory = null;
  let userProfile = null;
  let targetChallenge = null;

  try {
    const [challengeResponse, userResponse] = await Promise.all([
      getChallengeHistory(),
      getUserProfile(),
    ]);

    console.log(
      "🔍 Challenge Detail 페이지: 챌린지 히스토리 조회 결과:",
      challengeResponse
    );
    console.log(
      "🔍 Challenge Detail 페이지: 사용자 프로필 조회 결과:",
      userResponse
    );

    challengeHistory = challengeResponse;
    userProfile = userResponse;

    // URL의 ID와 일치하는 챌린지 찾기
    targetChallenge = challengeResponse.data.challenges.find(
      (challenge) => challenge.challengeId.toString() === id
    );
  } catch (error) {
    console.error("데이터 조회 실패:", error);
    challengeHistory = null;
    userProfile = null;
    targetChallenge = null;
  }

  if (!targetChallenge) {
    return (
      <div className='h-[100dvh] bg-primary'>
        <div className='h-full flex flex-col items-center justify-center'>
          <p className='text-gray-500'>챌린지를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[100dvh] bg-primary'>
      <ChallengeDetailClient
        challenge={targetChallenge}
        challengeHistory={challengeHistory}
        userProfile={userProfile}
      />
    </div>
  );
}
