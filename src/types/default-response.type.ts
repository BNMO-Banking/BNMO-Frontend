import type { AxiosError, AxiosResponse } from "axios";

export interface DefaultResponse extends AxiosResponse {
    message: string;
}

export interface DefaultError extends AxiosError {
    error: string;
}

export interface DefaultErrorResponse {
    status: number;
    message: string;
}
