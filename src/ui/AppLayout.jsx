import React from 'react';
import Header from "./Header.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <div className={'min-h-screen bg-stone-900 text-white grid grid-rows-[auto_1fr] p-4'}>

            <Header />
            <main className={'flex flex-col items-center'}>
                {isLoading && <Loader />}
                <Outlet/>
            </main>
        </div>
    );
};

export default AppLayout;