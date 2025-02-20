import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center text-white text-lg">
                <p>Загрузка: {Math.round(progress)}%</p>
                <div className="w-40 h-2 bg-gray-700 mt-2 rounded-lg overflow-hidden">
                    <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </Html>
    );
};

export default Loader;
