import type { AxiosResponse } from "axios";
import type Account from "../model/account.type";

export interface RegisterResAxios extends AxiosResponse {
    message: string;
}

export interface LoginReqAxios {
    email: string;
    password: string;
}

export interface LoginResAxios extends AxiosResponse {
    account: Account;
    token: string;
    accountStatus: string;
    message: string;
}

export interface LogoutResAxios extends AxiosResponse {
    message: string;
}
