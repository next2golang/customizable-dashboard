/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/server/db';

export default async function saveLayouts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log(req.body, '----------------')

        const user = await db.user.findUnique({
            where: { walletAddress: req.body.walletaddress! }
        })

        if (user) {
            const dashboard = await db.dashboards.findUnique({
                where: {
                    createdById: user?.id,
                    tab: req.body.tab,
                }
            })
            if (dashboard)
                await db.dashboards.delete({
                    where: {
                        createdById: user?.id,
                        tab: req.body.tab,
                    }
                })
            await db.dashboards.create({
                data: {
                    name: req.body.name,
                    tab: Number(req.body.tab),
                    createdById: user?.id,
                    Widgets: {
                        createMany: {
                            data: req.body.userWidgets!,
                        }
                    },
                    Layouts: {
                        createMany: {
                            data: req.body.userLayout!,
                        }
                    }
                }
            });
        }
        else { return console.error('Not connect wallet'); }

        return res.status(200).json({});
    } catch (error) {
        console.error('Error updating dashboard!!!', error);
    }

}

