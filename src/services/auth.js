// import api from "../lib/api";

export async function loginApi({ user_id, password }) {
    try {
        console.log("[loginApi] 요청 payload:", {user_id, password});

        const response = await fetch("https://odengi-server.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id, password}),
        });

        console.log("[loginApi] raw response:", response);

        if (!response.ok) {
            throw new Error(`로그인 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log("[loginApi] parsed response data:", data);

        const user = data?.data;
        if (!user?.id) {
            throw new Error("로그인 응답에 id가 없어요");
        }

        return {userId: user.id, user};
    } catch (error) {
        console.error("[loginApi] 에러 발생:", error);
        throw error;
    }
}

export async function signupApi(payload) {
    const response = await fetch("https://odengi-server.onrender.com/user/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("회원가입 요청 실패");
    }

    return await response.json();
}
