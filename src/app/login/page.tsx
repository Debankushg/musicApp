"use client"
import { NextApiRequest, NextApiResponse } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const dummyToken = 'dummyToken1234567890';
        if (username === 'admin' && password === 'admin') {
            Cookies.set('token', dummyToken, { expires: 7 });
            router.push('/dashboard');
        } else {
            console.log('Invalid credentials');
        }

        // Create a dummy token
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="#" className="text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
