import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '../../Animations.js';

import BottomNavBar from '../../components/NavBar.jsx';
import XPBar from '../../components/XPBar.jsx';
import QuestCard from '../../components/QuestCard.jsx';
import NotificationIcon from '../../components/NotificationIcon.jsx';

import { STEPS_PER_MAJOR_LEVEL } from '../Quests/Quests.jsx';
import { levelAssets } from './changingPic.jsx';
import { notificationData } from '../../components/notificationData.jsx';

const Home = ({
    majorLevel, setMajorLevel,
    currentSteps, setCurrentSteps,
    quests, setQuests,
    selectedStep, setSelectedStep
}) => {
    const navigate = useNavigate();

    const currentQuest = quests.find(q => q.id === selectedStep) || quests.find(q => !q.isCompleted);

    const currentAssets = levelAssets[majorLevel - 1] || levelAssets[levelAssets.length - 1];
    const hasUnread = notificationData.today.some(item => !item.isRead) ||
                      notificationData.last7Days.some(item => !item.isRead);

    const handleNotificationClick = () => navigate('/notifications');
    
    const handleQuestCardClick = () => {
        if (currentQuest) setSelectedStep(currentQuest.id);
        navigate('/quests');
    };

    // ✅ 1. 말풍선을 클릭하면 '/surprise-quest' 경로로 이동하는 함수를 만듭니다.
    const handleBubbleClick = () => {
        navigate('/surprise-quest');
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
                <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', ml: 1.5 }}>닉네임</Typography>
                <IconButton onClick={handleNotificationClick} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', p: 1 }}>
                    <NotificationIcon hasUnread={hasUnread} />
                </IconButton>
            </Box>

            {/* 중앙 컨텐츠 */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    width: '90%',
                    maxWidth: '400px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                }}>
                    <QuestCard currentQuest={currentQuest} onComplete={handleQuestCardClick} majorLevel={majorLevel}  />
                </Box>
                
                {/* ✅ 2. 말풍선 Box에 onClick 이벤트와 cursor 스타일을 추가합니다. */}
                <Box 
                    onClick={handleBubbleClick} // 클릭 이벤트 연결
                    sx={{ 
                        backgroundColor: '#A9D1E4', 
                        color: 'black', 
                        borderRadius: '20px', 
                        py: 1, px: 2, mt: 3,
                        cursor: 'pointer', // 마우스를 올리면 손가락 모양으로 변경
                        '&:hover': { // 마우스를 올렸을 때 약간 어두워지는 효과
                            backgroundColor: '#98B9C7'
                        }
                    }}
                >
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

            
            <BottomNavBar />
        </Box>
    );
};

export default Home;