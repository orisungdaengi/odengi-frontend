import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// 아이콘 이미지 import
import recordOffIcon from '../../public/images/Component/기록off.png';
import recordOnIcon from '../../public/images/Component/기록on.png';
import questOffIcon from '../../public/images/Component/퀘스트off.png';
import questOnIcon from '../../public/images/Component/퀘스트on.png';
import homeOffIcon from '../../public/images/Component/홈off.png';
import homeOnIcon from '../../public/images/Component/홈on.png';
import chatOffIcon from '../../public/images/Component/채팅off.png';
import chatOnIcon from '../../public/images/Component/채팅on.png';
import myOffIcon from '../../public/images/Component/마이off.png';
import myOnIcon from '../../public/images/Component/마이on.png';

const navActionStyle = {
    padding: '6px 0',
    minWidth: 'auto', // 아이콘이 균등하게 배치되도록 추가
    '& img': {
        width: '80px',
        height: '80px',
    },
};

export default function BottomNavBar({ variant = 'default' }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        navigate(newValue);
    };

    // --- ⬇️ 이 부분의 배경색 결정 로직을 수정했습니다 ⬇️ ---
    let finalBackgroundColor = 'transparent'; // 기본값은 투명
    let finalBorderTop = 'none';

    if (value === '/records') {
        // 현재 경로가 '/records'이면 배경을 불투명하게 설정
        finalBackgroundColor = '#1C1C1E';
        finalBorderTop = '1px solid #2A2A2A';
    } else if (variant === 'quest') {
        finalBackgroundColor = 'rgba(0, 0, 0, 0.3)';
    }
    // --- ⬆️ 여기까지 수정! ⬆️ ---

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: finalBackgroundColor, // 결정된 배경색 적용
                borderTop: finalBorderTop, // 결정된 상단 테두리 적용
                boxShadow: 'none',
                transition: 'background-color 0.3s ease-in-out',
            }}
            elevation={0}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'transparent',
                    height: '65px',
                }}
            >
                <BottomNavigationAction
                    value="/records"
                    sx={navActionStyle}
                    icon={<img src={value === '/records' ? recordOnIcon : recordOffIcon} alt="기록" />}
                />
                <BottomNavigationAction
                    value="/quests"
                    sx={navActionStyle}
                    icon={<img src={value.startsWith('/quests') ? questOnIcon : questOffIcon} alt="퀘스트" />}
                />
                <BottomNavigationAction
                    value="/home"
                    sx={navActionStyle}
                    icon={<img src={value === '/home' ? homeOnIcon : homeOffIcon} alt="홈" />}
                />
                <BottomNavigationAction
                    value="/chat"
                    sx={navActionStyle}
                    icon={<img src={value.startsWith('/chat') ? chatOnIcon : chatOffIcon} alt="채팅" />}
                />
                <BottomNavigationAction
                    value="/my"
                    sx={navActionStyle}
                    icon={<img src={value.startsWith('/my') ? myOnIcon : myOffIcon} alt="마이" />}
                />
            </BottomNavigation>
        </Paper>
    );
}