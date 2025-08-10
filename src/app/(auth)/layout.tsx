export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen bg-white relative items-stretch justify-start'>
      <div className='flex-1 overflow-hidden'>{children}</div>
    </div>
  );
}
