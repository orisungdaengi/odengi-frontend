import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// 💡 [필수] framer-motion 라이브러리에서 애니메이션을 위한 핵심 컴포넌트들을 가져옵니다.
// motion: HTML 태그를 애니메이션 가능한 컴포넌트로 만들어줍니다. (예: motion.div)
// AnimatePresence: 컴포넌트가 DOM에서 사라질 때 애니메이션 효과를 줄 수 있게 해줍니다. (삭제 효과의 핵심!)
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, pageTransition } from '../../Animations.js'; 

import { notificationData } from '../../components/notificationData.jsx';
import BottomNavBar from '../../components/NavBar.jsx';



// --- 개별 알림 항목 컴포넌트 ---
// 💡 [필수] 이 컴포넌트를 페이지 컴포넌트(NotificationPage) 밖으로 분리하면,
// 페이지 상태가 변경될 때마다 불필요하게 다시 렌더링되는 것을 막아 성능을 최적화할 수 있습니다.
const NotificationItem = ({ item, onDelete }) => (
  // 💡 [필수] motion.div는 애니메이션이 적용될 실제 DOM 요소입니다.
  // AnimatePresence 내부에 있으므로, 이 컴포넌트가 목록에서 제거될 때 exit 애니메이션이 실행됩니다.
  <motion.div
    layout // ✨ [핵심] 이 속성 하나만으로 아이템이 사라질 때 나머지 아이템들이 자신의 위치로 부드럽게 이동하는 애니메이션이 자동으로 적용됩니다.
    initial={{ opacity: 0, y: -20 }} // 처음 나타날 때: 위쪽에서 투명하게 시작
    animate={{ opacity: 1, y: 0 }}   // 나타난 후: 제자리에서 불투명하게
    exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }} // 사라질 때: 왼쪽으로 50px 이동하며 투명하게
    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}
  >
    <Box 
      onClick={onDelete} // 💡 부모로부터 전달받은 onDelete 함수를 클릭 이벤트에 연결합니다.
      sx={{ display: 'flex', alignItems: 'center', p: '12px 16px', gap: 2, cursor: 'pointer' }}
    >
      {/* ... 알림 아이템의 내부 UI ... */}
      <Box sx={{ width: 16, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!item.isRead && (<Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6347' }} />)}
      </Box>
      <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'grey.700', flexShrink: 0 }}/>
      <Box>
        <Typography variant="body2" sx={{ color: 'white' }}>{item.message}</Typography>
        <Typography variant="caption" sx={{ color: 'grey.500' }}>{item.time}</Typography>
      </Box>
    </Box>
  </motion.div>
);


// --- 알림 페이지 전체 컴포넌트 ---
const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationData);

  // '읽음' 처리 로직 (이전과 동일)
  useEffect(() => {
    const timer = setTimeout(() => {
      const markAsRead = (items) => items.map(item => ({ ...item, isRead: true }));
      setNotifications({
        today: markAsRead(notifications.today),
        last7Days: markAsRead(notifications.last7Days),
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 💡 [필수] 알림을 삭제하는 함수입니다.
  // id와 category(today/last7Days)를 받아 해당하는 아이템을 배열에서 걸러내고(filter) 상태를 업데이트합니다.
  const handleDeleteNotification = (id, category) => {
    setNotifications(currentNotifications => ({
      ...currentNotifications,
      [category]: currentNotifications[category].filter(item => item.id !== id),
    }));
  };

  return (
    // 💡 [필수] 페이지 전체에 슬라이드 애니메이션을 적용합니다.
    <Box
      component={motion.div}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      sx={{ position: 'absolute', width: '100%', minHeight: '100vh', backgroundColor: '#121212', color: 'white', display: 'flex', flexDirection: 'column' }}
    >
      {/* ... 헤더 UI ... */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pt: 7, position: 'fixed', width: '100%', backgroundColor: '#121212', zIndex: 10 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', position: 'absolute', left: 16 }}><ArrowBackIosNew /></IconButton>
        <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>알림</Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, px: 2, pt: '90px', pb: '72px' }}>
        <Typography variant="h6" sx={{ mb: 1, pt:4}}>오늘</Typography>
        <Box sx={{ backgroundColor: '#2E2E2E', borderRadius: '16px', mb: 4, overflow: 'hidden' }}>
          {/* ✨ [핵심] AnimatePresence로 리스트를 감싸야만, 리스트 아이템이 배열에서 제거될 때 exit 애니메이션이 작동합니다. */}
          <AnimatePresence>
            {notifications.today.map(item => (
              <NotificationItem
                key={item.id} // 💡 [필수] React가 각 아이템을 구별하고 애니메이션을 정확히 적용하기 위해 고유한 key가 반드시 필요합니다.
                item={item}
                onDelete={() => handleDeleteNotification(item.id, 'today')} // 💡 삭제 함수를 props로 전달합니다.
              />
            ))}
          </AnimatePresence>
        </Box>
        
        <Typography variant="h6" sx={{ mb: 1 }}>지난 7일간</Typography>
        <Box sx={{ backgroundColor: '#2E2E2E', borderRadius: '16px', overflow: 'hidden' }}>
          <AnimatePresence>
            {notifications.last7Days.map(item => (
              <NotificationItem
                key={item.id}
                item={item}
                onDelete={() => handleDeleteNotification(item.id, 'last7Days')}
              />
            ))}
          </AnimatePresence>
        </Box>
      </Box>
      <BottomNavBar />
    </Box>
  );
};

export default NotificationPage;
