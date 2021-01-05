import { connect } from "getstream";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Stats(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { userid },
    } = req;

    const client = connect(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        process.env.STREAM_SECRET,
        process.env.NEXT_PUBLIC_STREAM_APP_ID
    );

    const user = await client.feed("user", userid as string).followStats();
    const timeline = await client
        .feed("timeline", userid as string)
        .followStats();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
        JSON.stringify({
            followers: user.results.followers.count,
            following: timeline.results.following.count,
        })
    );
}
