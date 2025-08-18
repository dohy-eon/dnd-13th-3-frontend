import { memo } from "react";

interface NicknameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

function NicknameField({
  value,
  onChange,
  onCompositionStart,
  onCompositionEnd,
}: NicknameFieldProps) {
  return (
    <div className='space-y-2 mx-auto'>
      <div className='w-full px-4 py-3.5 rounded-xl border border-gray-200'>
        <input
          type='text'
          value={value}
          onChange={onChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          placeholder='ex.미누미누'
          className='w-full text-base font-normal text-gray-900 placeholder-gray-400 outline-none'
          maxLength={10}
        />
      </div>
      <p className='text-xs font-normal text-gray-400 leading-none'>
        특수문자를 제외한 한글,영어만 입력해주세요.({value.length}/10)
      </p>
    </div>
  );
}

export default memo(NicknameField);
