import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class FinancialStatementRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 列表数据
     * @param formData
     */
    public index(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement", {params: formData});
    }

    /**
     * 列表数量
     * @param formData
     */
    public count(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement/count", {params: formData});
    }

    /**
     * 搜索、表格头部参数
     * @param formData
     */
    public options(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement/options", {params: formData});
    }

    /**
     * 新增
     * @param formData
     */
    public create(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement/create", {params: formData});
    }

    /**
     * 新增-保存
     * @param formData
     */
    public store(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement", formData);
    }

    /**
     * 编辑
     * @param id
     */
    public edit(id: string) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + `/financial-statement/${id}/edit`);
    }

    /**
     * 编辑-保存
     * @param id
     * @param formData
     */
    public update(id: string, formData: T) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/financial-statement/${id}`, formData);
    }

    /**
     * 删除
     * @param id
     */
    public destroy(id: string) {
        return BaseRequest.axios.delete<ApiParamsInterface>(BaseRequest.FINANCE + `/financial-statement/${id}`);
    }

    /**
     * 上传
     * @param formData
     */
    public upload(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/financial-statement/upload", formData, {"headers": {"Content-Type": "multipart/form-data"}});
    }

}