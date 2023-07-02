import { AxiosResponse } from "axios";

export interface AddDestinationReq {
    id: string;
    destination_number: string;
    pin: string;
}

export interface CheckDestinationRes extends AxiosResponse {
    name: string;
}

export interface DestinationRes {
    account_number: string;
    first_name: string;
    last_name: string;
}

export interface DestinationResList extends AxiosResponse {
    data: DestinationRes[];
}
