import { AxiosResponse } from "axios";

export enum RequestType {
    ADD = "add",
    SUBTRACT = "subtract"
}

export interface RequestReqAxios {
    destination_id: string;
    request_type: RequestType;
    amount: number;
    currency: string;
}

export interface RequestResAxios extends AxiosResponse {
    message: string;
}
