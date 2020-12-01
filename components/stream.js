import React from "react";
import { StreamApp } from "react-activity-feed";

export default function Stream(props) {
    return (
        <StreamApp
            apiKey="8dh8w4m4fphw"
            appId="85011"
            token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.zfyw5IaHwtVxxGzEMHSgbPyMGHqn6AhFWL0_bU2TUtQ"
        >
            {props.children}
        </StreamApp>
    );
}
