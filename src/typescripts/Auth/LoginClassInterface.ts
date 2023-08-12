/**
 * 登录请求参数
 */
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";

export interface loginFormData extends BaseParamsInterface {
    account: string,
    password: string,
}
