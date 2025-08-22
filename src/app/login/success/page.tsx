import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function LoginSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center px-6'>
          <p className='text-gray-700 text-sm'>로그인 성공! 이동 중...</p>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
