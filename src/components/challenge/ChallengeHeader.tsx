"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CurrentChallenge } from "@/lib/challenge";
import ChallengeFullModal from "./ChallengeFullModal";
import InviteFriendModal from "./InviteFriendModal";

interface ChallengeHeaderProps {
  hasChallenge: boolean;
  challengeData?: CurrentChallenge;
}

export default function ChallengeHeader({
  hasChallenge,
  challengeData,
}: ChallengeHeaderProps) {
  const router = useRouter();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  const handleSettingClick = () => {
    router.push("/setting");
  };

  const handleAddClick = () => {
    if ((challengeData?.participants?.length ?? 0) >= 6) {
      setShowFullModal(true);
    } else {
      setShowInviteModal(true);
    }
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
  };

  const handleCloseFullModal = () => {
    setShowFullModal(false);
  };

  if (hasChallenge) {
    return (
      <>
        <div className='flex justify-between items-center pt-4 px-screen-margin bg-indigo-200'>
          <Image
            src='/images/logos/MinuLogo2.svg'
            alt='MINU Logo'
            width={84}
            height={24}
            priority
          />
          <div className='flex items-center gap-2'>
            <button type='button' onClick={handleAddClick}>
              <Image
                src='/images/logos/Add.svg'
                alt='Add'
                width={24}
                height={24}
              />
            </button>
            <button type='button' onClick={handleSettingClick}>
              <Image
                src='/images/logos/Setting2.svg'
                alt='Settings'
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {showInviteModal && (
          <InviteFriendModal
            onClose={handleCloseInviteModal}
            inviteUrl={challengeData?.invite_url || ""}
          />
        )}

        {showFullModal && <ChallengeFullModal onClose={handleCloseFullModal} />}
      </>
    );
  }

  return (
    <div className='flex justify-between items-center pt-4 px-screen-margin bg-primary'>
      <Image
        src='/images/logos/MinuLogoWhite.svg'
        alt='MINU Logo'
        width={84}
        height={24}
        priority
      />
      <div className='flex items-center gap-2'>
        <button type='button' onClick={handleSettingClick}>
          <Image
            src='/images/logos/Setting.svg'
            alt='Settings'
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
