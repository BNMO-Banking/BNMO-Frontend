import { RequestType } from "../../enum/reqtype.enum";

export interface RequestReqAxios {
    id: string;
    request_type: RequestType;
    currency: string;
    amount: number;
    pin: string;
}
