import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotificationIcon = ({ hasUnread }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/notifications'); // 클릭 시 /notifications 페이지로 이동
  };

  return (
    <IconButton sx={{ color: 'white' }} onClick={handleClick}>
      <Badge color="error" variant="dot" invisible={!hasUnread}>
        <Notifications />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;