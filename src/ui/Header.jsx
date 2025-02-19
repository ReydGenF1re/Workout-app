import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="mx-auto">
            <div className="flex justify-between items-center py-4 px-6">
                <button
                    className="md:hidden text-2xl"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
                <nav className="hidden md:block">
                    <ul className="flex gap-6 text-xl">
                        <li><NavLink className="nav-link" to="/exercises">Упражнения</NavLink></li>
                        <li><NavLink className="nav-link" to="/builder">Тренировки</NavLink></li>
                        <li><NavLink className="nav-link" to="/character">Персонаж</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <button
                    className="absolute top-4 right-4 text-2xl"
                    onClick={toggleSidebar}
                >
                    ✕
                </button>
                <nav className="mt-16">
                    <ul className="flex flex-col text-xl gap-6">
                        <li><NavLink className="nav-link block py-2 px-6" to="/exercises" onClick={toggleSidebar}>Упражнения</NavLink></li>
                        <li><NavLink className="nav-link block py-2 px-6" to="/builder" onClick={toggleSidebar}>Тренировки</NavLink></li>
                        <li><NavLink className="nav-link block py-2 px-6" to="/character" onClick={toggleSidebar}>Бобрище</NavLink></li>
                    </ul>
                </nav>
            </div>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={toggleSidebar}></div>
            )}
        </header>
    );
};

export default Header;
