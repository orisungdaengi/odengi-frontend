import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, pageTransition } from '../../Animations.js';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://odengi-server.onrender.com',
  headers: { Accept: 'application/json' },
});

const HARD_TITLE = '새싹 점검';
const HARD_CONTENT = '오늘 날씨 좋은데 산책 어때?';

const formatRelative = (date) => {
  if (!date) return '';
  const now = new Date();
  const diffMs = now - date;
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  if (sec < 60) return '방금 전';
  if (min < 60) return `${min}분 전`;
  if (hour < 24) return `${hour}시간 전`;
  if (day === 1) return '어제';
  return `${day}일 전`;
};

const NotificationItem = ({ item, onDelete, onMarkRead }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}
    >
      <Box
          onClick={() => onMarkRead?.(item.id)}
          sx={{ display: 'flex', alignItems: 'center', p: '12px 16px', gap: 2, cursor: 'pointer' }}
      >
        <Box sx={{ width: 16, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!item.isRead && (
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6347' }} />
          )}
        </Box>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'grey.700', flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>{item.message}</Typography>
          <Typography variant="caption" sx={{ color: 'grey.500' }}>{item.time}</Typography>
        </Box>
        <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            sx={{ color: 'grey.400' }}
        >
          ✕
        </IconButton>
      </Box>
    </motion.div>
);

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({ today: [], last7Days: [] });
  const [loading, setLoading] = useState(false);

  const USER_ID = 19;

  const normalize = (p) => {
    const createdAt = p.created_at || p.sent_at ? new Date(p.created_at || p.sent_at) : null;
    return {
      id: p.id,
      message: p.content ?? p.message ?? '',
      isRead: !!p.is_read,
      createdAt,
      time: formatRelative(createdAt),
      raw: p,
    };
  };

  const splitByDate = (items) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const today = [];
    const last7Days = [];
    for (const it of items) {
      const t = it.createdAt;
      if (t && t >= startOfToday) today.push(it);
      else if (t && t >= sevenDaysAgo) last7Days.push(it);
      else last7Days.push(it);
    }
    return { today, last7Days };
  };

  const createHardcodedNotification = useCallback(async () => {
    try {
      const all = [...(notifications.today || []), ...(notifications.last7Days || [])];
      if (all.some(n => n.message === HARD_CONTENT)) return;
      const res = await api.post('/push/create', {
        content: HARD_CONTENT,
        is_read: false,
        title: HARD_TITLE,
        user_id: USER_ID,
      }, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      const p = res.data?.data;
      if (!p) return;
      const item = normalize({ ...p, created_at: p.sent_at || p.created_at });
      setNotifications(curr => ({ ...curr, today: [item, ...(curr.today || [])] }));
    } catch (e) {
      console.error('하드코딩 알림 생성 실패:', e);
    }
  }, [USER_ID, notifications.today, notifications.last7Days]);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/push/user/${USER_ID}`, { headers: { Accept: 'application/json' } });
      const list = (res.data?.data ?? []).map(normalize);
      setNotifications(splitByDate(list));
      await createHardcodedNotification();
    } catch (e) {
      console.error('알림 가져오기 실패:', e);
    } finally {
      setLoading(false);
    }
  }, [USER_ID, createHardcodedNotification]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleDeleteNotification = async (id) => {
    const prev = notifications;
    setNotifications(curr => ({
      today: curr.today.filter(i => i.id !== id),
      last7Days: curr.last7Days.filter(i => i.id !== id),
    }));
    try {
      await api.delete(`/push/${id}`, { headers: { Accept: 'application/json' } });
    } catch (e) {
      console.error('알림 삭제 실패:', e);
      setNotifications(prev);
    }
  };

  const handleMarkRead = async (id) => {
    setNotifications(curr => ({
      today: curr.today.map(i => (i.id === id ? { ...i, isRead: true } : i)),
      last7Days: curr.last7Days.map(i => (i.id === id ? { ...i, isRead: true } : i)),
    }));
    try {
      await api.put(`/push/${id}`, null, { headers: { Accept: 'application/json' } });
    } catch (e) {
      console.error('읽음 처리 실패:', e);
      loadNotifications();
    }
  };

  const allItems = [...(notifications.today || []), ...(notifications.last7Days || [])]
      .sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));

  return (
      <Box
          component={motion.div}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          sx={{ position: 'absolute', width: '100%', minHeight: '100vh', backgroundColor: '#121212', color: 'white', display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pt: 7, position: 'fixed', width: '100%', backgroundColor: '#121212', zIndex: 10 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', position: 'absolute', left: 16 }}>
            <ArrowBackIosNew />
          </IconButton>
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>알림</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, px: 2, pt: '90px', pb: '72px' }}>
          <Box sx={{ backgroundColor: '#2E2E2E', borderRadius: '16px', overflow: 'hidden' }}>
            <AnimatePresence>
              {allItems.map((item) => (
                  <NotificationItem
                      key={item.id}
                      item={item}
                      onDelete={handleDeleteNotification}
                      onMarkRead={handleMarkRead}
                  />
              ))}
              {!loading && allItems.length === 0 && (
                  <Box sx={{ p: 2, color: 'grey.400' }}>알림이 없습니다.</Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
  );
};

export default NotificationPage;
