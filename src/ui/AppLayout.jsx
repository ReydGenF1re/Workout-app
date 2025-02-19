import React from 'react';
import Header from "./Header.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <div className={'min-h-screen overflow-x-hidden bg-zinc-900 text-white grid grid-rows-[auto_1fr] p-4'}>

            <Header />
            <main className={'mx-auto w-full max-w-[1440px]'}>
                {isLoading && <Loader />}
                <Outlet/>
            </main>
        </div>
    );
};

export default AppLayout;