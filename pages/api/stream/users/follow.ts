import { NextApiRequest, NextApiResponse } from "next";
import SocialService from "../../../../lib/api/services/SocialService";
import UserService from "../../../../lib/api/services/UserService";

interface FollowRequest {
    currentUserId: string;
    followingUserId: string;
}

interface ValidationReponse {
    success: boolean;
    response?: NextApiResponse;
    requestData?: FollowRequest;
}

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { success, response, requestData } = validate(req, res);
    if (!success) {
        res = response;
        return;
    }
    const { followUser } = SocialService();

    await followUser(requestData.currentUserId, requestData.followingUserId);

    res.status(200).end();
}

function validate(
    req: NextApiRequest,
    res: NextApiResponse
): ValidationReponse {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
        return { success: false, response: res };
    }

    if (!req.body) {
        res.status(400).end("No users sent");
        return { success: false, response: res };
    }

    const usersReq: FollowRequest = req.body;

    return { success: true, requestData: usersReq };
}
