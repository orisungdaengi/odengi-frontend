import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './FixedStage.css';

import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Home/Home.jsx';
import NotificationPage from './pages/Home/NotificationPage.jsx';
import QuestListPage from './pages/Quests/QuestListPage.jsx';
import { initialQuests } from './pages/Quests/Quests.jsx';
import BottomNavBar from './components/NavBar.jsx';
import QuestDetailPage_1_5 from './pages/Quests/QuestDetails/1-5.jsx';
import QuestDetailPage_1_7 from './pages/Quests/QuestDetails/1-7.jsx';
import QuestDetailPage_3_7 from './pages/Quests/QuestDetails/3-7.jsx';
import ChatPage_3_7 from './pages/Quests/QuestDetails/Chat_3-7.jsx';
import QuestClearPage from './pages/Quests/QuestClearPage05.jsx';
import Chat from './pages/Chat/Chat.jsx'; // ✨ 1. 새로 만드신 Chat.jsx를 import 합니다.


function AppLayout() {
    const location = useLocation();
    const showNavBar = location.pathname !== '/login' && location.pathname !== '/signup';
    const useDarkNavBar = location.pathname.startsWith('/quests') || location.pathname === '/notifications';

    return (
        <>
            <AnimatedRoutes />
            {showNavBar && <BottomNavBar variant={useDarkNavBar ? 'quest' : 'default'} />}
        </>
    );
}

// App.jsx 파일의 AnimatedRoutes 함수를 아래 코드로 교체하세요.

function AnimatedRoutes() {
    const location = useLocation();
    const [majorLevel, setMajorLevel] = useState(1);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [quests, setQuests] = useState(initialQuests);

    // ✅ 선택된 퀘스트 상태 추가
    const [selectedStep, setSelectedStep] = useState(1);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* 변경점: 기본 경로 '/'로 접속 시 '/quests' 페이지로 즉시 이동(Navigate)하도록 수정했습니다.
                */}
                <Route path="/" element={<Navigate to="/quests" />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/home"
                    element={
                        <Home
                            majorLevel={majorLevel} setMajorLevel={setMajorLevel}
                            currentSteps={currentSteps} setCurrentSteps={setCurrentSteps}
                            quests={quests} setQuests={setQuests}
                            selectedStep={selectedStep} setSelectedStep={setSelectedStep}  // ✅ 전달
                        />
                    }
                />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route
                    path="/quests"
                    element={
                        <QuestListPage
                            quests={quests} setQuests={setQuests}
                            selectedStep={selectedStep} setSelectedStep={setSelectedStep}  // ✅ 전달
                        />
                    }
                />
                <Route path="/quests/5" element={<QuestDetailPage_1_5 />} />
                <Route path="/clear" element={<QuestClearPage />} />
                <Route path="/quests/1-7" element={<QuestDetailPage_1_7 />} />
                <Route path="/quests/3-7" element={<QuestDetailPage_3_7 />} />
                <Route path="/quests/3-7/chat" element={<ChatPage_3_7 />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<div className="p-4 text-white">페이지를 찾을 수 없습니다.</div>} />

            </Routes>
        </AnimatePresence>
    );
}
export default function App() {
    return (
        <div className="stage-outer">
            <div className="stage-inner">
                <div className="safe">
                    <BrowserRouter>
                        <AppLayout />
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}
