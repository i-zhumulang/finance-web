import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import { reactive, ref } from "vue";
import type { IndexDataInterface, IndexDialogInterface } from "@/typescripts/PaymentAccount/IndexDialogInterface";
import PaginationClass from "@/typescripts/Common/Common/Objects/PaginationClass";
import PaymentAccountRequest from "@/requests/PaymentAccountRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage, ElMessageBox } from "element-plus";

export default class IndexClass extends BaseClass {
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
            operate: []
        }
    });

    public params: any = ref({});

    public dialog = reactive<IndexDialogInterface>({
        /**
         * 添加页面弹出层
         */
        dialogCreateVisible: false,
        /**
         * 编辑页面弹出层
         */
        dialogUpdateVisible: false,
        /**
         * 日志页面弹出层
         */
        dialogLogsVisible: false,
    });

    public setCreateDialogTrue() {
        this.dialog.dialogCreateVisible = true;
    }

    public getCreateDialog(): boolean {
        return this.dialog.dialogCreateVisible;
    }

    public setCreateDialogFalse() {
        this.dialog.dialogCreateVisible = false;
    }

    public setUpdateDialogTrue() {
        this.dialog.dialogUpdateVisible = true;
    }

    public getUpdateDialog(): boolean {
        return this.dialog.dialogUpdateVisible;
    }

    public setUpdateDialogFalse() {
        this.dialog.dialogUpdateVisible = false;
    }

    public setLogsDialogTrue() {
        this.dialog.dialogLogsVisible = true;
    }

    public getLogsDialog(): boolean {
        return this.dialog.dialogLogsVisible;
    }

    public setLogsDialogFalse() {
        this.dialog.dialogLogsVisible = false;
    }

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
        new PaymentAccountRequest()
            .index(_this.data.query)
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.table.index = apiParams.data.list;
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
     * 列表数量
     */
    public count() {
        const _this = this;
        new PaymentAccountRequest()
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
        new PaymentAccountRequest()
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
        this.params.value = params;
        switch (e) {
            case 'create':
                this.setCreateDialogTrue()
                break;
            case 'update':
                this.setUpdateDialogTrue()
                break;
            case 'destroy':
                this.destroy()
                break;
            case 'logs':
                this.setLogsDialogTrue();
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
                new PaymentAccountRequest()
                    .destroy(params.id)
                    .then((response: AxiosResponse) => {
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