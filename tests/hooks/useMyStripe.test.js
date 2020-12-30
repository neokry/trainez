import axios from "axios";
import useMyStripe from "../../hooks/useMyStripe";
import { act, renderHook } from "@testing-library/react-hooks";

jest.mock("axios");
jest.mock("../../configs/firebase");

describe("useMyStripe", async () => {
    it("runs setup", async () => {
        const { result } = renderHook(useMyStripe);

        const responseData = {
            accId: "123",
            cusId: "123",
        };

        axios.post.mockResolvedValueOnce({ data: responseData });

        let res;
        await act(async () => {
            res = await result.current.setupStripe("1234", "test.com");
        });

        expect(res.accId).toEqual(responseData.accId);
        expect(res.cusId).toEqual(responseData.accId);
    });

    it("setup is null", async () => {
        const { result } = renderHook(useMyStripe);

        axios.post.mockResolvedValueOnce({ data: null });

        let res;
        await act(async () => {
            res = await result.current.setupStripe("1234", "test.com");
        });

        expect(res).toBeFalsy();
    });
});
