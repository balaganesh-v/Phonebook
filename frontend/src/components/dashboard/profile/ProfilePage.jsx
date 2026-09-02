import React from 'react'
import { useAuth } from '../../../hooks/useAuth.js'

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) return <p className="text-white text-center">Loading...</p>;

    return (
        <div className="flex flex-col items-center gap-4 text-white min-h-screen justify-center items-center h-screen">

            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-bold">Profile</h1>

            <div className="flex flex-col gap-2 text-lg bg-slate-700 p-6 rounded-xl w-100">
                <p><span className="text-slate-400">Name:</span> {user.name}</p>
                <p><span className="text-slate-400">Email:</span> {user.email}</p>
                <p><span className="text-slate-400">Phone:</span> {user.phone}</p>
            </div>

            <button
                onClick={logout}
                className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-semibold"
            >
                Logout
            </button>

        </div>
    )
}

export default ProfilePage;