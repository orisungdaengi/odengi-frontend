// src/state/OnboardingContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const KEY = "onboarding.v1";
const OnboardingCtx = createContext(null);

const initial = {
    user_id: "",
    password: "",
    name: "",
    email: "default@example.com",
    birth: "",
    gender: "",
    stress_score: "30",
};

export function OnboardingProvider({ children }) {
    const [data, setData] = useState(initial);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) setData((d) => ({ ...d, ...JSON.parse(raw) }));
        } catch {}
    }, []);
    useEffect(() => {
        try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
    }, [data]);

    const update = (patch) => setData((d) => ({ ...d, ...patch }));
    const reset  = () => { setData(initial); localStorage.removeItem(KEY); };

    return (
        <OnboardingCtx.Provider value={{ data, update, reset }}>
            {children}
        </OnboardingCtx.Provider>
    );
}

export const useOnboarding = () => useContext(OnboardingCtx);
