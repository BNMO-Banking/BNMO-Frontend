import axios from "axios";

export const request = (data: Object) => axios.post("/request-money", data)
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

export const fetchRequestHistory = async (id: number, page: number) => axios.get("/request-history", {
        params: {
            id: id,
            page: page
        }
    })
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