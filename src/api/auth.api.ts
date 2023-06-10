import axios from "axios";

export const register = (data: Object) => axios.post("/register", data)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
        throw error;
    });

export const login = (data: Object) => axios.post("/login", data)
    .then((response) => {
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
        return response.data;
    })
    .catch((error) => {
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
        throw error;
    });

export const logout = () => axios.post("/logout", null)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
        throw error;
    });