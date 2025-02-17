import React from 'react';

const Button = ({fn, color, bgColor, children}) => {
    return (
        <button
            onClick={fn}
            className={`${bgColor ? ' hover:translate-y-[1px]' : '' } ${color} ${bgColor}  cursor-pointer transition-all   px-2 my-2 py-1 rounded text-lg font-semibold`}
        >
            {children}
        </button>
    );
};

export default Button;