import axios, { type AxiosError, type AxiosResponse } from "axios";
import type {
    RequestReqAxios,
    RequestResAxios
} from "../types/axios/request.type";
import type ErrorMessageType from "../types/axios/axios-error.type";

export const request = (data: RequestReqAxios): Promise<RequestResAxios> =>
    axios
        .post("/request-money", data)
        .then((response: AxiosResponse<RequestResAxios>) => {
            return response.data;
        })
        .catch((error: AxiosError<ErrorMessageType>) => {
            if (error.response) {
                throw {
                    status: error.response.status,
                    message: error.response.data.error
                };
            }
            throw error;
        });

export const fetchRequestHistory = async (id: number, page: number) =>
    axios
        .get("/request-history", {
            params: {
                id: id,
                page: page
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw {
                    status: error.response.status,
                    message: error.response.data.error
                };
            }
            throw error;
        });
