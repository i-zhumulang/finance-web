import BaseRequest from "@/requests/BaseRequest";
import type BaseParamsInterface from "@/typescripts/Common/Common/Interfaces/BaseParamsInterface";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class IndexRequest<T extends BaseParamsInterface> extends BaseRequest {
    /**
     * 消费组每日消费
     * @param type
     */
    public statisticsFamily(type: string) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + `/index/statistics-family/${type}`);
    }

    /**
     * 支出分类每日消费
     * @param type
     */
    public statisticsCategory(type: string) {
        return BaseRequest.axios.get<ApiParamsInterface>(BaseRequest.FINANCE + `/index/statistics-category/${type}`);
    }
}