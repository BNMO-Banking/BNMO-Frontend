import axios from "axios";

export const fetchSymbols = () => axios.get("/get-symbols")
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