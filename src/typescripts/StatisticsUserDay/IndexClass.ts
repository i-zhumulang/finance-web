import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type { IndexDataInterface } from "@/typescripts/StatisticsUserDay/DataTypeInterface";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import StatisticsUserDayRequest from "@/requests/StatisticsUserDayRequest";

export default class IndexClass extends BaseClass {
    public data = reactive<IndexDataInterface>({
        query: {
            offset: 1,
            limit: PaginationClass.indexPageSize,
            family_id: 0,
        },
        table: {
            index: [],
            count: 0
        },
        options: {
            family: []
        }
    });

    public params: any = ref({});

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public search(): void {
        const _this = this;
        _this.index();
        _this.count();
    }

    /**
     * 列表数据
     */
    public index(): void {
        const _this = this;
        _this.loadingClass.show();
        new StatisticsUserDayRequest()
            .index(_this.data.query)
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.table.index = apiParams.data.list;
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch((error: AxiosError) => {
                _this.loadingClass.close();
                if (error.code === "ERR_BAD_RESPONSE") {
                    if (error.response) {
                        ElMessage.error(error.response.statusText);
                    }
                } else {
                    ElMessage.error(error.message);
                }
            });
    }

    /**
     * 列表数量
     */
    public count(): void {
        const _this = this;
        new StatisticsUserDayRequest()
            .count(_this.data.query)
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.table.count = parseInt(apiParams.data.count);
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch((error: AxiosError) => {
                if (error.code === "ERR_BAD_RESPONSE") {
                    if (error.response) {
                        ElMessage.error(error.response.statusText);
                    }
                } else {
                    ElMessage.error(error.message);
                }
            });
    }

    public options(): void {
        const _this = this;
        new StatisticsUserDayRequest()
            .options({})
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.options.family = apiParams.data.options.family;
                    _this.data.query.family_id = apiParams.data.query.family_id;
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch((error: AxiosError) => {
                if (error.code === "ERR_BAD_RESPONSE") {
                    if (error.response) {
                        ElMessage.error(error.response.statusText);
                    }
                } else {
                    ElMessage.error(error.message);
                }
            });
    }

    /**
     *
     * @param currentPageId
     */
    public currentChange(currentPageId: number): void {
        this.data.query.offset = currentPageId;
        this.index();
    }

    /**
     * 事件
     * @param e
     * @param params
     */
    public event(e: string, params: any = null): void {
        this.params.value = params;
        switch (e) {
            default:
                ElMessage.error('功能暂未开放[' + e + ']');
        }
    }
}