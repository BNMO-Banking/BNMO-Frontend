import axios from "axios";

export const register = (data: Object) => axios.post("http://localhost:8080/register", data)
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
    })

export const login = (data: Object) => axios.post("http://localhost:8080/login", data)
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

export const logout = () => axios.post("http://localhost:8080/logout", null)
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
    })