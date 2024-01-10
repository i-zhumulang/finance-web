import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import * as echarts from 'echarts';
import IndexRequest from "@/requests/IndexRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";

export default class StatisticsFamilyClass extends BaseClass {

    public index(): void {
        type EChartsOption = echarts.EChartsOption;
        const chartDom = document.getElementById('main')!;
        const myChart = echarts.init(chartDom);

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