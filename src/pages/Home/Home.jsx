import React from 'react';
// ✨ 1. useNavigate 훅을 react-router-dom에서 가져옵니다.
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '../../Animations.js';

// 컴포넌트 import
import BottomNavBar from '../../components/NavBar.jsx';
import XPBar from '../../components/XPBar.jsx';
import QuestCard from '../../components/QuestCard.jsx';
import NotificationIcon from '../../components/NotificationIcon.jsx';

// 데이터 및 이미지 import
import { STEPS_PER_MAJOR_LEVEL } from '../Quests/Quests.jsx';
import { levelAssets } from './changingPic.jsx';
import groundImage from './backgroundImg/배경1.png';
import { notificationData } from '../../components/notificationData.jsx';

const Home = ({
    majorLevel, setMajorLevel,
    currentSteps, setCurrentSteps,
    quests, setQuests
}) => {
  // ✨ 2. useNavigate 훅을 호출하여 navigate 함수를 생성합니다.
  const navigate = useNavigate();

  const currentQuest = quests.find(q => !q.isCompleted);
  const currentAssets = levelAssets[majorLevel - 1] || levelAssets[levelAssets.length - 1];
  const hasUnread = notificationData.today.some(item => !item.isRead) ||
                    notificationData.last7Days.some(item => !item.isRead);

  const handleCompleteQuest = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.isCompleted) return;

    const stepsGained = quest.steps;
    let newTotalSteps = currentSteps + stepsGained;

    if (newTotalSteps >= STEPS_PER_MAJOR_LEVEL) {
      const levelUps = Math.floor(newTotalSteps / STEPS_PER_MAJOR_LEVEL);
      setMajorLevel(majorLevel + levelUps);
      setCurrentSteps(newTotalSteps % STEPS_PER_MAJOR_LEVEL);
    } else {
      setCurrentSteps(newTotalSteps);
    }
    setQuests(quests.map(q => q.id === questId ? { ...q, isCompleted: true } : q));
  };

  const handleNotificationClick = () => navigate('/notifications');
  
  // ✨ 3. QuestCard를 클릭했을 때 '/quests' 경로로 이동시키는 함수를 만듭니다.
  const handleQuestCardClick = () => {
    navigate('/quests');
  };

  return (
    <Box
      component={motion.div}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${currentAssets.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingBottom: '56px',
        transition: 'background-image 0.5s ease-in-out',
        boxSizing: 'border-box',
      }}
    >
      {/* 상단 UI */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pt: { xs: 4, sm: 7 }, zIndex: 1, alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', ml: 1.5 }}>기니피그</Typography>
        <IconButton onClick={handleNotificationClick} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', p: 1 }}>
          <NotificationIcon hasUnread={hasUnread} />
        </IconButton>
      </Box>

      {/* 중앙 컨텐츠 */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: 4 }}>
        {/* QuestCard의 onComplete prop에 handleQuestCardClick 함수를 연결합니다. */}
        <QuestCard currentQuest={currentQuest} onComplete={handleQuestCardClick} majorLevel={majorLevel}  />
        <Box sx={{ backgroundColor: '#A9D1E4', color: 'black', borderRadius: '20px', py: 1, px: 2 }}>
          <Typography variant="body1">오늘 산책 어때?</Typography>
        </Box>

        <Box
          component="img"
          src={currentAssets.character}
          alt="캐릭터"
          sx={{
            width: '70%',
            maxWidth: '290px',
            height: 'auto',
            objectFit: 'contain',
            transition: 'opacity 0.5s ease-in-out',
            mb: '100px',
          }}
        />

        <Box sx={{ position: 'absolute', bottom: { xs: '80px', sm: '100px' }, width: '90%', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}>
          <XPBar majorLevel={majorLevel} currentSteps={currentSteps} />
        </Box>
      </Box>

      <Box
        component="img"
        src={groundImage}
        alt="하단 배경"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20vh',
          maxHeight: '150px',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <BottomNavBar />
    </Box>
  );
};

export default Home;