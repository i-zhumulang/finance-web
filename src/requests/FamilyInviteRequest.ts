import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class FamilyInviteRequest <T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 列表数据
     * @param formData
     */
    public index(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-invite", {params: formData});
    }

    /**
     * 列表数量
     * @param formData
     */
    public count(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-invite/count", {params: formData});
    }

    /**
     * 搜索、表格头部参数
     * @param formData
     */
    public options(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family-invite/options", {params: formData});
    }

    /**
     * 新增-保存
     * @param formData
     */
    public store(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/family-invite", formData);
    }

    /**
     * 接受
     * @param id
     */
    public accept(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-invite/accept/${id}`);
    }

    /**
     * 拒绝
     * @param id
     */
    public refuse(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-invite/refuse/${id}`);
    }

    /**
     * 删除
     * @param id
     */
    public cancel(id: number) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family-invite/cancel/${id}`);
    }
}