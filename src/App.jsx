import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './FixedStage.css';

// 스크린샷에 맞는 정확한 경로로 수정
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Home/Home.jsx';
import NotificationPage from './pages/Home/NotificationPage.jsx';
import QuestListPage from './pages/Quests/QuestListPage.jsx';
import { initialQuests } from './pages/Quests/Quests.jsx';
import BottomNavBar from './components/NavBar.jsx';

// 페이지와 네비게이션 바를 함께 묶어서 관리하는 컴포넌트
function AppLayout() {
    const location = useLocation();
    // 로그인/회원가입 페이지에서는 네비게이션 바를 숨김
    const showNavBar = location.pathname !== '/login' && location.pathname !== '/signup';
    // 현재 경로가 '/quests'인지 정확하게 확인
    const isQuestPage = location.pathname === '/quests';

    return (
        <>
            <AnimatedRoutes />
            {showNavBar && <BottomNavBar variant={isQuestPage ? 'quest' : 'default'} />}
        </>
    );
}

// 페이지 전환 및 상태 관리를 담당하는 컴포넌트
function AnimatedRoutes() {
    const location = useLocation();
    const [majorLevel, setMajorLevel] = useState(1);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [quests, setQuests] = useState(initialQuests);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* 1. 기본 경로('/')를 로그인 페이지로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* 2. 홈 화면 경로는 '/home'으로 명확히 지정 */}
                <Route
                    path="/home"
                    element={
                        <Home
                            majorLevel={majorLevel} setMajorLevel={setMajorLevel}
                            currentSteps={currentSteps} setCurrentSteps={setCurrentSteps}
                            quests={quests} setQuests={setQuests}
                        />
                    }
                />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route
                    path="/quests"
                    element={ <QuestListPage quests={quests} setQuests={setQuests} majorLevel={majorLevel} /> }
                />
                <Route path="*" element={<div className="p-4 text-white">페이지를 찾을 수 없습니다.</div>} />
            </Routes>
        </AnimatePresence>
    );
}

// 앱의 최종 진입점
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