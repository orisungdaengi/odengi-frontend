import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { pageVariants, pageTransition } from '../../../Animations.js';

import questBackground from '../../../../public/images/Quests/QuestDetails/questbackImg.png';
// ../../../public/images/Quests/QuestDetails
const QuestDetailPage = () => {
    const navigate = useNavigate();
    const { questId } = useParams();
    
    const TOTAL_SECONDS = 300;
    const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
        navigate('/clear'); // 타이머 끝나면 QuestClearPage로 이동
        return;
        }   
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, isActive]);

    const progress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleStartTimer = () => {
        setIsActive(true);
    };

    const pulseAnimation = `
        @keyframes pulse {
            0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 40px rgba(255, 255, 255, 0); }
            100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
    `;

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
                backgroundImage: `url(${questBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <style>{pulseAnimation}</style>
            {/* 상단 헤더 */}
            <Box sx={{ p: 2, pt: 7, display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', mr: '40px' }}>
                    Level 1 - 5
                </Typography>
            </Box>

            {/* 컨텐츠 영역 */}
            <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize='20px' fontWeight='semibold'>5분간 명상하기</Typography>
                <Typography fontSize='16px'>무거운 마음을 5분간 내려놔봐요</Typography>
                <Typography fontSize='16px'>눈을 감고 편하게 소리를 들어보세요</Typography>

                {/* 중앙 원 애니메이션 컨테이너 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mt: 6 }}>
                    <Box sx={{
                        width: 200, height: 200, borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: isActive ? 'pulse 2s infinite' : 'none',
                    }}>
                        <Box sx={{ width: '75%', height: '75%', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '75%', height: '75%', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ width: '66%', height: '66%', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', m: 'auto' }} />
                            </Box>
                        </Box>
                    </Box>

                    {!isActive && (
                        <Button
                            variant="contained"
                            onClick={handleStartTimer}
                            sx={{
                                mt: 4,
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                                fontSize: '1.1rem',
                                padding: '10px 24px',
                                borderRadius: '16px',
                                width: '80%',
                                maxWidth: '300px',
                                

                            }}
                        >
                            명상 시작하기
                        </Button>
                    )}
                </Box>
            </Box>

            {/* 하단 컨트롤러 */}
            {isActive && (
                // ✨ 1. 하단 컨트롤러를 화면 아래쪽에 고정시키고, bottom 값으로 높이를 조절합니다.
                <Box sx={{
                    // position: 'absolute',
                    // bottom: '100px', // 숫자가 클수록 위로 많이 올라옵니다 (기본값: 0)
                    // width: '100%',
                    // p: 4,
                    // boxSizing: 'border-box', // 패딩이 너비에 포함되도록 설정
                    backgroundColor:'rgba(206, 206, 206, 0.50)',
                    // opacity:0.9,
                    // borderRadius:'16px',
                    // padding:'15px',
                    // paddingLeft:'40px',
                    // paddingRight:'40px',
                    position: 'absolute',       // 화면 기준으로 위치를 잡기 위해 absolute 설정
                    bottom: '100px',            // 화면 맨 아래에서 100px 위로 이동
                    left: '50%',                // 화면 왼쪽에서 50% 위치에 배치
                    transform: 'translateX(-50%)', // X축으로 -50% 이동하여 완벽하게 중앙 정렬
                    width: 'calc(100% - 48px)', // 화면 전체 너비에서 좌우 24px씩 여백을 줌
                    maxWidth: '400px',          // 최대 너비는 400px로 제한
                    
                    // --- 디자인 스타일 ---
                    padding: '16px',                  // 내부 여백
                    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // 이미지와 유사한 반투명 검은색 배경
                    borderRadius: '24px',             // 이미지와 유사한 둥근 모서리
                    boxSizing: 'border-box',
                }}>
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 2,
                    }}>
                        {/* ✨ 2. 타이머 숫자의 fontSize를 키웁니다. */}
                        <Typography sx={{
                            color: 'black',
                            mb: 2,
                            fontSize: '1.7rem',
                            fontWeight:'bold',
                        }}>
                            {formatTime(timeLeft)}
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            height: '80px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}>
                            <Box sx={{
                                width: `${progress}%`,
                                height: '100%',
                                backgroundColor: '#3E5F3C',
                                borderRadius: '8px',
                                transition: 'width 0.5s linear',
                            }} />
                        </Box>
                    </Box>
                    <Typography sx={{ mb: 1, color:'black'}}>사운드</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                        <Button variant="contained" sx={{ flexGrow: 1, backgroundColor: '#3E5F3C', '&:hover': { backgroundColor: '#4E6A3F' } }}>비</Button>
                        <Button variant="contained" sx={{ flexGrow: 1, color:'black',backgroundColor: 'rgba(255,255,255,0.2)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}>모닥불</Button>
                        <Button variant="contained" sx={{ flexGrow: 1, color:'black',backgroundColor: 'rgba(255,255,255,0.2)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}>바람</Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};


export default QuestDetailPage;