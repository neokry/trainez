import { NextApiRequest, NextApiResponse } from "next";
import UserDetail from "../../../../api/models/UserDetail";
import UserService from "../../../../api/services/UserService";

interface UsersRequest {
    userIds: string[];
    customerId: string;
}

interface ValidationReponse {
    success: boolean;
    response?: NextApiResponse;
    requestData?: any;
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
    const { getUserDetails } = UserService();

    const details = await getUserDetails(
        requestData.userIds,
        requestData.customerId
    );

    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(details));
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
        res.status(400).end("No user sent");
        return { success: false, response: res };
    }

    const usersReq: UsersRequest = req.body;
    if (usersReq.userIds.length === 0) {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify([]));
        return { success: false, response: res };
    }

    return { success: true, requestData: usersReq };
}
