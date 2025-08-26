import { MainHeader } from "@/components/main";
import { TabSwitcher, TimerContainer } from "@/components/timer";

export default function TimerPage() {
  return (
    <>
      <MainHeader />
      <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
        <div className='flex pt-[20px]'>
          <TabSwitcher />
        </div>
        <div className='pt-[16px] mb-[100px]'>
          <TimerContainer />
        </div>
      </div>
    </>
  );
}
