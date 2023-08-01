import type { AxiosInstance } from "axios";
import axios from "./https";

export default abstract class BaseRequest {

    static readonly axios: AxiosInstance = axios;

    /**
     * user 项目
     */
    static readonly AUTH = 'http://127.0.0.1:8001';

    /**
     * user 项目
     */
    static readonly USER = 'http://127.0.0.1:8011';

    /**
     * system 项目
     */
    static readonly SYSTEM = 'http://127.0.0.1:8021';

    /**
     * company 项目
     */
    static readonly COMPANY = 'http://127.0.0.1:8031';
}