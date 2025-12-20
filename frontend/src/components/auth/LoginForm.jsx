import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ phone: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.phone, form.password);
            navigate("/"); // redirect to dashboard
        } catch {}
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-3">
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded w-full"
                />
                <button className="bg-blue-600 text-white py-2 rounded w-full">
                    Login
                </button>
            </form>

            <p className="mt-4 text-sm">
                Don’t have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
