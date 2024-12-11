import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class FilesRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 列表数据
     * @param formData
     */
    public index(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE_FILE + "/files", {params: formData});
    }

    /**
     * 列表数量
     * @param formData
     */
    public count(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE_FILE + "/files/count", {params: formData});
    }

    /**
     * 搜索、表格头部参数
     * @param formData
     */
    public options(formData: T) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE_FILE + "/files/options", {params: formData});
    }
}