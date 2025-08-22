import { TabSwitcher, TimerContainer } from "@/components/timer";

export default function TimerPage() {
  return (
    <div className='w-full h-[calc(100dvh-120px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>
      <div className='flex-1 overflow-hidden pt-[16px]'>
        <TimerContainer />
      </div>
    </div>
  );
}
