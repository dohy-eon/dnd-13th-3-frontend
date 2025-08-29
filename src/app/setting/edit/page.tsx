export const dynamic = 'force-dynamic';

import { ProfileEditClient } from "@/components/setting/ProfileEditClient";
import { getUserProfile } from "@/lib/api/user";

export default async function ProfileEditPage() {
  let user = null;
  try {
    user = await getUserProfile();
  } catch (error) {
    console.error("사용자 프로필 조회 실패:", error);
  }

  return <ProfileEditClient user={user} />;
}
