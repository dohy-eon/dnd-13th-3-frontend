import { ChallengeEmptyState } from "@/components/challenge";
import { checkOngoingChallenge } from "@/lib/api/challenge";

export default async function ChallengePage() {
  const { hasChallenge, challengeData } = await checkOngoingChallenge();

  if (hasChallenge && challengeData) {
    return (
      <div className='h-[calc(100dvh-120px)]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-title-1 font-bold text-gray-900 mb-8'>
            진행 중인 챌린지
          </h1>
          <div className='w-full max-w-sm'>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <p className='text-body-1 text-gray-600'>
                진행 중인 챌린지가 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[calc(100dvh-120px)] bg-primary'>
      <ChallengeEmptyState />
    </div>
  );
}
