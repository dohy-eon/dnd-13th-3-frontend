import { BottomNavbar } from "@/components";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col relative min-h-screen'>
      <div className='flex-1 overflow-y-auto'>{children}</div>
      <BottomNavbar />
    </div>
  );
}
