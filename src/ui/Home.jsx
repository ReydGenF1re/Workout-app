import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import HomeForm from "./HomeForm.jsx";


const Home = () => {
    const [showH2, setShowH2] = useState(false);
    const [showH1, setShowH1] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const timer1 = setTimeout(() => setShowH2(true), 1000);
        const timer2 = setTimeout(() => setShowH1(true), 2000);
        const timer3 = setTimeout(() => setShowButton(true), 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const handleSubmit = (e) => {
        localStorage.setItem('weight', e.weight)
        localStorage.setItem('height', e.height)
        navigate('/exercises')
    };

    return (
        <main className="relative h-screen overflow-hidden">
            <div className="flex h-full">
                <img className="w-1/2 object-cover" src="/images/homepage_man.jpg" alt="Man in a gym"/>
                <img className="w-1/2 object-cover" src="/images/homepage_woman.jpg" alt="Woman in a gym"/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-opacity-50 p-6 rounded tracking-tighter ">
                    <div className="text-2xl mb-9 p-5 ">
                        <h2 className={`font-xl text-5xl text-white transition-opacity duration-500 ${showH2 ? 'opacity-100' : 'opacity-0'}`}>Это
                            не просто фитнес</h2><br/>
                        <h1 className={` [text-shadow:_0_1px_5px_#ff007c] uppercase text-7xl text-fuchsia-500 font-bold drop-shadow-lg transition-opacity duration-500 ${showH1 ? 'opacity-100' : 'opacity-0'}`}>Это
                            - образ жизни</h1>
                    </div>
                    {!showForm ? (
                        <button onClick={() => setShowForm(true)}
                                className={` px-6 hover:bg-white hover:text-black py-4 bg-black border-2 border-white text-white text-3xl cursor-pointer transition-all duration-500 ${showButton ? 'opacity-100' : 'opacity-0'} `}>Начать</button>
                    ) : (
                        <HomeForm onSubmit={handleSubmit}/>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
