import './FixedStage.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import OnboardingIntro from './pages/Onboarding/Intro';
import OnboardingName from './pages/Onboarding/Name'
import OnboardingGender from './pages/Onboarding/Gender'
import OnboardingAge from './pages/Onboarding/Age'
import AddressSearch from './pages/Onboarding/AddressSearch'
import AddressMap from './pages/Onboarding/AddressMap'
import OnboardingOutro from './pages/Onboarding/Outro';
import SurveyIntro from './pages/Onboarding/SurveyIntro';
import Survey from './pages/Onboarding/Survey';
import SurveyOutro from './pages/Onboarding/SurveyOutro';

export default function App() {
    return (
        <div className="stage-outer">
            <div className="stage-inner">
                <div className="safe">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace/>}/>
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
                        <Route path="*" element={<div className="p-4">404</div>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}