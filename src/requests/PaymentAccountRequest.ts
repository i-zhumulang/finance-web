import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class PaymentAccountRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 列表数据
     * @param formData
     */
    public index(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/payment-account", {params: formData});
    }

    /**
     * 列表数量
     * @param formData
     */
    public count(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/payment-account/count", {params: formData});
    }

    /**
     * 搜索、表格头部参数
     * @param formData
     */
    public options(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/payment-account/options", {params: formData});
    }

    /**
     * 新增
     * @param formData
     */
    public create(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/payment-account/create", {params: formData});
    }

    /**
     * 新增-保存
     * @param formData
     */
    public store(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/payment-account", formData);
    }

    /**
     * 编辑
     * @param id
     */
    public edit(id: number) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + `/payment-account/${id}/edit`);
    }

    /**
     * 编辑-保存
     * @param id
     * @param formData
     */
    public update(id: number, formData: T) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/payment-account/${id}`, formData);
    }

    /**
     * 删除
     * @param id
     */
    public destroy(id: number) {
        return BaseRequest.axios.delete<ApiParamsInterface>(BaseRequest.FINANCE + `/payment-account/${id}`);
    }
}