import { connect } from "getstream";

export default async function Stats(req, res) {
    const {
        query: { userid },
    } = req;

    const client = connect(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        process.env.STREAM_SECRET,
        process.env.NEXT_PUBLIC_STREAM_APP_ID
    );

    const user = await client.feed("user", userid).followStats();
    const timeline = await client.feed("timeline", userid).followStats();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
        JSON.stringify({
            followers: user.results.followers.count,
            following: timeline.results.following.count,
        })
    );
}
