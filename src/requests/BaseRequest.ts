import type { AxiosInstance } from "axios";
import axios from "./https";

export default abstract class BaseRequest {

    static readonly axios: AxiosInstance = axios;

    /**
     * finance 项目
     */
    static readonly FINANCE = 'http://finance.local.com';
}