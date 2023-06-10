import axios from "axios";

export const fetchTransferDestinations = async (id: number) => axios.get("/get-destination", {
        params: {
            id: id
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
    
export const checkDestination = async (data: Object) => axios.post("/check-destination", data)
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

export const addDestination = async (data: Object) => axios.post("/add-destination", data)
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

export const transfer = async (data: Object) => axios.post("/transfer", data)
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

export const fetchTransferHistory = async (id: number, page: number) => axios.get("/transfer-history", {
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