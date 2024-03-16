/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/server/db';

export default async function removeLayouts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log(req.query, '----------------')
        const user = await db.user.findUnique({
            where: { walletAddress: req.query.walletaddress?.toString()! }
        })

        if (user) {
            await db.dashboards.delete({
                where: { tab: Number(req.query.tab), }
            })
            return res.status(200).json({ message: 'delete success' })
        }
        else { return console.error('Not connect wallet'); }
    } catch (error) {
        console.error('Error removing dashboard!!!', error);
    }

}

