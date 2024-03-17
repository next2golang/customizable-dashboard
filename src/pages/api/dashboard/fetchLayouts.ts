/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/server/db';

interface FetchLayoutResponse {
    userWidgets: any,
    userLayout: any
}

export default async function fetchLayouts(
    req: NextApiRequest,
    res: NextApiResponse<FetchLayoutResponse>
) {
    try {
        console.log(req.query, '----------------')
        const user = await db.user.findUnique({
            where: { walletAddress: req.query.walletaddress?.toString()! }
        })

        if (user) {
            const dashboard = await db.dashboards.findUnique({
                where: { tab: Number(req.query.tab), }
            })
            if (!dashboard) return res.json({
                userWidgets: null,
                userLayout: null
            });

            const userWidgets = await db.widgets.findMany({
                where: { dashboardId: dashboard.id },
                select: {
                    wid: true,
                }
            })

            const userLayout = await db.widgets.findMany({
                where: { dashboardId: dashboard.id }
            })

            const result = {
                userWidgets: userWidgets,
                userLayout: userLayout
            }
            return res.status(200).json({
                userWidgets: userWidgets,
                userLayout: userLayout
            });
        }
        else { return console.error('Not connect wallet'); }
    } catch (error) {
        console.error('Error updating dashboard!!!', error);
    }

}

