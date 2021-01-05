import { connect } from "getstream";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UserId(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { userid },
    } = req;

    const client = connect(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        process.env.STREAM_SECRET,
        process.env.NEXT_PUBLIC_STREAM_APP_ID
    );

    const user = await client.user(userid as string).get();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ user: user.full }));
}
