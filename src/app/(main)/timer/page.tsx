import { TabSwitcher, TimerContainer } from "@/components/timer";

export default function TimerPage() {
  return (
    <>
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>
      <div className='flex-1 overflow-hidden pt-[16px]'>
        <TimerContainer />
      </div>
    </>
  );
}
