import api from "../lib/api";

export async function loginApi({ user_id, password }) {
    const res = await api.post("/user/login", { user_id, password });
    const user = res?.data?.data;
    console.log("[loginApi] status:", res?.status, "data:", res?.data);
    if (!user?.id) throw new Error("로그인 응답에 id가 없어요");
    return { userId: user.id, user };
}

export async function signupApi(payload) {
    const { data } = await api.post("/user/create", payload);
    return data;
}
