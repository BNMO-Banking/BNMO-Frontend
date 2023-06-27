export default interface Account {
    is_admin: boolean;
    ID: number;
    CreatedAt: Date;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    image_path: string;
    account_number: string;
    balance: number;
}
