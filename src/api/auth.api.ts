import axios from "axios";

export const register = (data: Object) => axios.post("/register", data, {
    headers: {
        'Content-Type': 'multipart/form-data'
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

export const checkPin = async (id: number) => axios.get("/check-pin", {
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

export const changePin = async (data: Object) => axios.put("/change-pin", data)
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

export const changePassword = async (data: Object) => axios.put("/change-password", data)
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