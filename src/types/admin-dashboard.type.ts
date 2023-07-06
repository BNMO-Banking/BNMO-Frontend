import { AxiosResponse } from "axios";
import { RequestType } from "../enum/reqtype.enum";

interface PendingAccount {
    first_name: string;
    last_name: string;
    created_at: Date;
}

interface PendingRequest {
    first_name: string;
    last_name: string;
    request_type: RequestType;
    created_at: Date;
}

export interface PendingAccountList {
    pending: PendingAccount[];
    total: number;
}

export interface PendingRequestList {
    pending: PendingRequest[];
    total: number;
}

export interface PendingList extends AxiosResponse {
    accounts: PendingAccountList;
    requests: PendingRequestList;
}

export interface NewAccountStatistics {
    total_accounts: number;
    yearly_accounts: number;
    monthly_accounts: number[];
}

export interface NewAccountStatisticsRes extends AxiosResponse {
    data: NewAccountStatistics;
}

export interface RequestTypeStatistics extends AxiosResponse {
    add: number;
    subtract: number;
}

export interface BankStatistics {
    total_expense: string;
    total_income: string;
    monthly_expense: string[];
    monthly_income: string[];
}

export interface BankStatisticsRes extends AxiosResponse {
    data: BankStatistics;
}
