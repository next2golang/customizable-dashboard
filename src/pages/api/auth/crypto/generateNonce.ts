import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import crypto from 'crypto'
interface CryptoNonceResponse {
    nonce: string;
    expires: string;
}

export default async function generateNonce(
    req: NextApiRequest,
    res: NextApiResponse<CryptoNonceResponse>
) {
    const { walletAddress } = req.body;

    // Note: this nonce is displayed in the user's wallet for them to sign
    //  you can use any other representation of the nonce that you want
    //  but make sure to keep it a true random number with enough length.
    const nonce = crypto.randomBytes(32).toString("hex");

    // Set the expiry of the nonce to 1 hour
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

    // Create or update the nonce for the given user
    //  see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
    await db.user.upsert({
        where: { walletAddress },
        create: {
            walletAddress,
            CryptoLoginNonce: {
                create: {
                    nonce,
                    expires,
                },
            },
        },
        update: {
            CryptoLoginNonce: {
                upsert: {
                    create: {
                        nonce,
                        expires,
                    },
                    update: {
                        nonce,
                        expires,
                    },
                },
            },
        },
    });

    return res.status(200).json({
        nonce,
        expires: expires.toISOString(),
    });
}

