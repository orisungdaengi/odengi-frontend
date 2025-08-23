import React, { useState } from 'react';
import styled from 'styled-components';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IoChevronForward } from 'react-icons/io5';
import BottomNavBar from '../../components/NavBar.jsx'; // 👈 제공해주신 NavBar.jsx를 import 합니다.

// --- Mock Data ---
const recordData = [
    { date: '2025-08-22', level: '2 - 6', description: '캐릭터와 교류하기' },
    { date: '2025-08-20', level: '2 - 5', description: '긍정적인 온라인 댓글 달기' },
    { date: '2025-08-19', level: '2 - 4', description: '비대면 모임 탐색하기' },
    { date: '2025-08-18', level: '2 - 3', description: '온라인 익명 게시판에 글 남기기' },
    { date: '2025-08-17', level: '2 - 2', description: '가족에게 메시지 보내기' },
    { date: '2025-08-16', level: '2 - 1', description: '관심있는 커뮤니티 찾아보기' },
    { date: '2025-08-15', level: '1 - 10', description: '새로운 장소 방문하기' },
    { date: '2025-08-14', level: '1 - 9', description: '응원의 메시지 보내기' },
    { date: '2025-08-12', level: '1 - 8', description: '새로운 음악 듣기' },
    { date: '2025-08-11', level: '1 - 7', description: '가볍게 산책하기' },
];


// --- Styled Components ---
const PageContainer = styled.div`
  background-color: #000000;
  color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow: hidden;
  /* NavBar 높이만큼 하단에 공간 확보하여 목록이 가려지지 않게 함 */
  padding-bottom: 65px; 
`;

const Header = styled.div`
  padding: 16px;
  padding-left: 24px;
  padding-top: 60px;
  font-size: 26px;
  font-weight: bold;
  text-align: left;
  flex-shrink: 0;
`;

const CalendarContainer = styled.div`
  padding: 20px 16px;
`;

// ... (DayCellWrapper, DayNumber 등 다른 스타일 컴포넌트는 이전과 동일)
const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #757575;
  padding-bottom: 12px;
  font-size: 14px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const DayCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DayNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: ${props => props.isActive ? '#fff' : 'transparent'};
  color: ${props => props.isActive ? '#000' : '#fff'};
  border-radius: 50%;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  font-size: 16px;
`;

const Underline = styled.div`
  width: 20px;
  height: 3px;
  background-color: #fff;
  margin-top: 8px;
  border-radius: 2px;
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
`;

const RecordListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 20px;
  padding-top: 24px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecordItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1c1e;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const MonthText = styled.div`
  font-size: 40px;
  font-weight: semibold;
  color: #fff;
`;

const DayInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  line-height: 1.2;
`;

const DayText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const DayOfWeekText = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #8A8A8E;
`;

const RecordInfo = styled.div`
  flex-grow: 1;
  p {
    margin: 0;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
  h4 {
    margin: 4px 0 0 0;
    font-size: 14px;
    color: #8A8A8E;
  }
`;
// --- ✂️ 이전 NavBar 관련 styled-component는 여기서 모두 삭제 ---

// --- Calendar Component ---
const Calendar = ({ activeDate, setActiveDate }) => {
    // ... (내용은 이전과 동일)
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 0 });
    const weekEndDate = endOfWeek(activeDate, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: weekStartDate, end: weekEndDate });

    return (
        <CalendarContainer>
            <WeekDays>
                {['일', '월', '화', '수', '목', '금', '토'].map(day => <div key={day}>{day}</div>)}
            </WeekDays>
            <DaysGrid>
                {weekDays.map(day => {
                    const isActive = isSameDay(day, activeDate);
                    return (
                        <DayCellWrapper key={day.toString()} onClick={() => setActiveDate(day)}>
                            <DayNumber isActive={isActive}>
                                {format(day, 'd')}
                            </DayNumber>
                            <Underline isActive={isActive} />
                        </DayCellWrapper>
                    );
                })}
            </DaysGrid>
        </CalendarContainer>
    );
};

// --- Main App Component ---
const RecordPage = () => {
    const [activeDate, setActiveDate] = useState(new Date());

    const sortedRecordData = [...recordData].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <PageContainer>
                <Header>{format(activeDate, 'yyyy년 M월', { locale: ko })}</Header>
                <Calendar activeDate={activeDate} setActiveDate={setActiveDate} />
                <RecordListContainer>
                    {sortedRecordData.map((record, index) => {
                        const recordDate = new Date(record.date);
                        return (
                            <RecordItem key={index}>
                                <DateContainer>
                                    <MonthText>{format(recordDate, 'MM')}</MonthText>
                                    <DayInfoWrapper>
                                        <DayText>{format(recordDate, 'dd')}</DayText>
                                        <DayOfWeekText>{format(recordDate, 'E', { locale: ko })}</DayOfWeekText>
                                    </DayInfoWrapper>
                                </DateContainer>
                                <RecordInfo>
                                    <p>level {record.level}</p>
                                    <h4>{record.description}</h4>
                                </RecordInfo>
                                <IoChevronForward size={22} color="#5E5E62" />
                            </RecordItem>
                        );
                    })}
                </RecordListContainer>
            </PageContainer>
            {/* 👈 PageContainer 밖, 최하단에 BottomNavBar 컴포넌트를 렌더링합니다. */}
            <BottomNavBar />
        </>
    );
};

export default RecordPage;