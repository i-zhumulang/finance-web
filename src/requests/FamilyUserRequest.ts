import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class FamilyUserRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 列表数据
     * @param formData
     */
    public index(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-user", {params: formData});
    }

    /**
     * 列表数量
     * @param formData
     */
    public count(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-user/count", {params: formData});
    }

    /**
     * 搜索、表格头部参数
     * @param formData
     */
    public options(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-user/options", {params: formData});
    }

    /**
     * 启用
     * @param id
     */
    public enabled(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-user/${id}/enabled`);
    }

    /**
     * 禁用
     * @param id
     */
    public disabled(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-user/${id}/disabled`);
    }

    /**
     * 退出
     * @param id
     */
    public quit(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-user/${id}/quit`);
    }

    /**
     * 删除
     * @param id
     */
    public default(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-user/${id}/default`);
    }
}