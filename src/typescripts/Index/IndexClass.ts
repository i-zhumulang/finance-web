import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import * as echarts from 'echarts';
import IndexRequest from "@/requests/IndexRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import type { UnwrapNestedRefs } from "vue";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";

export default class IndexClass extends BaseClass {
    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());


    public index(): void {
        const _this = this
        type EChartsOption = echarts.EChartsOption;
        const chartDom = document.getElementById('main')!;
        const myChart = echarts.init(chartDom);

        _this.loadingClass.show();
        new IndexRequest()
            .statisticsFamily('day')
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    const option: EChartsOption = {
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b0}<br /> {a0} {c0} 元',
                        },
                        xAxis: {
                            type: 'category',
                            data: apiParams.data.xAxis.data
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        series: apiParams.data.series
                    };
                    option && myChart.setOption(option);
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