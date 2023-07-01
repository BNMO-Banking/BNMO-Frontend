import { AxiosResponse } from "axios";
import RequestData from "../model/request-data.type";
import PageMetadata from "../model/page-metadata.type";

export interface RejectRemarksReq {
    remarks: string;
}

export interface RequestDataList extends AxiosResponse {
    data: RequestData[];
    metadata: PageMetadata;
}
