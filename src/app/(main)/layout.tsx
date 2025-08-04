import { BottomNavbar, Logo } from "@/components";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col h-screen px-screen-margin'>
      <div className='pt-4'>
        <Logo />
      </div>
      <div className='flex-1 overflow-y-auto'>{children}</div>
      <BottomNavbar />
    </div>
  );
}
