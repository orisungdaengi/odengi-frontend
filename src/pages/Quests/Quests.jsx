export const initialQuests = [
    {
      id: 1,
      title: '아침 산책하기',
      description: '상쾌한 공기를 마시며 하루를 시작해요.', // 설명 추가
      steps: 10,
      isCompleted: false,
    },
    {
      id: 2,
      title: '하루 3끼 챙겨먹기',
      description: '건강을 위해 식사를 거르지 마세요.', // 설명 추가
      steps: 10,
      isCompleted: false,
    },
    {
        id: 3,
        title: '오늘의 감정 기록하기',
        description: '스스로의 마음에 귀를 기울여보세요.', // 설명 추가
        steps: 10,
        isCompleted: false,
    },
    {
        id: 4,
        title: '산책해보기',
        description: '날씨가 좋으니까 산책해보세요', // 설명 추가
        steps: 10,
        isCompleted: false,
      },
      {
        id: 5,
        title: '상담신청하기',
        description: '상담을 신청해보아요', // 설명 추가
        steps: 10,
        isCompleted: false,
      },
        
  ];
  
  // 대단계 레벨업에 필요한 총 칸 수
  export const STEPS_PER_MAJOR_LEVEL = 10;