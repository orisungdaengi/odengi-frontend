import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pageVariants, pageTransition } from '../../../Animations.js';

const questBackground = '/images/Quests/QuestDetails/questbackImg.png';
const characterIcon = '/images/Homes/characterImg/charLv3.png';

const initialMessages = [
  { id: 1, sender: 'character', text: '안녕하세요 영찬님' },
  { id: 2, sender: 'character', text: '저에게 고민을 털어놓아봐요' },
];

const Chat_3_7 = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);
    const TOTAL_SECONDS = 300;
    const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
    const inputRef = useRef(null);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(focusTimeout);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;
        const userMessage = { id: Date.now(), sender: 'user', text: inputValue, };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        try {
            const response = await fetch('https://odengi-server.onrender.com/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ message: userMessage.text }),
            });
            if (!response.ok) { throw new Error('API 응답에 문제가 있습니다.'); }
            const responseData = await response.json();
            const botReplyText = responseData.data.response;
            const botResponse = { id: Date.now() + 1, sender: 'character', text: botReplyText, };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("채팅 API 연동 중 오류 발생:", error);
            const errorResponse = { id: Date.now() + 1, sender: 'character', text: '죄송해요, 지금은 답변을 드릴 수 없어요.', };
            setMessages(prev => [...prev, errorResponse]);
        }
    };

    return (
        <Box
            component={motion.div}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            sx={{
                position: 'absolute', width: '100%', height: '100%',
                backgroundImage: `url(${questBackground})`, backgroundSize: 'cover',
                color: 'white', display: 'flex', flexDirection: 'column',
            }}
        >
            <Box sx={{ p: 2, pt: 7, display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIosNew />
                </IconButton>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '6px 20px', borderRadius: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>
                <Box sx={{ width: 40 }} />
            </Box>

            {/* 채팅 영역 */}
            {/* --- ⬇️ 이 Box의 sx 속성을 수정했습니다 ⬇️ --- */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                // 1. 마지막 채팅이 잘리지 않도록 하단에 여백 추가
                pb: '70px',
                // 2. 스크롤바 숨기기
                '::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}>
            {/* --- ⬆️ 여기까지 수정! ⬆️ --- */}
                <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                    ── 3-7 퀘스트 ──
                </Typography>
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1.5, alignItems: 'flex-start' }}>
                        {msg.sender === 'character' && (
                            <Box component="img" src={characterIcon} sx={{ width: 32, height: 32, borderRadius: '50%', mr: 1 }} />
                        )}
                        <Box>
                            {msg.sender === 'character' && ( <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', ml: 1, mb: 0.5 }}>톡톡이</Typography> )}
                            <Typography sx={{ backgroundColor: msg.sender === 'user' ? '#555' : '#333', padding: '10px 14px', borderRadius: '16px', maxWidth: '250px', wordBreak: 'break-word' }}>
                                {msg.text}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={chatEndRef} />
            </Box>

            {/* 하단 입력창 */}
            <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.3)', position: 'sticky', bottom: 70}}>
                <TextField inputRef={inputRef} fullWidth variant="outlined" placeholder="답장하기" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'rgba(45, 45, 45, 0.9)', borderRadius: '25px', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'gray' }, '&.Mui-focused fieldset': { borderColor: 'white' }, }, '& .MuiOutlinedInput-input': { color: 'white', }, }}
                    InputProps={{ endAdornment: ( <InputAdornment position="end"> <IconButton onClick={handleSendMessage} sx={{ color: 'white' }}> <Send /> </IconButton> </InputAdornment> ), }}
                />
            </Box>
        </Box>
    );
};

export default Chat_3_7;