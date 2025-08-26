import { Suspense } from "react";
import JoinChallengeClient from "@/components/join/JoinChallengeClient";

export default function JoinChallengePage() {
  return (
    <Suspense fallback={null}>
      <JoinChallengeClient />
    </Suspense>
  );
}