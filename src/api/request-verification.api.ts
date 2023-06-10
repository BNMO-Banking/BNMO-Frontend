import axios from "axios";

export const fetchPendingRequests = (page: number) => axios.get(`/admin/get-pending-request?page=${page}`)
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

export const validateRequest = (data: Object) => axios.post("/admin/validate-request", data)
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