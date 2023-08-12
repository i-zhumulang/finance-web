import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";

/**
 * 注册请求参数
 */
export interface registerFormData extends BaseParamsInterface{
    account: string,
    password: string,
    passwordConfirm: string,
}
