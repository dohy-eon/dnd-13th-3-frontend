interface GoalTabProps {
  nickname: string;
}

export default function GoalTab({ nickname }: GoalTabProps) {
  const displayNickname = nickname.endsWith("님") ? nickname : `${nickname}님`;

  return (
    <div className='w-full flex flex-col'>
      <div className='max-w-content flex flex-col'>
        <div className='text-heading-1 text-gray-900'>
          <span className='font-bold'>{displayNickname},</span>
          <span className='font-medium'> 잘하고 있어요!</span>
        </div>
        <span className='text-heading-1 font-medium text-gray-900'>
          오늘도 멋지게 해내고 있어요!
        </span>
      </div>
    </div>
  );
}
