import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type { FinancialStatementInterface } from "@/typescripts/StatisticsFamilyDay/DataTypeInterface";
import { reactive } from "vue";
import type { UnwrapNestedRefs } from "vue";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import StatisticsFamilyDayRequest from "@/requests/StatisticsFamilyDayRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import type IndexClass from "@/typescripts/StatisticsFamilyDay/IndexClass";

export default class FinancialStatementClass extends BaseClass {
    public indexClass: IndexClass;

    public data = reactive<FinancialStatementInterface>({
        table: {
            index: []
        }
    });

    public constructor(indexClass: IndexClass) {
        super();
        this.indexClass = indexClass;
    }

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    /**
     * 列表数据
     */
    public index(): void {
        const _this = this;
        const params = _this.indexClass.params.value;
        _this.loadingClass.show();
        new StatisticsFamilyDayRequest()
            .financialStatement(params.id)
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
}