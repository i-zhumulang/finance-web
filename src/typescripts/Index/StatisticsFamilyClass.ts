import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import * as echarts from 'echarts';
import IndexRequest from "@/requests/IndexRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import type { Index } from "@/typescripts/Index/DataTypeInterface";
import { ref } from "vue";

export default class StatisticsFamilyClass extends BaseClass implements Index {

    public statisticsFamilyRef = ref();

    public index(): void {
        type EChartsOption = echarts.EChartsOption;
        const myChart = echarts.init(this.statisticsFamilyRef.value);
        myChart.resize({height: 700, width: 1599})

        myChart.showLoading('default', {text: 'loading'});
        new IndexRequest()
            .statisticsFamily('day')
            .then((response: AxiosResponse) => {
                myChart.hideLoading();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    const option: EChartsOption = apiParams.data;
                    option && myChart.setOption(option);
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch((error: AxiosError) => {
                myChart.hideLoading();
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