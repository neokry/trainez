import { connect } from "getstream";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { userid },
    } = req;

    const client = connect(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        process.env.STREAM_SECRET,
        process.env.NEXT_PUBLIC_STREAM_APP_ID
    );

    await client.user(userid as string).getOrCreate({});
    const token = await client.createUserToken(userid as string);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ token: token }));
};
