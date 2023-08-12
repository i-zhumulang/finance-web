import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class AuthRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 登录
     * @param formData
     */
    public login(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/auth/login", formData);
    }
}