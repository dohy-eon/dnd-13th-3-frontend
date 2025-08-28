"use client";

import { useRouter } from "next/navigation";
import { ChallengeEmptyState } from "@/components/challenge";
import type { UserProfileResponse } from "@/types/auth";

interface ChallengeEmptyStateClientProps {
  userProfile: UserProfileResponse | null;
}

export default function ChallengeEmptyStateClient({
  userProfile,
}: ChallengeEmptyStateClientProps) {
  const router = useRouter();

  const handleStartChallenge = () => {
    router.push("/challenge/create");
  };

  return (
    <ChallengeEmptyState
      userProfile={userProfile}
      onStartChallenge={handleStartChallenge}
    />
  );
}
