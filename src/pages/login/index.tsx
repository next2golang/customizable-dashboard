/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react'
import { useEffect } from 'react'
import { ethers } from 'ethers';
import { signIn, useSession } from 'next-auth/react';
import { useAccount } from 'wagmi'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'

import { ConnectButton } from '@rainbow-me/rainbowkit';
declare global {
    interface Window {
        ethereum?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}

export default function Home() {
    const { isConnected } = useAccount()
    const { status } = useSession()

    useEffect(() => {
        if (status === 'unauthenticated' && isConnected)
            onSignInWithCrypto().catch((error) => { console.log('Sign In error:', error) })
    }, [status, isConnected])
    return (
        <main className="flex min-h-screen flex-col p-6 justify-center">
            <div className="flex justify-center align-middle">
                <Card className="w-[450px] h-[350px] bg-[#181d2a]">
                    <CardHeader className="items-center">
                        <svg width='50%' height='30%' viewBox='0 0 256 257' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid'><path d='M210.377 126.784c0 46.231-37.477 83.708-83.708 83.708s-83.708-37.477-83.708-83.708 37.477-83.708 83.708-83.708 83.708 37.477 83.708 83.708' fill="#4D37B9" /><path d="M79.509 87.972l37.24-21.501a20.008 20.008 0 0 1 20.005 0l37.24 21.501a20.002 20.002 0 0 1 10.002 17.324v43.002a20.002 20.002 0 0 1-10.002 17.324l-37.24 21.501a20.003 20.003 0 0 1-20.005 0l-37.24-21.501a20.003 20.003 0 0 1-10.003-17.324v-43.002a20.003 20.003 0 0 1 10.003-17.324" fill="#FFF" /><g fill="#4D37B9"><path d="M126.537 99.521c9.416.001 18.832-.029 28.248.011 5.789.025 7.561 1.879 7.57 7.71.002 1.457.015 2.914-.003 4.371-.056 4.656-2.06 6.712-6.804 6.796-4.258.076-8.519-.026-12.778.029-5.013.065-6.869 1.929-6.886 6.95-.034 9.864.009 17.64 0 27.504 0 9.462-1.694 10.341-8.073 10.359-9.474.027-10.353-.846-10.353-10.359 0-9.08.025-18.159 0-27.239-.015-5.416-1.806-7.177-7.296-7.22-4.147-.033-8.297.058-12.443-.025-4.711-.094-6.684-2.164-6.733-6.866-.016-1.569-.008-3.139-.002-4.708.023-5.328 1.892-7.255 7.305-7.298 7.173-.057 14.348-.015 21.522-.015h6.726" /><path d="M144.132 132.591c0-2.272 1.809-2.441 1.809-2.441h6.354c3.745 0 6.733 3.577 6.733 7.07 0 2.606-1.219 4.321-1.837 5.024a.583.583 0 0 0-.014.755c.632.791 1.935 2.699 1.935 4.993 0 3.029-2.104 7.027-6.691 7.027h-6.48s-1.725.463-1.725-1.936c0-2.398 1.725-2.146 1.725-2.146h6.354c1.809 0 2.062-1.304 2.062-2.987 0-1.684-.757-3.03-2.062-3.03h-6.354s-1.767.126-1.767-2.188c0-2.315 1.767-2.399 1.767-2.399h6.354c1.473 0 2.062-1.599 2.062-2.861 0-1.262-.589-2.567-2.062-2.567h-6.354s-1.809-.042-1.809-2.314" /></g><g><path d="M220.841 42.795a7.995 7.995 0 1 1-15.99 0 7.995 7.995 0 0 1 15.99 0" fill="#B300E3" /><path d="M256 127.476a7.995 7.995 0 1 1-15.99 0 7.995 7.995 0 0 1 15.99 0" fill="#4E00BF" /><path d="M221.114 212.52a7.995 7.995 0 1 1-15.99 0 7.995 7.995 0 0 1 15.99 0" fill="#0EBBF0" /><path d="M136.369 248.305a7.994 7.994 0 0 1-7.995 7.994 7.995 7.995 0 1 1 7.995-7.994" fill="#93E477" /><path d="M51.175 212.52a7.994 7.994 0 1 1-15.989 0 7.995 7.995 0 1 1 15.989 0" fill="#DDE6EC" /><path d="M15.99 127.626a7.996 7.996 0 1 1-15.991-.001 7.996 7.996 0 0 1 15.991.001" fill="#FE4545" /><path d="M51.026 42.881a7.996 7.996 0 1 1-15.991-.001 7.996 7.996 0 0 1 15.991.001" fill="#FEB900" /><path d="M136.369 7.995a7.995 7.995 0 1 1-15.99 0 7.995 7.995 0 0 1 15.99 0" fill="#47E8E2" /></g></svg>
                        <CardTitle className="text-center text-2xl text-white">Welcome to Trial-Task</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex justify-center pb-2">
                        {status === 'unauthenticated' && !isConnected ? <ConnectButton label={'LogIn with rainbowkit'} /> : <span>Loading...</span>}
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}

// This function requests a nonce then signs it, proving that
//  the user owns the public address they are using

async function onSignInWithCrypto() {
    try {
        if (!window.ethereum) {
            window.alert("Please install MetaMask first.");
            return;
        }

        // Get the wallet provider, the signer and address
        //  see: https://docs.ethers.org/v6/getting-started/#starting-signing
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();

        // Send the public address to generate a nonce associates with our account
        const response = await fetch("/api/auth/crypto/generateNonce", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                walletAddress,
            }),
        });
        const responseData = await response.json();

        // Sign the received nonce
        const signedNonce = await signer.signMessage(responseData.nonce);

        // Use NextAuth to sign in with our address and the nonce
        await signIn("crypto", {
            walletAddress,
            signedNonce,
            callbackUrl: "/",
        });
    } catch {
        window.alert("Error with signing, please try again.");
    }
}
