import './FixedStage.css'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 페이지 및 데이터 import
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home.jsx';
import NotificationPage from './pages/Home/NotificationPage.jsx';
import { initialQuests } from './pages/Quests/Quests.jsx';

// 애니메이션과 라우팅을 함께 처리하는 컴포넌트
function AnimatedRoutes() {
    const location = useLocation();

    // Home 컴포넌트의 상태는 여기서 관리해야 페이지가 전환되어도 유지됩니다.
    const [majorLevel, setMajorLevel] = useState(1);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [quests, setQuests] = useState(initialQuests);

    return (
        <AnimatePresence mode="wait">
            {/* 모든 경로를 하나의 Routes 안에서 관리합니다. */}
            <Routes location={location} key={location.pathname}>
                {/* 인증 관련 페이지 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* 메인 앱 페이지 */}
                <Route 
                    path="/" 
                    element={
                        <Home 
                            majorLevel={majorLevel}
                            setMajorLevel={setMajorLevel}
                            currentSteps={currentSteps}
                            setCurrentSteps={setCurrentSteps}
                            quests={quests}
                            setQuests={setQuests}
                        />
                    } 
                />
                <Route path="/notifications" element={<NotificationPage />} />

                {/* 일치하는 경로가 없을 때 (404 Not Found) */}
                <Route path="*" element={<div className="p-4 text-white">페이지를 찾을 수 없습니다.</div>} />
            </Routes>
        </AnimatePresence>
    );
}

// App 컴포넌트는 전체적인 레이아웃과 라우터 설정을 담당합니다.
export default function App() {
    return (
        <div className="stage-outer">
            <div className="stage-inner">
                <div className="safe">
                    {/* 라우터는 여기서 단 한 번만 선언합니다. */}
                    <BrowserRouter>
                        <AnimatedRoutes />
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}