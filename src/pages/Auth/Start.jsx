// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StartPage() {
    const navigate = useNavigate();
    const goLogin = () => navigate("/login", { replace: true });

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={goLogin}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goLogin();
                }
            }}
            className="relative h-full w-full bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)] overflow-hidden text-white cursor-pointer select-none"
        >
            {/* 본문 */}
            <div className="px-6 pb-8 pt-4 flex flex-col items-center">
                {/* 캐릭터 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 2.5, ease: "easeOut" }}
                    className="w-[290px] h-[272px] object-contain mt-[270px] mr-[10px]"
                >
                    <img src="/images/signup/character.png" alt="" />
                </motion.div>

                {/* 타이틀 / 서브텍스트 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 2.5, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-[490px] text-center"
                >
                    <div className="text-[60px] font-semibold font-['Pretendard'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                        툭툭
                    </div>
                </motion.div>


            </div>
        </div>
    );
}
