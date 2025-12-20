import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await register(form.name, form.email, form.phone, form.password);
            setForm({ name: "", email: "", phone: "", password: "" });
            navigate("/"); // redirect to dashboard
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="p-2 border rounded w-full" />
                <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="p-2 border rounded w-full" />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="p-2 border rounded w-full" />
                <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required className="p-2 border rounded w-full" />
                <button disabled={loading} className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600 disabled:opacity-50">
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
