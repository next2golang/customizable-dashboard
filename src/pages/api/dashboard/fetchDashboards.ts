/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/server/db';

interface FetchLayoutResponse {
    data: any
}

export default async function fetchDashboards(
    req: NextApiRequest,
    res: NextApiResponse<FetchLayoutResponse>
) {
    try {
        console.log(req.query, '----------------')
        const user = await db.user.findUnique({
            where: { walletAddress: req.query.walletaddress?.toString()! }
        })

        if (user) {
            const dashboards = await db.dashboards.findMany({
                where: { createdById: user.id },
                select: {
                    name: true,
                    tab: true
                },
                orderBy: {
                    tab: 'asc'
                }
            })
            if (!dashboards) return res.json({
                data: null
            });

            return res.status(200).json({
                data: dashboards
            });
        }
        else { return console.error('Not connect wallet'); }
    } catch (error) {
        console.error('Error updating dashboard!!!', error);
    }

}

