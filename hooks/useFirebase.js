import { projectFirestore } from "../configs/firebase";
import { useAuth } from "./useAuth";

export function useFirebase() {
    const auth = useAuth();

    const updateUsername = async (username) => {
        try {
            console.log("updating username");
            await projectFirestore
                .collection("usernames")
                .doc(auth.user.uid)
                .set({
                    username: username,
                });
        } catch (err) {
            console.log("Error updating user name " + err);
        }
    };

    const getUserIdFromName = async (username) => {
        try {
            const snap = await projectFirestore
                .collection("usernames")
                .where("username", "==", username)
                .get();
            return snap.docs[0]?.id;
        } catch (err) {
            console.log("Error getting user id " + err);
        }
    };

    return { updateUsername, getUserIdFromName };
}
