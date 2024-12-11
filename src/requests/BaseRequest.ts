import type { AxiosInstance } from "axios";
import axios from "./https";

export default abstract class BaseRequest {

    static readonly axios: AxiosInstance = axios;

    /**
     * finance 项目
     */
    static readonly FINANCE = 'http://finance.api.com';

    /**
     * finance 文件系统项目
     */
    static readonly FINANCE_FILE = 'http://finance.file.com';
}