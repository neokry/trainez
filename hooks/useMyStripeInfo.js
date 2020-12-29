import { projectFirestore } from "../configs/firebase";

export default function useMyStripeInfo() {
    const updateStripeInfo = async (userId, data) => {
        try {
            await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .set(data, { merge: true });
        } catch (err) {
            console.log("Error updating stripe id ", err);
        }
    };

    const getStripeInfo = async (userId) => {
        try {
            const doc = await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .get();
            return doc.data();
        } catch (err) {
            console.log("Error getting stripe id " + err);
        }
    };

    return { getStripeInfo, updateStripeInfo };
}
