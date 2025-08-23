// import React, { useState, useEffect } from 'react'; // ✅ useEffect를 import합니다.
// import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';

// import './FixedStage.css';

// import Login from './pages/Auth/Login.jsx';
// import Signup from './pages/Auth/Signup.jsx';
// import Home from './pages/Home/Home.jsx';
// import NotificationPage from './pages/Home/NotificationPage.jsx';
// import QuestListPage from './pages/Quests/QuestListPage.jsx';
// import { initialQuests } from './pages/Quests/Quests.jsx';
// import BottomNavBar from './components/NavBar.jsx';
// import QuestDetailPage_1_5 from './pages/Quests/QuestDetails/1-5.jsx';
// import QuestDetailPage_1_7 from './pages/Quests/QuestDetails/1-7.jsx';
// import QuestDetailPage_3_7 from './pages/Quests/QuestDetails/3-7.jsx';
// import ChatPage_3_7 from './pages/Quests/QuestDetails/Chat_3-7.jsx';
// import QuestClearPage from './pages/Quests/QuestClearPage05.jsx';
// import Chat from './pages/Chat/Chat.jsx';
// import RecordPage from './pages/Records/Records.jsx';
// import MyPage from './pages/My/MyPage.jsx';
// function AppLayout() {
//     const location = useLocation();
//     const showNavBar = location.pathname !== '/login' && location.pathname !== '/signup';
//     const useDarkNavBar = location.pathname.startsWith('/quests') || location.pathname === '/notifications';

//     return (
//         <>
//             <AnimatedRoutes />
//             {showNavBar && <BottomNavBar variant={useDarkNavBar ? 'quest' : 'default'} />}
//         </>
//     );
// }

// function AnimatedRoutes() {
//     const location = useLocation();
//     const [majorLevel, setMajorLevel] = useState(1);
//     const [currentSteps, setCurrentSteps] = useState(0);
//     const [quests, setQuests] = useState(initialQuests);
//     const [selectedStep, setSelectedStep] = useState(1);

//     // ✅ --- 추가된 부분 ---
//     // selectedStep 상태가 변경될 때마다 실행되는 useEffect 훅입니다.
//     useEffect(() => {
//         // 선택된 스텝 번호를 기준으로 majorLevel을 계산합니다.
//         // 예: 1~10번 스텝 -> 레벨 1, 11~20번 스텝 -> 레벨 2
//         const newMajorLevel = Math.floor((selectedStep - 1) / 10) + 1;
        
//         // 계산된 레벨이 현재 레벨과 다를 경우에만 상태를 업데이트합니다.
//         if (newMajorLevel !== majorLevel) {
//             setMajorLevel(newMajorLevel);
//         }
//     }, [selectedStep]); // selectedStep이 변경될 때마다 이 훅을 실행합니다.
//     // ✅ --- 여기까지 ---

//     return (
//         <AnimatePresence mode="wait">
//             <Routes location={location} key={location.pathname}>
//                 <Route path="/" element={<Navigate to="/quests" />} />
                
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />

//                 <Route
//                     path="/home"
//                     element={
//                         <Home
//                             majorLevel={majorLevel} setMajorLevel={setMajorLevel}
//                             currentSteps={currentSteps} setCurrentSteps={setCurrentSteps}
//                             quests={quests} setQuests={setQuests}
//                             selectedStep={selectedStep} setSelectedStep={setSelectedStep}
//                         />
//                     }
//                 />
//                 <Route path="/notifications" element={<NotificationPage />} />
//                 <Route
//                     path="/quests"
//                     element={
//                         <QuestListPage
//                             quests={quests} setQuests={setQuests}
//                             selectedStep={selectedStep} setSelectedStep={setSelectedStep}
//                         />
//                     }
//                 />
//                 <Route path="/records" element={<RecordPage />} />
//                 <Route path="/quests/5" element={<QuestDetailPage_1_5 />} />
//                 <Route path="/clear" element={<QuestClearPage />} />
//                 <Route path="/quests/1-7" element={<QuestDetailPage_1_7 />} />
//                 <Route path="/quests/3-7" element={<QuestDetailPage_3_7 />} />
//                 <Route path="/quests/3-7/chat" element={<ChatPage_3_7 />} />
//                 <Route path="/chat" element={<Chat />} />
//                 <Route path="*" element={<div className="p-4 text-white">페이지를 찾을 수 없습니다.</div>} />
//                 <Route path="/" element={<RecordPage />} />
//                 <Route path="/records" element={<MyPage />} /> 
//             </Routes>
//         </AnimatePresence>
//     );
// }

// export default function App() {
//     return (
//         <div className="stage-outer">
//             <div className="stage-inner">
//                 <div className="safe">
//                     <BrowserRouter>
//                         <AppLayout />
//                     </BrowserRouter>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
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
import Chat from './pages/Chat/Chat.jsx';

// ✅ '기록'과 '마이' 페이지를 각각 import 합니다.
import RecordPage from './pages/Records/Records.jsx';
import MyPage from './pages/My/MyPage.jsx'; 
import WalkMissionPage from './pages/SurpriseQuest.jsx';

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

function AnimatedRoutes() {
    const location = useLocation();
    const [majorLevel, setMajorLevel] = useState(1);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [quests, setQuests] = useState(initialQuests);
    const [selectedStep, setSelectedStep] = useState(1);

    useEffect(() => {
        const newMajorLevel = Math.floor((selectedStep - 1) / 10) + 1;
        if (newMajorLevel !== majorLevel) {
            setMajorLevel(newMajorLevel);
        }
    }, [selectedStep]);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* --- 기본 화면 및 로그인/가입 --- */}
                <Route path="/" element={<Navigate to="/quests" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* --- 네비게이션 바와 연결된 메인 페이지들 --- */}
                <Route path="/records" element={<RecordPage />} />
                <Route path="/quests" element={<QuestListPage quests={quests} setQuests={setQuests} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />} />
                <Route path="/home" element={<Home majorLevel={majorLevel} setMajorLevel={setMajorLevel} currentSteps={currentSteps} setCurrentSteps={setCurrentSteps} quests={quests} setQuests={setQuests} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/my" element={<MyPage />} />
                
                {/* --- 기타 상세 페이지들 --- */}
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/quests/5" element={<QuestDetailPage_1_5 />} />
                <Route path="/clear" element={<QuestClearPage />} />
                <Route path="/quests/1-7" element={<QuestDetailPage_1_7 />} />
                <Route path="/quests/3-7" element={<QuestDetailPage_3_7 />} />
                <Route path="/quests/3-7/chat" element={<ChatPage_3_7 />} />
                <Route path="/surprise-quest" element={<WalkMissionPage />} />
                {/* --- 일치하는 경로가 없을 때 --- */}
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