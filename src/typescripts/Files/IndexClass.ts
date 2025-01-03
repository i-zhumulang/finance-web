import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type {IndexInterface} from "@/typescripts/Common/Common/Interfaces/IndexInterface";
import {reactive, ref} from "vue";
import type {UnwrapNestedRefs} from "vue";
import type {IndexDataInterface} from "@/typescripts/Files/DataTypeInterface";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import FilesRequest from "@/requests/FilesRequest";
import type {AxiosError, AxiosResponse} from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";

export default class IndexClass extends BaseClass implements IndexInterface {
    public data = reactive<IndexDataInterface>({
        query: {
            offset: 1,
            limit: PaginationClass.indexPageSize,
        },
        table: {
            index: [],
            count: 0
        },
        options: {
            operate: [],
        },
    })

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
        new FilesRequest()
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
        _this.loadingClass.show();
        new FilesRequest()
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

    /**
     * 搜索、表格头部参数
     */
    public options(): void {
        const _this = this;
        new FilesRequest()
            .options({})
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.options.operate = apiParams.data.operate;
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
    public currentChange(currentPageId: number) {
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
            case 'destroy':
                this.destroy()
                break;
            default:
                ElMessage.error('功能暂未开放[' + e + ']');
        }
    }

    /**
     * 删除
     */
    public destroy() {
        const _this = this;
        const params = _this.params.value;
        ElMessageBox.confirm('删除后无法恢复,确认删除?', "提示", {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning',
            draggable: true,
        })
            .then(() => {
                const loadingInstance = ElLoading.service({fullscreen: true});
                new FilesRequest()
                    .destroy(params.id)
                    .then((response: AxiosResponse) => {
                        loadingInstance.close();
                        const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                        if (apiParams.flag === "Success") {
                            ElMessage({
                                type: "success",
                                message: apiParams.message,
                                onClose: function () {
                                    _this.index();
                                    _this.count();
                                }
                            });
                        } else {
                            ElMessage.error(apiParams.message);
                        }
                    })
                    .catch((error: AxiosError) => {
                        loadingInstance.close();
                        if (error.code === "ERR_BAD_RESPONSE") {
                            if (error.response) {
                                ElMessage.error(error.response.statusText);
                            }
                        } else {
                            ElMessage.error(error.message);
                        }
                    })
            })
            .catch(() => {
                ElMessage.info("取消操作")
            });
    }
}