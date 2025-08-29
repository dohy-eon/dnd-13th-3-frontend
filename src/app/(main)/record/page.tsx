import RecordClient from "@/components/record/RecordClient";
import { getScreenTimeDay, getScreenTimeWeek } from "@/lib/api/screentime";
import { getUserProfile } from "@/lib/api/user";
import { parseScreenTimeValue } from "@/lib/goals";

export default async function RecordPage() {
  const [todayRes, weekRes, profile] = await Promise.all([
    getScreenTimeDay(),
    getScreenTimeWeek(),
    getUserProfile(),
  ]);
  const parsed = parseScreenTimeValue(profile?.screenTimeGoal);
  const goalMinutes = parsed.hours * 60 + parsed.minutes;
  return (
    <RecordClient
      todayData={todayRes}
      weekData={weekRes}
      goalMinutes={goalMinutes}
    />
  );
}
