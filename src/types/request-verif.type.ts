import { AxiosResponse } from "axios";
import PageMetadata from "./page-metadata.type";

export default interface RequestData {
    id: string;
    request_type: string;
    currency: string;
    amount: number;
    converted_amount: string;
    status: string;
    remarks: string;
    first_name: string;
    last_name: string;
    account_number: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
}

export interface RejectRemarksReq {
    remarks: string;
}

export interface RequestDataList extends AxiosResponse {
    data: RequestData[];
    metadata: PageMetadata;
}
