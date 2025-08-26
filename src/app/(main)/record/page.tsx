export default function RecordPage() {
  return (
    <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
      <h1 className='text-title-1 font-bold text-gray-900 mb-8'>기록</h1>
      <div className='w-full max-w-sm'>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <p className='text-body-1 text-gray-600'>기록 컨텐츠가 들어갈 자리</p>
        </div>
      </div>
    </div>
  );
}
