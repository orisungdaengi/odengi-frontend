// import React, { useState, useEffect } from 'react';
// import { Box, Typography, IconButton, Button, CircularProgress, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import { ArrowBackIosNew, Call } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { pageVariants, pageTransition } from '../../../Animations.js';
// import questBackground from '../../../../public/images/Quests/QuestDetails/questbackImg.png';

// const QuestDetailPage_1_7 = () => {
//     const navigate = useNavigate();
//     // 1. API 데이터를 저장할 state와 로딩 상태를 관리할 state 추가
//     const [centers, setCenters] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // 2. 컴포넌트가 처음 렌더링될 때 API를 호출하는 useEffect 추가
//     useEffect(() => {
//         const fetchCenters = async () => {
//             try {
//                 const response = await fetch('https://odengi-server.onrender.com/centers/?lat=37.496742933544155&lon=126.95699954020253');
//                 const data = await response.json();
//                 setCenters(data); // 받아온 데이터를 state에 저장
//             } catch (error) {
//                 console.error("상담센터 목록을 불러오는 데 실패했습니다.", error);
//             } finally {
//                 setIsLoading(false); // 로딩 상태 종료
//             }
//         };

//         fetchCenters();
//     }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

//     return (
//         <Box
//             component={motion.div}
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//             sx={{
//                 position: 'absolute',
//                 width: '100%',
//                 height: '100%',
//                 backgroundImage: `url(${questBackground})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 color: 'white',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflowY: 'auto', // 내용이 길어지면 스크롤 가능하도록 설정
//             }}
//         >
//             {/* 상단 헤더 */}
//             <Box sx={{ p: 2, pt: 7, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
//                 <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
//                     <ArrowBackIosNew />
//                 </IconButton>
//                 <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', mr: '40px', fontWeight: 'bold' }}>
//                     Level 1 - 7
//                 </Typography>
//             </Box>

//             {/* 컨텐츠 영역 */}
//             <Box sx={{ p: '16px 32px', flexGrow: 1 }}>
//                 <Typography fontSize='20px' fontWeight='semibold' sx={{ mb: 1 }}>도움이 필요할 땐, 전문가와 상담해요</Typography>
//                 <Typography fontSize='16px' sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>가까운 상담센터를 확인해보세요</Typography>

//                 {/* 3. 로딩 및 상담센터 목록 표시 */}
//                 <Box sx={{ mt: 2 }}>
//                     {isLoading ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
//                             <CircularProgress color="inherit" />
//                             <Typography sx={{ ml: 2 }}>목록을 불러오는 중...</Typography>
//                         </Box>
//                     ) : (
//                         centers.map((center) => (
//                             <Paper
//                                 key={center.id}
//                                 sx={{
//                                     p: 2,
//                                     mb: 1.5,
//                                     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                                     color: 'white',
//                                     borderRadius: '12px',
//                                     backdropFilter: 'blur(5px)',
//                                 }}
//                             >
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{center.name}</Typography>
//                                 <Typography variant="body2" sx={{ mt: 0.5 }}>{center.address}</Typography>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
//                                     <Typography variant="body2" sx={{ color: '#A9D1E4' }}>
//                                         거리: {center.distance ? `${center.distance.toFixed(2)}km` : '정보 없음'}
//                                     </Typography>
//                                     <Button
//                                         variant="contained"
//                                         startIcon={<Call />}
//                                         size="small"
//                                         href={`tel:${center.phone}`}
//                                         sx={{
//                                             backgroundColor: 'rgba(255,255,255,0.2)',
//                                             '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
//                                         }}
//                                     >
//                                         전화
//                                     </Button>
//                                 </Box>
//                             </Paper>
//                         ))
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default QuestDetailPage_1_7;

import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Button, CircularProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, Call } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pageVariants, pageTransition } from '../../../Animations.js';
import questBackground from '../../../../public/images/Quests/QuestDetails/questbackImg.png';

const QuestDetailPage_1_7 = () => {
    const navigate = useNavigate();
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch('https://odengi-server.onrender.com/centers/?lat=37.496742933544155&lon=126.95699954020253');
                const data = await response.json();

                // ✨ 변경점 1: 받아온 데이터가 배열(List) 형태인지 확인합니다.
                if (Array.isArray(data)) {
                    setCenters(data);
                } else {
                    // 배열이 아니면 빈 목록으로 처리하여 앱이 꺼지는 것을 방지합니다.
                    console.error("API 응답이 배열 형태가 아닙니다:", data);
                    setCenters([]);
                }
            } catch (error) {
                console.error("상담센터 목록을 불러오는 데 실패했습니다.", error);
                setCenters([]); // 에러 발생 시에도 빈 목록으로 처리합니다.
            } finally {
                setIsLoading(false);
            }
        };

        fetchCenters();
    }, []);

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
                overflowY: 'auto',
            }}
        >
            {/* 상단 헤더 */}
            <Box sx={{ p: 2, pt: 7, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', mr: '40px', fontWeight: 'bold' }}>
                    Level 1 - 7
                </Typography>
            </Box>

            {/* 컨텐츠 영역 */}
            <Box sx={{ p: '16px 32px', flexGrow: 1 }}>
                <Typography fontSize='20px' fontWeight='semibold' sx={{ mb: 1 }}>도움이 필요할 땐, 전문가와 상담해요</Typography>
                <Typography fontSize='16px' sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>가까운 상담센터를 확인해보세요</Typography>

                <Box sx={{ mt: 2 }}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                            <CircularProgress color="inherit" />
                            <Typography sx={{ ml: 2 }}>목록을 불러오는 중...</Typography>
                        </Box>
                    ) : (
                        // ✨ 변경점 2: 목록이 비어있을 때 안내 메시지를 보여줍니다.
                        centers.length > 0 ? (
                            centers.map((center) => (
                                <Paper
                                    key={center?.id || Math.random()} // id가 없는 경우를 대비
                                    sx={{
                                        p: 2, mb: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        color: 'white', borderRadius: '12px', backdropFilter: 'blur(5px)',
                                    }}
                                >
                                    {/* ✨ 변경점 3: 데이터가 없어도 오류가 나지 않도록 'Optional Chaining(?.)'을 사용합니다. */}
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{center?.name || '이름 정보 없음'}</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }}>{center?.address || '주소 정보 없음'}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="body2" sx={{ color: '#A9D1E4' }}>
                                            {/* ✨ 변경점 4: distance 값이 숫자인지 명확히 확인합니다. */}
                                            거리: {typeof center?.distance === 'number' ? `${center.distance.toFixed(2)}km` : '정보 없음'}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<Call />}
                                            size="small"
                                            href={`tel:${center?.phone || ''}`}
                                            disabled={!center?.phone} // 전화번호가 없으면 버튼 비활성화
                                            sx={{
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                                            }}
                                        >
                                            전화
                                        </Button>
                                    </Box>
                                </Paper>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: 'center', p: 4 }}>
                                주변에 등록된 상담센터가 없거나, 목록을 불러오는 데 실패했습니다.
                            </Typography>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default QuestDetailPage_1_7;