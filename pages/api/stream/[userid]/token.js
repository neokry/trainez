import { connect } from "getstream";

export default async function Token(req, res) {
    const {
        query: { userid },
    } = req;

    const client = connect(
        "et996ub2qf5f",
        "du4jf5cushrmccfujkgf2866xy33295f5anq7xyxfm9ayds3c6m8kuy4vgnxnafc",
        "102445"
    );

    await client.user(userid).getOrCreate();
    const token = await client.createUserToken(userid);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ token: token }));
}
