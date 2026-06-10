import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
    withCredentials: true,
})

let _accessToken : string | null = null

export function getAccessToken() {
    return _accessToken
}

export function setAccessToken(token: string | null) {
    _accessToken = token
}

api.interceptors.request.use((config)=> {
    const token = getAccessToken()
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use((res)=>res,
    async(err)=>{
        const orginalRequest = err.config
        if (err.response?.status == 401 && !orginalRequest._retry) {
            orginalRequest._retry = true
            try {
                const res = axios.post("http://localhost:3000/api/refresh", 
                    {
                        withCredentials: true
                    })
                const newToken = (await res).data.access_token
                setAccessToken(newToken)
                orginalRequest.headers.Authorization = `Bearer ${newToken}`
                return api
            } catch {
                setAccessToken(null)
                window.location.href = '/login'
            }
        }
        return Promise.reject(err)
    }
)