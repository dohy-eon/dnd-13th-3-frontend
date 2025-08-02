import Logo from "@/components/Logo";
import TabContent from "@/components/TabContent";
import TabSwitcher from "@/components/TabSwitcher";

export default function HomePage() {
  return (
    <main className='flex flex-col h-screen overflow-hidden px-screen-margin'>
      {/* 로고 영역 */}
      <div className='pt-[60px]'>
        <Logo />
      </div>

      {/* 탭 스위처 영역 */}
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>

      {/* 탭 컨텐츠 영역 */}
      <div className='flex-1 overflow-hidden pt-[16px]'>
        <TabContent />
      </div>
    </main>
  );
}
