import { Suspense } from "react";
import { ChallengeSuccess } from "@/components/challenge";

export default async function ChallengeSuccessPage() {
  return (
    <div className='h-[100dvh] px-screen-margin bg-white'>
      <Suspense fallback={null}>
        <ChallengeSuccess />
      </Suspense>
    </div>
  );
}
