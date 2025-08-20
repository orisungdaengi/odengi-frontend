import './FixedStage.css'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

import React, { useState } from 'react'; // ✨ 1. useState를 import 합니다.
import { BrowserRouter, Routes, Route, useLocation,Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 페이지 및 데이터 import
import Home from './pages/Home/Home.jsx';
import NotificationPage from './pages/Home/NotificationPage.jsx';
import { initialQuests } from './pages/Quests/Quests.jsx'; // ✨ 2. 퀘스트 초기 데이터도 가져옵니다.

function AppContent() {
    const location = useLocation();

    // ✨ 3. Home 컴포넌트가 가지고 있던 상태들을 모두 AppContent로 가져옵니다.
    // 이제 이 상태들은 페이지가 전환되어도 절대 사라지지 않습니다.
    const [majorLevel, setMajorLevel] = useState(1);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [quests, setQuests] = useState(initialQuests);

    return (
        <div className="App">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/notifications" element={<NotificationPage />} />
                    {/* ✨ 4. Home 컴포넌트에 상태와 상태 변경 함수들을 props로 전달합니다. */}
                    <Route 
                        path="/*" 
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
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default function App() {
    return (
        <div className="stage-outer">
            <div className="stage-inner">
                <div className="safe">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<div className="p-4">404</div>} />
                    </Routes>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
}