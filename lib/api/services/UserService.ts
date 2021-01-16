import SubscriptionEntity from "../data/entities/SubscriptionEntity";
import UserDetail from "../models/UserDetail";
import FireRepository from "../data/FireRepository";
import StripeRepository from "../data/StripeRepository";
import StreamRepository from "../data/StreamRepository";
import UserDetailsEntity from "../data/entities/UserDetailsEntity";

export default function UserService() {
    const { usersLastOnline } = FireRepository();
    const { listUserSubscriptions } = StripeRepository();
    const { userDetails } = StreamRepository();

    const getUserDetailsFull = async (
        userIds: string[],
        customerId: string
    ): Promise<UserDetail[]> => {
        if (userIds.length === 0) {
            return [];
        }
        const details = await userDetails(userIds);

        const userslastOnline = await usersLastOnline(userIds);
        let userSubscriptions: SubscriptionEntity[];

        if (customerId)
            userSubscriptions = await listUserSubscriptions(customerId);

        return details.map((user) => {
            let online = userslastOnline.find((x) => x.userId === user.id);
            let sub: SubscriptionEntity;
            if (customerId)
                sub = userSubscriptions.find((x) => x.creatorId === user.id);

            const userDetail: UserDetail = {
                id: user.id,
                userData: user.data,
                price: sub?.price ?? null,
                status: sub?.status ?? null,
                lastOnline: online?.lastOnline,
            };

            return userDetail;
        });
    };

    const getUserDetails = async (
        userIds: string[]
    ): Promise<UserDetailsEntity[]> => {
        const details = await userDetails(userIds);
        return details;
    };

    return { getUserDetailsFull, getUserDetails };
}
