import { projectFirestore } from "../configs/firebase";
import { useAuth } from "./useAuth";

export function useFirebase() {
    const auth = useAuth();

    const updateUsername = async (userId, username) => {
        try {
            console.log("updating username " + username + "for id " + userId);
            await projectFirestore.collection("usernames").doc(userId).set({
                username: username,
            });
        } catch (err) {
            console.log("Error updating user name " + err);
        }
    };

    const isUsernameAvailible = async (userId, username) => {
        try {
            const snap = await projectFirestore
                .collection("usernames")
                .where("username", "==", username)
                .get();
            return !snap.docs[0].exists || snap.docs[0].id === userId;
        } catch (err) {
            console.log("Error checking username " + err);
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

    const isMemberCodeValid = async (userId, memberCode) => {
        try {
            const doc = await projectFirestore
                .collection("memberCodes")
                .doc(userId)
                .get();
            return doc.data()?.code === memberCode;
        } catch (err) {
            console.log(err);
        }
    };

    const createMemberCode = async (userId) => {
        try {
            const code = Math.random().toString(36).slice(-5);
            await projectFirestore
                .collection("memberCodes")
                .doc(userId)
                .set({ code: code });
        } catch (err) {
            console.log("Error creating member code " + err);
        }
    };

    const getMemberCode = async (userId) => {
        try {
            console.log(userId);
            const doc = await projectFirestore
                .collection("memberCodes")
                .doc(userId)
                .get();
            return doc.data()?.code;
        } catch (err) {
            console.log("Error getting member code " + err);
        }
    };

    return {
        updateUsername,
        getUserIdFromName,
        isMemberCodeValid,
        isUsernameAvailible,
        createMemberCode,
        getMemberCode,
    };
}
