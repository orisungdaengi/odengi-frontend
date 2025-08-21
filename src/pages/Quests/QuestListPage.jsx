import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../Animations.js';

import QuestCard from '../../components/QuestCard.jsx';
import { initialQuests } from '../Quests/Quests.jsx';

import greenCircle from './questCircle_green.png';
import whiteCircle from './questCircle_white.png';
import questBackground from './questBack.png';

const layoutPattern = [70, 60, 50, 40, 30, 30, 40, 50, 60, 70];
const verticalGap = 100;

const QuestListPage = ({quests,setQuests,majorLevel}) => {
 

  const totalSteps = 50;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  // ✨ 1. 첫 동그라미 시작 위치를 내리기 위한 상단 여백 값을 추가합니다.
  const topOffset = 170; // (px 단위, 이 값을 조절해 시작 높이를 변경할 수 있습니다)

  // ✨ 2. 전체 스크롤 높이 계산 시에도 상단 여백을 더해줍니다.
  const totalHeight = topOffset + (totalSteps * verticalGap);

  const currentQuest = quests.find(q => !q.isCompleted);

  const handleCardClick = (questId) => {
    console.log("Quest card clicked:", questId);
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
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Box sx={{
          position: 'sticky',
          top: '6rem',  ///퀘스트카드 높이
          width: '90%',
          maxWidth: '400px',
          margin: '0 auto 2rem auto',
          zIndex: 10,
        }}>
        <QuestCard
          currentQuest={currentQuest}
          onComplete={handleCardClick}
          majorLevel={majorLevel}
        />
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: `${totalHeight}px`,
          backgroundImage: `url(${questBackground})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'top center',
          borderRadius:'24px',
        }}
      >
        {steps.map((step, index) => {
          // ✨ 3. 각 동그라미의 세로 위치를 계산할 때 상단 여백 값을 더해줍니다.
          const verticalPosition = topOffset + (index * verticalGap);
          const horizontalPosition = layoutPattern[index % 10];

          return (
            <React.Fragment key={step}>
              <Box
                component="img"
                src={step % 10 === 1 || step % 10 === 2 ? greenCircle : whiteCircle}
                alt={`Level ${step}`}
                sx={{
                  position: 'absolute',
                  top: `${verticalPosition}px`,
                  left: `${horizontalPosition}%`,
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 60,
                  cursor: 'pointer',
                }}
              />
              {(step % 10 === 0 && step < totalSteps) && (
                <Typography sx={{
                    position: 'absolute',
                    top: `${verticalPosition + 65}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                  }}>
                  Level {step / 10 + 1}
                </Typography>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuestListPage;