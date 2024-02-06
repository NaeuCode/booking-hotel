import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("user@gmail.com");
    const [password, setPassword] = useState("1234");
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) login(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true });
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-96 my-8 mx-auto border-solid border-[1px] border-slate-300 rounded-2xl p-4">
            <h2 className="font-black text-2xl mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="relative mb-4">
                <div>
                    <label
                        className="block mb-1"
                        htmlFor="email">Email</label>
                    <input
                        className="w-full border-[1px] border-solid border-slate-400 rounded-lg p-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        id="email"
                    />
                </div>
                <div>
                    <label
                        className="block mb-1"
                        htmlFor="password">Password</label>
                    <input
                        className="w-full border-[1px] border-solid border-slate-400 rounded-lg p-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="w-full text-sm p-1 rounded-lg bg-red-900 text-white mt-4">Login</button>
                </div>
            </form>
        </div>
    );
}
export default Login;
