import type { AxiosResponse } from "axios";

export interface RegisterResAxios extends AxiosResponse {
    message: string;
}

export interface LoginReqAxios {
    email_username: string;
    password: string;
}

export interface LoginResAccount {
    id: string;
    email: string;
    username: string;
    account_type: string;
    account_role: string;
}

export interface LoginResAxios extends AxiosResponse {
    account: LoginResAccount;
    pin_status: boolean;
    token: string;
    message: string;
}
