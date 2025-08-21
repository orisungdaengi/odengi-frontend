import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// 아이콘 이미지 import
import recordOffIcon from './기록off.png';
import recordOnIcon from './기록on.png';
import questOffIcon from './퀘스트off.png';
import questOnIcon from './퀘스트on.png';
import homeOffIcon from './홈off.png';
import homeOnIcon from './홈on.png';
import chatOffIcon from './채팅off.png';
import chatOnIcon from './채팅on.png';
import myOffIcon from './마이off.png';
import myOnIcon from './마이on.png';

const navActionStyle = {
  padding: '6px 0',
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

  const backgroundColor = variant === 'quest' ? '#1A2E35' : 'transparent';

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: backgroundColor,
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
          icon={<img src={value === '/quests' ? questOnIcon : questOffIcon} alt="퀘스트" />}
        />
        <BottomNavigationAction
          value="/home"
          sx={navActionStyle}
          icon={<img src={value === '/home' ? homeOnIcon : homeOffIcon} alt="홈" />}
        />
        <BottomNavigationAction
          value="/chat"
          sx={navActionStyle}
          icon={<img src={value === '/chat' ? chatOnIcon : chatOffIcon} alt="채팅" />}
        />
        <BottomNavigationAction
          value="/my"
          sx={navActionStyle}
          icon={<img src={value === '/my' ? myOnIcon : myOffIcon} alt="마이" />}
        />
      </BottomNavigation>
    </Paper>
  );
}