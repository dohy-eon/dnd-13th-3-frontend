import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center px-6'>
          <p className='text-gray-700 text-sm'>구글 로그인 처리 중...</p>
        </div>
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
