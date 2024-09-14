
"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Get the token from cookies only on the client side
        const savedToken = Cookies.get('token');
        setToken(savedToken || null);
    }, []);
    const handleLogin = () => {
        router.push('/login');
    };


    const handleLogout = () => {
        Cookies.remove('token');
        setToken(null);
        router.push('/');
    }

    return (
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
                <Image width={40} height={40} src="/musicLogo.jpg" alt="Logo" className="w-10 h-10 mr-2" />
                <h1 className="text-xl font-semibold">MyApp</h1>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-4">
                <Link href="/" passHref>
                    <span className="hover:underline">Home</span>
                </Link>
                <Link href="/about" passHref>
                    <span className="hover:underline">About</span>
                </Link>
            </nav>

            {/* Login Button */}
            {!token ? (<button
                onClick={handleLogin}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Login
            </button>) : (
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Logout
                </button>
            )

            }
        </header>
    );
};

export default Header;
