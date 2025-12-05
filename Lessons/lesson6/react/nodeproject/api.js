import axios from "axios"

const baseUrl = `http://localhost:3001/`

export const getCategories = () => {

    // const token = localStorage.getItem('token')

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoYXlhbGUiLCJlbWFpbCI6IjA1NTY3NjI4MzZjQGdtYWlsLmNvbSIsImlhdCI6MTczNjg1MTA2MiwiZXhwIjoxNzM2ODU0NjYyfQ.Aps2FuaFuHxYuoMvkwsv5xPfO0hf00ri30Z63jCAMII`

    return axios.get(`${baseUrl}category`, { headers: { Authorization: `Bearer ${token}` } })
}

export const addCategory = (category) => {

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoYXlhbGUiLCJlbWFpbCI6IjA1NTY3NjI4MzZjQGdtYWlsLmNvbSIsImlhdCI6MTczNjg1MTA2MiwiZXhwIjoxNzM2ODU0NjYyfQ.Aps2FuaFuHxYuoMvkwsv5xPfO0hf00ri30Z63jCAMII`

    const headers = {
        Authorization: `Bearer ${token}`
    }

    // url, body, object => headers
    return axios.post(`${baseUrl}category`, category, { headers })
}