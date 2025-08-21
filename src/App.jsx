import './FixedStage.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// pages
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home.jsx'
import NotificationPage from './pages/Home/NotificationPage.jsx'
import { initialQuests } from './pages/Quests/Quests.jsx'

// 라우트 + 애니메이션 + 전역 상태
function AnimatedRoutes() {
    const location = useLocation()

    // Home에서 쓰는 상태를 여기로 올림(페이지 전환돼도 유지)
    const [majorLevel, setMajorLevel] = useState(1)
    const [currentSteps, setCurrentSteps] = useState(0)
    const [quests, setQuests] = useState(initialQuests)

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* A) 첫 진입을 로그인으로 보내고 싶다면 ↓ */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* 메인 앱 */}
                <Route
                    path="/home/*"
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

                {/* 404 */}
                <Route path="*" element={<div className="p-4 text-white">페이지를 찾을 수 없습니다.</div>} />
            </Routes>
        </AnimatePresence>
    )
}

export default function App() {
    return (
        <div className="stage-outer">
            <div className="stage-inner">
                <div className="safe">
                    <AnimatedRoutes />
                </div>
            </div>
        </div>
    )
}
