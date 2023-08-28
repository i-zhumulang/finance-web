import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class FamilyRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 新增
     * @param formData
     */
    public create(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + "/family/create", {params: formData});
    }

    /**
     * 新增-保存
     * @param formData
     */
    public store(formData: T) {
        return BaseRequest.axios.post<ApiParamsInterface>(BaseRequest.FINANCE + "/family", formData);
    }

    /**
     * 编辑
     * @param id
     */
    public edit(id: number) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + `/family/${id}/edit`);
    }

    /**
     * 编辑-保存
     * @param id
     * @param formData
     */
    public update(id: number, formData: T) {
        return BaseRequest.axios.put<ApiParamsInterface>(BaseRequest.FINANCE + `/family/${id}`, formData);
    }

    /**
     * 删除
     * @param id
     */
    public destroy(id: number) {
        return BaseRequest.axios.delete<ApiParamsInterface>(BaseRequest.FINANCE + `/family/${id}`);
    }
}