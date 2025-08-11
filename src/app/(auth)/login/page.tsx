import clsx from "clsx";
import { MinuCharacter } from "@/components";
import {
  CloudLayer,
  GoogleLoginButton,
  LoginContent,
} from "@/components/login";

export default function LoginPage() {
  return (
    <main
      className={clsx(
        "flex flex-col min-h-screen bg-primary relative items-center justify-between"
      )}
    >
      <CloudLayer />

      <LoginContent className='mt-[76px]' />

      <div className='absolute top-[385px] left-1/2 z-20 transform translate-x-[35px]'>
        <MinuCharacter />
      </div>

      <GoogleLoginButton />
    </main>
  );
}
