// src/state/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const Ctx = createContext(null);
export const useUser = () => useContext(Ctx);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);  // {id, name, user_id, ...}
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = Number(localStorage.getItem("userId"));
        if (!id) { setLoading(false); return; }
        (async () => {
            try {
                const { data } = await api.get(`/user/${id}`);
                setUser(data?.data ?? null);
            } finally { setLoading(false); }
        })();
    }, []);

    return <Ctx.Provider value={{ user, setUser, loading }}>{children}</Ctx.Provider>;
}
