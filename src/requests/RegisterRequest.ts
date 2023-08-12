import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class RegisterRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 注册
     * @param formData
     */
    public register(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/register", formData);
    }
}