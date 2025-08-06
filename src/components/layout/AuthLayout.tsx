interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className='flex flex-col min-h-screen bg-primary relative items-center justify-between'>
      {children}
    </main>
  );
}
