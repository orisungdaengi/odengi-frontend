import './FixedStage.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

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
                </div>
            </div>
        </div>
    )
}