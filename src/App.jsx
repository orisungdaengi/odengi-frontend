import React, { useState, useEffect } from 'react';
import './FixedStage.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// auth 및 onboarding
import StartPage from './pages/Auth/Start';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OnboardingIntro from './pages/Onboarding/Intro';
import OnboardingName from './pages/Onboarding/Name';
import OnboardingGender from './pages/Onboarding/Gender';
import OnboardingAge from './pages/Onboarding/Age';
import AddressSearch from './pages/Onboarding/AddressSearch'
import AddressMap from './pages/Onboarding/AddressMap';
import OnboardingOutro from './pages/Onboarding/Outro';
import SurveyIntro from './pages/Onboarding/SurveyIntro';
import Survey from './pages/Onboarding/Survey';
import SurveyOutro from './pages/Onboarding/SurveyOutro';

// 메인 화면
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
import RecordPage from './pages/Records/Records.jsx';
import MyPage from './pages/My/MyPage.jsx'; 
import WalkMissionPage from './pages/SurpriseQuest.jsx';

function AppLayout() {
    const { pathname } = useLocation();
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, ""); // 끝 슬래시 제거: '/onboarding/' -> '/onboarding'

    // 항상 숨길 경로(정확 일치)
    const HIDE_EXACT = ["/", "/login", "/signup"];

    // 접두사로 숨길 경로
    const HIDE_PREFIX = [/^\/onboarding(\/|$)/];

    const showNavBar =
        !HIDE_EXACT.includes(path) &&
        !HIDE_PREFIX.some((re) => re.test(path));

    const useDarkNavBar =
        /^\/quests(\/|$)/.test(path) || path === "/notifications";


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

                {/* 기본 경로 */}
                <Route path="/" element={<StartPage />} />
                {/*<Route path="/" element={<Navigate to="/login" />} />*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/onboarding/intro" element={<OnboardingIntro />} />
                <Route path="/onboarding/name" element={<OnboardingName />} />
                <Route path="/onboarding/gender" element={<OnboardingGender />} />
                <Route path="/onboarding/age" element={<OnboardingAge />} />
                <Route path="/onboarding/address" element={<AddressSearch />} />
                <Route path="/onboarding/address-map" element={<AddressMap />} />
                <Route path="/onboarding/outro" element={<OnboardingOutro />} />
                <Route path="/onboarding/survey-intro" element={<SurveyIntro />} />
                <Route path="/onboarding/survey" element={<Survey />} />
                <Route path="/onboarding/survey-outro" element={<SurveyOutro />} />



                <Route path="/my" element={<MyPage />} />
                <Route path="/home"
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
                <Route path="/quests"
                    element={
                        <QuestListPage
                            quests={quests} setQuests={setQuests}
                            selectedStep={selectedStep} setSelectedStep={setSelectedStep} majorLevel={majorLevel} // ✅ 전달
                        />
                    }
                />

                <Route path="/quests/5" element={<QuestDetailPage_1_5 />} />
                <Route path="/clear" element={<QuestClearPage />} />
                <Route path="/quests/1-7" element={<QuestDetailPage_1_7 />} />
                <Route path="/quests/3-7" element={<QuestDetailPage_3_7 />} />
                <Route path="/quests/3-7/chat" element={<ChatPage_3_7 />} />

                <Route path="/surprise-quest" element={<WalkMissionPage />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/records" element={<RecordPage />} />
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
                    {/*<Routes>*/}
                    <AppLayout />
                        {/*<Route path="/" element={<Navigate to="/login" replace/>}/>*/}
                        {/*<Route path="/login" element={<Login/>}/>*/}
                        {/*<Route path="/signup" element={<Signup />} />*/}
                        {/*<Route path="/onboarding/intro" element={<OnboardingIntro />} />*/}
                        {/*<Route path="/onboarding/name" element={<OnboardingName />} />*/}
                        {/*<Route path="/onboarding/gender" element={<OnboardingGender />} />*/}
                        {/*<Route path="/onboarding/age" element={<OnboardingAge />} />*/}
                        {/*<Route path="/onboarding/address" element={<AddressSearch />} />*/}
                        {/*<Route path="/onboarding/address-map" element={<AddressMap />} />*/}
                        {/*<Route path="/onboarding/outro" element={<OnboardingOutro />} />*/}
                        {/*<Route path="/onboarding/survey-intro" element={<SurveyIntro />} />*/}
                        {/*<Route path="/onboarding/survey" element={<Survey />} />*/}
                        {/*<Route path="/onboarding/survey-outro" element={<SurveyOutro />} />*/}
                        {/*<Route path="*" element={<div className="p-4">404</div>} />*/}
                    {/*</Routes>*/}
                </div>
            </div>
        </div>

    );

}
