import axios from "axios";
import type { AxiosError, AxiosResponse, RawAxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import HmacSha256Encrypt from "@/typescripts/common/encrypt/aes/HmacSha256Encrypt";
import { useUser } from "@/stores/user/User";

const userStore = useUser();

const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache, private'
};
const instance = axios.create({
    timeout: 5000,
    withCredentials: true,
    headers: headers
});
// 请求拦截
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const authorization = 'Bearer ' + userStore.token;
    config.headers['Timestamp'] = new Date().getTime();
    config.headers['Authorization'] = authorization;
    const tokenObj = {
        uri: config.url,
        query: {},
        Authorization: authorization,
    };
    if (config.method === "get") {
        tokenObj.query = config.params;
        config.headers.Signature = new HmacSha256Encrypt().encrypt(JSON.stringify(tokenObj));
    } else {
        tokenObj.query = config.data;
        config.headers.Signature = new HmacSha256Encrypt().encrypt(JSON.stringify(tokenObj));
    }
    return config;
});
// 响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
    // 登录过期
    if (response.data.code === 401) {
        ElMessage({
            type: "error",
            message: "登录已经过期,请重新登录",
            onClose: function () {
                userStore.setUser({id: "", name: "", token: ""})
            }
        });
    }
    return response;
}, (error: AxiosError) => {
    // 错误提醒
    return Promise.reject(error);
});

export default instance
