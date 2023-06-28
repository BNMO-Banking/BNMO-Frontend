import axios, { AxiosError } from "axios";
import AxiosErrorType from "../types/axios/default-response.type";

export const fetchPendingAccounts = (page: number) =>
    axios
        .get<object>("/admin/get-pending-account", {
            params: {
                page: page
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError<AxiosErrorType>) => {
            if (error.response) {
                throw {
                    status: error.response.status,
                    message: error.response.data.error
                };
            }
            throw error;
        });

export const validateAccount = (data: Object) =>
    axios
        .post("/admin/validate-account", data)
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
