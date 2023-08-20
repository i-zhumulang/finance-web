import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { IndexDataInterface } from "@/typescripts/FamilyInvite/DataTypeInterface";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";
import DialogClass from "@/typescripts/Common/Common/Objects/DialogClass";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import FamilyInviteRequest from "@/requests/FamilyInviteRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";

export default class IndexClass extends BaseClass {
    public data = reactive<IndexDataInterface>({
        query: {
            offset: 1,
            limit: PaginationClass.indexPageSize
        },
        table: {
            index: [],
            count: 0
        },
        options: {
            operate: []
        },
    });

    public params: any = ref({});

    public createDialogClass: UnwrapNestedRefs<DialogClass> = reactive<DialogClass>(new DialogClass());

    public updateDialogClass: UnwrapNestedRefs<DialogClass> = reactive<DialogClass>(new DialogClass());

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public search(): void {
        const _this = this;
        _this.index();
        _this.count();
    }

    /**
     * 列表数据
     */
    public index() {
        const _this = this;
        _this.loadingClass.show();
        new FamilyInviteRequest()
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
    public count() {
        const _this = this;
        new FamilyInviteRequest()
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
    public options() {
        const _this = this;
        new FamilyInviteRequest()
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
    public event(e: string, params: any = null) {
        console.log(e);
        console.log(params);
        this.params.value = params;
        switch (e) {
            case 'create':
                this.createDialogClass.show()
                break;
            case 'accept':
                this.accept();
                break;
            case 'refuse':
                this.refuse();
                break;
            case 'cancel':
                this.cancel()
                break;
            default:
                ElMessage.error('功能暂未开放[' + e + ']');
        }
    }

    /**
     * 接受
     */
    public accept() {
        const _this = this;
        const params = _this.params.value;
        ElMessageBox.confirm('确认接受?', "提示", {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning',
            draggable: true,
        })
            .then(() => {
                const loadingInstance = ElLoading.service({fullscreen: true});
                new FamilyInviteRequest()
                    .accept(params.id)
                    .then((response: AxiosResponse) => {
                        loadingInstance.close();
                        const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                        if (apiParams.flag === "Success") {
                            ElMessage({
                                type: "success",
                                message: apiParams.message,
                                onClose: function () {
                                    _this.search()
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
                    });
            })
            .catch(() => {
                ElMessage.info("取消操作")
            });
    }

    /**
     * 拒绝
     */
    public refuse() {
        const _this = this;
        const params = _this.params.value;
        ElMessageBox.confirm('拒绝后需要对方重复邀请,确认拒绝?', "提示", {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning',
            draggable: true,
        })
            .then(() => {
                const loadingInstance = ElLoading.service({fullscreen: true});
                new FamilyInviteRequest()
                    .refuse(params.id)
                    .then((response: AxiosResponse) => {
                        loadingInstance.close();
                        const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                        if (apiParams.flag === "Success") {
                            ElMessage({
                                type: "success",
                                message: apiParams.message,
                                onClose: function () {
                                    _this.search()
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
                    });
            })
            .catch(() => {
                ElMessage.info("取消操作")
            });
    }

    /**
     * 撤回
     */
    public cancel() {
        const _this = this;
        const params = _this.params.value;
        ElMessageBox.confirm('撤回后无法恢复,确认撤回?', "提示", {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning',
            draggable: true,
        })
            .then(() => {
                const loadingInstance = ElLoading.service({fullscreen: true});
                new FamilyInviteRequest()
                    .cancel(params.id)
                    .then((response: AxiosResponse) => {
                        loadingInstance.close();
                        const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                        if (apiParams.flag === "Success") {
                            ElMessage({
                                type: "success",
                                message: apiParams.message,
                                onClose: function () {
                                    _this.search()
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
                    });
            })
            .catch(() => {
                ElMessage.info("取消操作")
            });
    }
}