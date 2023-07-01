import { AxiosResponse } from "axios";
import PageMetadata from "./page-metadata.type";

export default interface AccountData {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    id_card_path: string;
    status: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: Date;
    updated_at: Date;
}

export interface AccountDataList extends AxiosResponse {
    data: AccountData[];
    metadata: PageMetadata;
}
