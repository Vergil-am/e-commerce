import axios from "axios";

const BASE_URL = "http://localhost:500/api/"
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzFhOTI4M2RkMWFjY2RhOWM2YWVhNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDQ3MzAzOCwiZXhwIjoxNjY0NzMyMjM4fQ.zAvys6mvz0vFDd8VKqyX-_M_stA3WMANSV4D2zYmxjw"


export const PublicRequest = axios.create({
    base_URL: BASE_URL,
})

export const userRequest = axios.create({
    base_URL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
}) 