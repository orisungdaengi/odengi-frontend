import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../../Animations.js';
import QuestCard from '../../components/QuestCard.jsx';
import { useNavigate } from 'react-router-dom';

const greenCircle = '/images/Quests/QuestList/questCircle_green (2).png';
const whiteCircle = '/images/Quests/QuestList/questCircle_white (2).png';
const questBackground = '/images/Quests/QuestList/questListBack.png';

const charLv1 = '/images/Homes/characterImg/charLv1.png';
const charLv2 = '/images/Homes/characterImg/charLv2.png';
const charLv3 = '/images/Homes/characterImg/charLv3.png';
const charLv4 = '/images/Homes/characterImg/charLv4.png';
const charLv5 = '/images/Homes/characterImg/charLv5.png';

const layoutPattern = [70, 60, 50, 40, 30, 30, 40, 50, 60, 70];
const verticalGap = 100;

const QuestListPage = ({ quests, setQuests, selectedStep, setSelectedStep }) => {
  const navigate = useNavigate();

  const totalSteps = 50;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const topOffset = 240;
  const totalHeight = topOffset + (totalSteps * verticalGap);

  const selectedQuest = quests.find(q => q.id === selectedStep);
  const selectedMajorLevel = Math.floor((selectedStep - 1) / 10) + 1;

  const handleCardClick = (questId) => {
    handleCircleClick(questId);
  };

  // 변경된 부분: setTimeout을 사용하여 페이지 전환을 2초 지연시킵니다.
  const handleCircleClick = (step) => {
    // 1. 상태를 즉시 업데이트하여 캐릭터 이동 및 카드 변경 애니메이션을 시작합니다.
    setSelectedStep(step);

    // 2. 2초(2000ms) 후에 페이지를 이동시키는 로직을 실행합니다.
    setTimeout(() => {
      if (step === 5) {
          navigate(`/quests/5`);
      } else if (step === 7) {
          navigate(`/quests/1-7`);
      } else if (step === 27) {
          navigate(`/quests/3-7`);
      } else {
          console.log(`${step}번 퀘스트는 아직 준비중입니다.`);
      }
    }, 2000); // 2초 딜레이
  };

  const getCharacterForStep = (step) => {
    if (step >= 1 && step <= 10) return charLv1;
    if (step >= 11 && step <= 20) return charLv2;
    if (step >= 21 && step <= 30) return charLv3;
    if (step >= 31 && step <= 40) return charLv4;
    if (step >= 41 && step <= 50) return charLv5;
    return null;
  };

  const characterImage = getCharacterForStep(selectedStep);
  let characterSxProps = { display: 'none' };

  if (selectedStep && characterImage) {
    const index = selectedStep - 1;
    const top = topOffset + (index * verticalGap);
    const left = layoutPattern[index % 10];
    
    characterSxProps = {
      position: 'absolute',
      zIndex: 5,
      width: 80,
      height: 'auto',
      top: `${top - 50}px`, 
      left: `${left}%`,
      transform: 'translateX(-50%)',
      transition: 'top 0.4s ease-in-out, left 0.4s ease-in-out',
    };
  }

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
        '::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Box sx={{
          position: 'sticky',
          top: '6rem',
          width: '90%',
          maxWidth: '400px',
          margin: '0 auto 2rem auto',
          zIndex: 10,
        }}>
        <QuestCard
          currentQuest={selectedQuest}
          onComplete={handleCardClick}
          majorLevel={selectedMajorLevel}
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
        <Box
          component="img"
          src={characterImage}
          alt="Quest Character"
          sx={characterSxProps}
        />
        
        {steps.map((step, index) => {
          const verticalPosition = topOffset + (index * verticalGap);
          const horizontalPosition = layoutPattern[index % 10];
          const isGreenCircle = step % 10 === 1 || step % 10 === 2;
          const mainLevel = Math.floor((step - 1) / 10) + 1;
          const subLevel = (step - 1) % 10 + 1;
          const levelStepText = `${mainLevel}-${subLevel}`;

          return (
            <React.Fragment key={step}>
              <Box
                onClick={() => handleCircleClick(step)}
                sx={{
                  position: 'absolute',
                  top: `${verticalPosition}px`,
                  left: `${horizontalPosition}%`,
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 60,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={isGreenCircle ? greenCircle : whiteCircle}
                  alt={`Level ${levelStepText}`}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <Typography
                  sx={{
                    position: 'relative', 
                    zIndex: 1,
                    fontWeight: '500',
                    fontSize: '1.3rem', 
                    color: isGreenCircle ? 'white' : '#3E5F3C',
                  }}
                >
                  {levelStepText}
                </Typography>
              </Box>
              
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
