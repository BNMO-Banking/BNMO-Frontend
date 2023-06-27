import axios, { type AxiosError, type AxiosResponse } from "axios";
import type ErrorMessageType from "../types/axios/axios-error.type";
import type {
    LoginResAxios,
    LogoutResAxios,
    RegisterResAxios
} from "../types/axios/auth.type";

export const register = (data: FormData): Promise<RegisterResAxios> =>
    axios
        .post("/register", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response: AxiosResponse<RegisterResAxios>) => {
            return response.data;
        })
        .catch((error: AxiosError<ErrorMessageType>) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    throw {
                        status: error.response.status,
                        message: error.response.data.error
                    };
                }
            }
            throw error;
        });

export const login = (data: Object): Promise<LoginResAxios> =>
    axios
        .post("/login", data)
        .then((response: AxiosResponse<LoginResAxios>) => {
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
            return response.data;
        })
        .catch((error: AxiosError<ErrorMessageType>) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    throw {
                        status: error.response.status,
                        message: error.response.data.error
                    };
                }
            }
            throw error;
        });

export const logout = (): Promise<LogoutResAxios> =>
    axios
        .post("/logout", null)
        .then((response: AxiosResponse<LogoutResAxios>) => {
            return response.data;
        })
        .catch((error: AxiosError<ErrorMessageType>) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    throw {
                        status: error.response.status,
                        message: error.response.data.error
                    };
                }
            }
            throw error;
        });

export const checkPin = async (id: number) =>
    axios
        .get("/check-pin", {
            params: {
                id: id
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

export const changePin = async (data: Object) =>
    axios
        .put("/change-pin", data)
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

export const changePassword = async (data: Object) =>
    axios
        .put("/change-password", data)
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
