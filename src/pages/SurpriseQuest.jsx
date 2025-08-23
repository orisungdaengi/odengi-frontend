// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     Button,
//     Stack
// } from '@mui/material';
// import { ArrowBackIosNew } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const mapImage = '/images/Quests/mapImg.png';
// const backgroundTexture = '/images/Quests/QuestDetails/questbackImg.png';

// const WalkMissionPage = () => {
//     const navigate = useNavigate();

//     const [isWalking, setIsWalking] = useState(false);
//     const [time, setTime] = useState(0);

//     useEffect(() => {
//         let interval = null;

//         if (isWalking) {
//             interval = setInterval(() => {
//                 setTime(prevTime => prevTime + 1);
//             }, 1000);
//         } else {
//             clearInterval(interval);
//         }

//         return () => clearInterval(interval);
//     }, [isWalking]);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
//     };

//     // ✅ 수정된 부분
//     const handleStartWalk = () => {
//         setIsWalking(true); // 초기화 X → 이어서 진행
//     };

//     const handleEndWalk = () => {
//         setIsWalking(false);
//         setTime(0); // 종료 시에만 초기화
//     };

//     const handlePauseWalk = () => {
//         setIsWalking(false); // 멈춤 (시간 유지)
//     };

//     return (
//         <Box sx={{
//             width: '100%',
//             height: '100vh',
//             backgroundImage: `url(${backgroundTexture})`,
//             backgroundSize: 'cover',
//             color: 'white',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//         }}>
//             {/* 상단 헤더 */}
//             <Box sx={{ p: 2, pt: 'calc(env(safe-area-inset-top) + 16px)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
//                 <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
//                     <ArrowBackIosNew />
//                 </IconButton>
//                 <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', mr: '48px', fontWeight: 'semibold' }}>
//                     순간미션
//                 </Typography>
//             </Box>

//             {/* 컨텐츠 영역 */}
//             <Box sx={{
//                 flexGrow: 1,
//                 px: 3,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 textAlign: 'center',
//                 overflowY: 'auto',
//                 '&::-webkit-scrollbar': { display: 'none' },
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//             }}>
//                 {isWalking ? (
//                     <Box sx={{ mt: 4 }}>
//                         <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
//                             {formatTime(time)}
//                         </Typography>
//                     </Box>
//                 ) : (
//                     <>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
//                             주변 산책하기
//                         </Typography>
//                         <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
//                             오늘은 구름이 약간 껴있어요.<br/>
//                             햇빛이 약하니까 밖에 나가서 산책하는 건 어때요?
//                         </Typography>
//                     </>
//                 )}

//                 <Box
//                     component="img"
//                     src={mapImage}
//                     alt="주변 산책 지도"
//                     sx={{
//                         width: '100%',
//                         height: 'auto',
//                         borderRadius: '12px',
//                         my: 'auto',
//                     }}
//                 />

//                 {!isWalking && (
//                     <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
//                         간단하게 주변을 돌아보아요
//                     </Typography>
//                 )}
//             </Box>

//             {/* 하단 버튼 */}
//             <Stack spacing={1.5} sx={{ p: 3, pt: 1, flexShrink: 0, pb: 25 }}>
//                 {isWalking ? (
//                     <>
//                         <Button
//                             onClick={handlePauseWalk}
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: '#212121', color: 'white', py: 1.5,
//                                 borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
//                                 '&:hover': { backgroundColor: '#333333' }
//                             }}
//                         >
//                             산책 일시정지
//                         </Button>
//                         <Button
//                             onClick={handleEndWalk}
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: '#8B2E2E', color: 'white', py: 1.5,
//                                 borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
//                                 '&:hover': { backgroundColor: '#A04242' }
//                             }}
//                         >
//                             산책 종료하기
//                         </Button>
//                     </>
//                 ) : (
//                     <>
//                         <Button
//                             onClick={handleStartWalk}
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: '#212121', color: 'white', py: 1.5,
//                                 borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
//                                 '&:hover': { backgroundColor: '#333333' }
//                             }}
//                         >
//                             산책 시작하기
//                         </Button>
//                         <Button
//                             onClick={() => navigate('/home')}
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: '#8B2E2E', color: 'white', py: 1.5,
//                                 borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
//                                 '&:hover': { backgroundColor: '#A04242' }
//                             }}
//                         >
//                             다음에 하기
//                         </Button>
//                     </>
//                 )}
//             </Stack>
//         </Box>
//     );
// };

// export default WalkMissionPage;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Stack
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mapImage = '/images/Quests/mapImg.png';
const backgroundTexture = '/images/Quests/QuestDetails/questbackImg.png';

const WalkMissionPage = () => {
    const navigate = useNavigate();

    const [isWalking, setIsWalking] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isWalking) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isWalking]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleStartWalk = () => {
        setIsWalking(true);
    };

    const handleEndWalk = () => {
        setIsWalking(false);
        setTime(0);
    };

    // ✅ 일시정지/재개를 같은 버튼에서 토글
    const handleTogglePause = () => {
        setIsWalking(prev => !prev);
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${backgroundTexture})`,
            backgroundSize: 'cover',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            {/* 상단 헤더 */}
            <Box sx={{ p: 2, pt: 'calc(env(safe-area-inset-top) + 16px)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', mr: '48px', fontWeight: 'semibold' }}>
                    순간미션
                </Typography>
            </Box>

            {/* 컨텐츠 영역 */}
            <Box sx={{
                flexGrow: 1,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                overflowY: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
                {time > 0 ? (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            {formatTime(time)}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                            주변 산책하기
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                            오늘은 구름이 약간 껴있어요.<br/>
                            햇빛이 약하니까 밖에 나가서 산책하는 건 어때요?
                        </Typography>
                    </>
                )}

                <Box
                    component="img"
                    src={mapImage}
                    alt="주변 산책 지도"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        my: 'auto',
                    }}
                />

                {!isWalking && time === 0 && (
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
                        간단하게 주변을 돌아보아요
                    </Typography>
                )}
            </Box>

            {/* 하단 버튼 */}
            <Stack spacing={1.5} sx={{ p: 3, pt: 1, flexShrink: 0, pb: 25 }}>
                {time > 0 ? (
                    <>
                        <Button
                            onClick={handleTogglePause}
                            variant="contained"
                            sx={{
                                backgroundColor: '#212121', color: 'white', py: 1.5,
                                borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#333333' }
                            }}
                        >
                            {isWalking ? '산책 일시정지' : '산책 다시 시작'}
                        </Button>
                        <Button
                            onClick={handleEndWalk}
                            variant="contained"
                            sx={{
                                backgroundColor: '#8B2E2E', color: 'white', py: 1.5,
                                borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#A04242' }
                            }}
                        >
                            산책 종료하기
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={handleStartWalk}
                            variant="contained"
                            sx={{
                                backgroundColor: '#212121', color: 'white', py: 1.5,
                                borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#333333' }
                            }}
                        >
                            산책 시작하기
                        </Button>
                        <Button
                            onClick={() => navigate('/home')}
                            variant="contained"
                            sx={{
                                backgroundColor: '#8B2E2E', color: 'white', py: 1.5,
                                borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#A04242' }
                            }}
                        >
                            다음에 하기
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    );
};

export default WalkMissionPage;
