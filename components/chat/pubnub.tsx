import React, { useState, useEffect, useRef } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import { useAuth } from "../../hooks/useAuth";

export default function Pubnub({ children }) {
    const auth = useAuth();

    const pubnub = new PubNub({
        publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH,
        subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE,
        uuid: auth.user.uid,
    });

    return <PubNubProvider client={pubnub}>{children}</PubNubProvider>;
}
