import React from "react";
import UserCard from "../../components/userCard";
import { render } from "../test-utils";

describe("UserCard", () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            user: {
                name: "test",
                profileImage: "test.com",
                userName: "test",
                status: "active",
                price: 20,
            },
            onConfirm: (test) => {
                return test;
            },
        };
    });

    test("renders card with name, username, status, and price set", () => {
        const { getByText } = render(<UserCard {...expectedProps} />);
        const name = getByText(expectedProps.user.name);
        const userName = getByText(expectedProps.user.userName);
        const price = getByText(
            `Subscribed For ${expectedProps.user.price} $ (PER MONTH)`
        );

        expect(name).toBeVisible();
        expect(userName).toBeVisible();
        expect(price).toBeVisible();
    });
});
