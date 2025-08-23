// import React from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     Avatar,
//     Stack,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemText,
//     Divider,
//     Paper
// } from '@mui/material';
// import {
//     Edit,
//     ChevronRight
// } from '@mui/icons-material';

// // --- 이미지 경로 (실제 파일 위치에 맞게 수정해주세요) ---
// // 예시: public 폴더 안에 images/My 폴더를 만들고 이미지를 넣었을 경우
// const characterImage = '/images/My/char_cloud.png'; // 구름 캐릭터 이미지
// const goldMedal = '/images/My/medal_gold.png';      // 훈장 이미지 1
// const silverMedal = '/images/My/medal_silver.png';    // 훈장 이미지 2
// const bronzeMedal = '/images/My/medal_bronze.png';    // 훈장 이미지 3

// // --- 데이터 (나중에 props나 state로 관리) ---
// const user = {
//     nickname: '닉네임',
//     id: 'youngchan',
//     avatarUrl: characterImage
// };

// const badges = [
//     { img: goldMedal, label: '프로 산책러' },
//     { img: silverMedal, label: '레벨1 클리어' },
//     { img: bronzeMedal, label: '레벨2 클리어' }
// ];

// const menuItems = [
//     { text: '계정정보' },
//     { text: '로그아웃' },
//     { text: '회원탈퇴' }
// ];


// const MyPage = () => {
//     return (
//         <Box sx={{
//             width: '100%',
//             height: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             // 스크롤이 최상단이나 최하단에서 튕기는 효과(overscroll)를 막아 UI를 깔끔하게 함
//             overscrollBehavior: 'none',
//         }}>
//             {/* 1. 상단 하늘 배경 및 캐릭터 */}
//             <Box sx={{
//                 minHeight: '35%',
//                 backgroundColor: '#75C8FF', // 하늘색 배경
//                 display: 'flex',
//                 justifyContent: 'center',
//                 position: 'relative',
//                 // 상단 상태바 영역만큼 패딩을 줘서 컨텐츠가 겹치지 않게 함
//                 pt: 'calc(env(safe-area-inset-top) + 20px)',
//             }}>
//                 <Avatar
//                     alt={user.nickname}
//                     src={user.avatarUrl}
//                     sx={{
//                         width: 180,
//                         height: 180,
//                         position: 'absolute',
//                         bottom: -90, // 아바타의 절반만 걸치도록 배치
//                         border: '5px solid #6ABE66', // 초록색 테두리
//                     }}
//                 />
//             </Box>

//             {/* 2. 하단 초록색 배경 컨텐츠 */}
//             <Box sx={{
//                 height: '65%',
//                 backgroundColor: '#6ABE66', // 초록색 배경
//                 pt: '100px', // 아바타 이미지 아래부터 컨텐츠가 시작되도록 패딩
//                 px: 2,
//                 overflowY: 'auto', // 내용이 길어지면 스크롤
//                 // 스크롤바 숨기기
//                 '&::-webkit-scrollbar': { display: 'none' },
//                  scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//             }}>
//                 {/* 닉네임 섹션 */}
//                 <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//                         {user.nickname}
//                     </Typography>
//                     <IconButton size="small" sx={{ mb: 0.5 }}>
//                         <Edit fontSize="small" />
//                     </IconButton>
//                 </Stack>
//                 <Typography textAlign="center" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
//                     {user.id}
//                 </Typography>

//                 {/* 훈장 섹션 */}
//                 <Paper elevation={0} sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '12px', mb: 2 }}>
//                     <Typography sx={{ fontWeight: 'bold', mb: 2 }}>훈장</Typography>
//                     <Stack direction="row" justifyContent="space-around">
//                         {badges.map(badge => (
//                             <Stack key={badge.label} alignItems="center" spacing={1}>
//                                 <Box component="img" src={badge.img} alt={badge.label} sx={{ width: 60, height: 60 }} />
//                                 <Typography fontSize="0.8rem">{badge.label}</Typography>
//                             </Stack>
//                         ))}
//                     </Stack>
//                 </Paper>

//                 {/* 메뉴 리스트 */}
//                 <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
//                     <List sx={{ color: 'white', p:0 }}>
//                         {menuItems.map((item, index) => (
//                             <React.Fragment key={item.text}>
//                                 <ListItem disablePadding>
//                                     <ListItemButton sx={{ py: 1.5 }}>
//                                         <ListItemText primary={
//                                             <Typography>{item.text}</Typography>
//                                         } />
//                                         <ChevronRight />
//                                     </ListItemButton>
//                                 </ListItem>
//                                 {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)'}} />}
//                             </React.Fragment>
//                         ))}
//                     </List>
//                 </Paper>
//             </Box>
//         </Box>
//     );
// };

// export default MyPage;

import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Stack,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Paper
} from '@mui/material';
import {
    Edit,
    ChevronRight
} from '@mui/icons-material';

// --- ⚠️ 중요: 이미지 경로 (실제 파일 위치에 맞게 수정해주세요) ---
// 예시: public 폴더 안에 images/My 폴더를 만들고 이미지를 넣었을 경우
const backgroundImage = '/images/My/MyBack.png'; // 전체 배경 이미지
const goldMedal = '/images/My/훈장1.png';      // 훈장 이미지 1
const silverMedal = '/images/My/훈장2.png';    // 훈장 이미지 2
const bronzeMedal = '/images/My/훈장3.png';    // 훈장 이미지 3

// --- 데이터 (나중에 props나 state로 관리) ---
const user = {
    nickname: '닉네임',
    id: 'youngchan',
};

const badges = [
    { img: goldMedal, label: '프로 산책러' },
    { img: silverMedal, label: '레벨1 클리어' },
    { img: bronzeMedal, label: '레벨2 클리어' }
];

const menuItems = [
    { text: '계정정보' },
    { text: '로그아웃' },
    { text: '회원탈퇴' }
];


const MyPage = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end', // 컨텐츠를 하단에 정렬
            color: '#333333' // 기본 텍스트 색상
        }}>

            {/* 컨텐츠를 담을 컨테이너 */}
            <Box sx={{ pb: '20vh' }}> {/* 하단 네비게이션 바와의 간격을 위해 패딩 추가 */}
                
                {/* 닉네임 섹션 */}
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mb:0.1}}>
                    <Typography variant="h5" sx={{ fontWeight: 'semibold',color:'#FFFFFF'}}>
                        {user.nickname}
                    </Typography>
                    
                </Stack>
                <Typography textAlign="center" sx={{ color: '#FFFFFF', mb: 4.0}}>
                    {user.id}
                </Typography>
                

                {/* 훈장 섹션 */}
                <Paper elevation={0} sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 반투명 흰색 배경
                    borderRadius: '16px', 
                    mx: 2, // 좌우 여백
                    mb: 2,
                    backdropFilter: 'blur(5px)' // 배경 블러 효과
                }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 2 }}>훈장</Typography>
                    <Stack direction="row" justifyContent="space-around">
                        {badges.map(badge => (
                            <Stack key={badge.label} alignItems="center" spacing={1} pb={3}>
                                <Box component="img" src={badge.img} alt={badge.label} sx={{ width: 63, height: 90 }} />
                                <Typography fontSize="0.8rem" sx={{ fontWeight: 500 }}>{badge.label}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Paper>

                {/* 메뉴 리스트 */}
                <Paper elevation={0} sx={{ 
                    backgroundColor: 'transparent', 
                    borderRadius: '16px',
                    mx: 2, // 좌우 여백
                    backdropFilter: 'blur(5px)'
                }}>
                    <List sx={{ p:0 }}>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={item.text}>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ py: 1.5 }}>
                                        <ListItemText primary={
                                            <Typography sx={{ fontWeight: 500 }}>{item.text}</Typography>
                                        } />
                                        <ChevronRight sx={{ color: '#BABABA' }} />
                                    </ListItemButton>
                                </ListItem>
                                {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: 'rgba(0,0,0,0.1)'}} />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
};

export default MyPage;