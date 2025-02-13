import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={' mx-auto'}>
            <ul className={'flex gap-6 text-xl py-6'}>
                <li>
                    <NavLink className={'nav-link'} to={"/exercises"}>Упражнения</NavLink>
                </li>
                <li>
                    <NavLink className={'nav-link'} to={"/builder"}>Тренировки</NavLink>
                </li>
                <li>
                    <NavLink className={'nav-link'} to={'/character'}>Бобрище</NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;