import React from 'react';

const Button = ({fn, color, children}) => {
    return (
        <button
            onClick={fn}
            className={`bg-${color}-500 hover:bg-${color}-600 hover:translate-y-[1px] transition-all text-white px-2 py-1 rounded`}
        >
            {children}
        </button>
    );
};

export default Button;