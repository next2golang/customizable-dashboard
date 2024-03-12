import React from 'react';
import Header from '~/components/layout/header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-screen border-collapse overflow-hidden">
                <main className="flex-1 overflow-y-hidden overflow-x-hidden pt-16 bg-secondary/10 pb-1">

                    {children}
                </main>
            </div>
        </>
    );
};