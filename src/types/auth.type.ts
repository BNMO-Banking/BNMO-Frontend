import type { AxiosResponse } from "axios";

export interface RegisterReqAxios {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone_number: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    id_card: File;
    password: string;
    confirm_password: string;
}

export interface LoginReqAxios {
    email_username: string;
    password: string;
}

export interface LoginResAccount {
    id: string;
    email: string;
    username: string;
    account_number: string;
    account_type: string;
    account_role: string;
}

export interface LoginResAxios extends AxiosResponse {
    account: LoginResAccount;
    pin_status: boolean;
    token: string;
    message: string;
}
