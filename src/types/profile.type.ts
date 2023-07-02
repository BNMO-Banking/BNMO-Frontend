import { AxiosResponse } from "axios";

export interface ProfileRes {
    account_number: string;
    account_type: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    card_number: string;
    balance: string;
    phone_number: string;
    profile_pic_path: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface ProfileResData extends AxiosResponse {
    data: ProfileRes;
}

export interface EditProfileReq {
    phone_number: string;
    profile_pic: File;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface EditProfileRes extends AxiosResponse {
    data: ProfileRes;
    message: string;
}
