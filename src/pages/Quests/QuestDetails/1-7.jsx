// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     CircularProgress,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemText,
//     Divider
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { ArrowBackIosNew, ChevronRight } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { pageVariants, pageTransition } from '../../../Animations.js';
// import questBackground from '../../../../public/images/Quests/QuestDetails/questbackImg.png';

// const QuestDetailPage_1_7 = () => {
//     const navigate = useNavigate();
//     const [centers, setCenters] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchCenters = async () => {
//             try {
//                 const response = await fetch('https://odengi-server.onrender.com/centers/?lat=37.496742933544155&lon=126.95699954020253');
//                 const data = await response.json();

//                 if (Array.isArray(data.data)) {
//                     setCenters(data.data);
//                 } else {
//                     console.error("API 응답 데이터가 배열 형태가 아닙니다:", data);
//                     setCenters([]);
//                 }
//             } catch (error) {
//                 console.error("상담센터 목록을 불러오는 데 실패했습니다.", error);
//                 setCenters([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCenters();
//     }, []);

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
//             <Box sx={{
//                 p: '16px 32px',
//                 flexGrow: 1,
//                 overflowY: 'auto',
//                 '&::-webkit-scrollbar': {
//                     display: 'none',
//                 },
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//             }}>
//                 <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>상담 센터 둘러보기</Typography>
//                 <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
//                     사용자님 주변의 상담 센터를 알아보았어요<br />
//                     부담가지지 말고 편하게 살펴보세요
//                 </Typography>

//                 {isLoading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
//                         <CircularProgress color="inherit" />
//                         <Typography sx={{ ml: 2 }}>목록을 불러오는 중...</Typography>
//                     </Box>
//                 ) : (
//                     <List disablePadding>
//                         {centers.length > 0 ? (
//                             centers.map((center, index) => (
//                                 <React.Fragment key={`${center.id}-${index}`}>
//                                     <ListItemButton sx={{ p: 0, py: 1.5 }}>
//                                         <ListItemText
//                                             primary={
//                                                 <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                                                     {center?.name || '이름 정보 없음'}
//                                                 </Typography>
//                                             }
//                                             secondary={
//                                                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
//                                                     {center?.road_address || '주소 정보 없음'}
//                                                 </Typography>
//                                             }
//                                         />
//                                         <ChevronRight sx={{ color: 'rgba(255,255,255,0.7)' }} />
//                                     </ListItemButton>
//                                     {index < centers.length - 1 && <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />}
//                                 </React.Fragment>
//                             ))
//                         ) : (
//                             <Typography sx={{ textAlign: 'center', p: 4 }}>
//                                 주변에 등록된 상담센터가 없거나, 목록을 불러오는 데 실패했습니다.
//                             </Typography>
//                         )}
//                     </List>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default QuestDetailPage_1_7;

// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     CircularProgress,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemText,
//     Divider
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { ArrowBackIosNew, ChevronRight } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { pageVariants, pageTransition } from '../../../Animations.js';
// import questBackground from '../../../../public/images/Quests/QuestDetails/questbackImg.png';

// const QuestDetailPage_1_7 = () => {
//     const navigate = useNavigate();
//     const [centers, setCenters] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchCenters = async () => {
//             try {
//                 const response = await fetch('https://odengi-server.onrender.com/centers/?lat=37.496742933544155&lon=126.95699954020253');
//                 const data = await response.json();

//                 if (Array.isArray(data.data)) {
//                     setCenters(data.data);
//                 } else {
//                     console.error("API 응답 데이터가 배열 형태가 아닙니다:", data);
//                     setCenters([]);
//                 }
//             } catch (error) {
//                 console.error("상담센터 목록을 불러오는 데 실패했습니다.", error);
//                 setCenters([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCenters();
//     }, []);

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
//             <Box sx={{
//                 p: '16px 32px',
//                 flexGrow: 1,
//                 overflowY: 'auto',
//                 '&::-webkit-scrollbar': {
//                     display: 'none',
//                 },
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//             }}>
//                 <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>상담 센터 둘러보기</Typography>
//                 <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
//                     사용자님 주변의 상담 센터를 알아보았어요<br />
//                     부담가지지 말고 편하게 살펴보세요
//                 </Typography>

//                 {isLoading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
//                         <CircularProgress color="inherit" />
//                         <Typography sx={{ ml: 2 }}>목록을 불러오는 중...</Typography>
//                     </Box>
//                 ) : (
//                     <List disablePadding>
//                         {centers.length > 0 ? (
//                             centers.map((center, index) => (
//                                 <React.Fragment key={`${center.id}-${index}`}>
//                                     <ListItemButton sx={{ p: 0, py: 1.5 }}>
//                                         <ListItemText
//                                             primary={
//                                                 <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                                                     {center?.name || '이름 정보 없음'}
//                                                 </Typography>
//                                             }
//                                             secondary={
//                                                 // ✅ 주소(road_address) 대신 전화번호(phone)를 표시하도록 변경
//                                                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
//                                                     {center?.contact_num || '번호 정보 없음'}
//                                                 </Typography>
//                                             }
//                                         />
//                                         <ChevronRight sx={{ color: 'rgba(255,255,255,0.7)' }} />
//                                     </ListItemButton>
//                                     {index < centers.length - 1 && <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />}
//                                 </React.Fragment>
//                             ))
//                         ) : (
//                             <Typography sx={{ textAlign: 'center', p: 4 }}>
//                                 주변에 등록된 상담센터가 없거나, 목록을 불러오는 데 실패했습니다.
//                             </Typography>
//                         )}
//                     </List>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default QuestDetailPage_1_7;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, ChevronRight } from '@mui/icons-material';
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

                if (Array.isArray(data.data)) {
                    setCenters(data.data);
                } else {
                    console.error("API 응답 데이터가 배열 형태가 아닙니다:", data);
                    setCenters([]);
                }
            } catch (error) {
                console.error("상담센터 목록을 불러오는 데 실패했습니다.", error);
                setCenters([]);
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
            <Box sx={{
                p: '16px 32px',
                flexGrow: 1,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>상담 센터 둘러보기</Typography>
                <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
                    사용자님 주변의 상담 센터를 알아보았어요<br />
                    부담가지지 말고 편하게 살펴보세요
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <CircularProgress color="inherit" />
                        <Typography sx={{ ml: 2 }}>목록을 불러오는 중...</Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {centers.length > 0 ? (
                            centers.map((center, index) => (
                                <React.Fragment key={`${center.id}-${index}`}>
                                    {/* ✅ ListItemButton을 a 태그로 변경하여 링크 기능을 추가합니다. */}
                                    <ListItemButton
                                        component="a"
                                        href={center.site}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        disabled={!center.site} // site 주소가 없을 경우 버튼 비활성화
                                        sx={{ 
                                            p: 0, 
                                            py: 1.5,
                                            // 링크의 기본 밑줄 스타일 제거
                                            textDecoration: 'none', 
                                            // 비활성화 시에도 텍스트 색상 유지 (선택 사항)
                                            '&.Mui-disabled': {
                                                opacity: 0.5
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                                    {center?.name || '이름 정보 없음'}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                                                    {center?.contact_num || '번호 정보 없음'}
                                                </Typography>
                                            }
                                        />
                                        <ChevronRight sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                    </ListItemButton>
                                    {index < centers.length - 1 && <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />}
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: 'center', p: 4 }}>
                                주변에 등록된 상담센터가 없거나, 목록을 불러오는 데 실패했습니다.
                            </Typography>
                        )}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default QuestDetailPage_1_7;