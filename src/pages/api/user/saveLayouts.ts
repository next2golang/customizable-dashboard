/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { useAccount } from 'wagmi'
import { db } from '~/server/db';

export default async function saveLayouts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // const { address } = useAccount();
    // const walletAddress = address;
    console.log(req.body, '----------------')
    // const { walletAddress } = req.body;
    const name = 'req?.body?.title';
    const id = 'sdfdsf'

    const user = await db.user.findUnique({
        where: { walletAddress: '' }
    })

    const result = await db.dashboards.update({
        where: {
            createdById: user?.id,
            tab: 4
        },
        data: {
            Widgets: {
                createMany: {
                    data: req.body.userWidgets,
                }
            },
            Layouts: {
                createMany: {
                    data: req.body.userLayouts,
                }
            }
        }
    });

    return res.status(200).json({});
}

