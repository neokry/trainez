export default interface UserDetail {
    id: string;
    userData: Record<string, unknown>;
    price: number;
    status: string;
    lastOnline: Date;
}
