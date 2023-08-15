import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import { reactive, ref } from "vue";
import type {
    FormInstance,
    FormRules,
    UploadFile,
    UploadFiles,
    UploadProps,
    UploadRequestOptions
} from "element-plus";
import { ElMessage } from "element-plus";
import type {
    FinancialStatementTableInterface,
    OptionsInterface,
    Files
} from "@/typescripts/FinancialStatement/CommonInterface";
import FinancialStatementRequest from "@/requests/FinancialStatementRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";

export default class CreateClass extends BaseClass {
    private _indexClass: IndexClass | undefined;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        category: [],
        payment_method: [],
        payment_account: [],
        loading: true
    });

    public dialog = reactive({
        dialogVisible: false,
        dialogImageUrl: ""
    });

    public fileList = ref<Files[]>([]);

    public data = reactive<FinancialStatementTableInterface>({
        category_id: undefined,
        payment_account_id: undefined,
        amount: 0,
        consumption_date: '',
        description: '',
        files_id: []
    });

    private description = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value) {
            const minLength = 0;
            const maxLength = 255;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error("请输入0~255个字符的备注"));
            }
            callback();
        } else {
            callback();
        }
    };

    /**
     * 表单校验规则
     */
    public rule = reactive<FormRules>({
        category_id: [
            {required: true, message: "请选择支出分类", trigger: "change"}
        ],
        payment_account_id: [
            {required: true, message: "请选择支付账号", trigger: "change"}
        ],
        amount: [
            {required: true, min: 0.01, max: 99999.99, type: "number", message: "请输入消费金额", trigger: "blur"}
        ],
        consumption_date: [
            {required: true, message: "请选择消费日期", trigger: "change"}
        ],
        description: [
            {required: false, validator: this.description, trigger: "blur"}
        ],
    });

    public set indexClass(indexClass: IndexClass) {
        this._indexClass = indexClass;
    }

    public get indexClass(): IndexClass {
        return <IndexClass>this._indexClass;
    }

    public setLoadingTrue(): void {
        this.options.loading = true;
    }

    public setLoadingFalse(): void {
        this.options.loading = false;
    }

    /**
     * 新增
     */
    public create() {
        const _this = this;
        _this.setLoadingTrue();
        new FinancialStatementRequest()
            .create({})
            .then((response: AxiosResponse) => {
                _this.setLoadingFalse();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.options.category = apiParams.data.formOptions.category
                    _this.options.payment_method = apiParams.data.formOptions.paymentMethod

                    _this.data.consumption_date = apiParams.data.formData.consumption_date;
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch((error: AxiosError) => {
                _this.setLoadingFalse();
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
     * 自定义上传文件覆盖原生 xhr
     */
    public handleHttpRequest() {
        const _this = this;
        return (options: UploadRequestOptions) => {
            const formData: FormData = new FormData();
            formData.append("file", options.file);
            _this.setLoadingTrue();
            return new FinancialStatementRequest()
                .upload(formData);
        };
    }

    /**
     * 上传文件成功钩子
     */
    public handleSuccess() {
        const _this = this;
        const handleSuccess: UploadProps['onSuccess'] = (response: AxiosResponse, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            _this.setLoadingFalse();
            _this.fileList.value.push(response.data.data);
        }
        return handleSuccess;
    }

    /**
     * 上传文件失败钩子
     */
    public handleError() {
        const _this = this;
        const handleError: UploadProps['onError'] = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
            _this.setLoadingFalse();
            console.log(error);
            console.log(uploadFile);
            console.log(uploadFiles);
        }
        return handleError;
    }

    /**
     * 预览
     */
    public handlePreview() {
        const _this = this;
        const handlePreview: UploadProps['onPreview'] = (uploadFile:any) => {
            _this.dialog.dialogVisible = true;
            _this.dialog.dialogImageUrl = uploadFile.url
        }
        return handlePreview;
    }

    /**
     * 删除图片
     */
    public handleRemove() {
        const _this = this;
        const handleRemove: UploadProps['onRemove'] = (uploadFile: any, uploadFiles: UploadFiles) => {
            const fileId = uploadFile.id;
            let index: any;
            for (index in _this.fileList.value) {
                if (_this.fileList.value[index]) {
                    if (_this.fileList.value[index].id === fileId) {
                        _this.fileList.value.splice(index, 1);
                    }
                }
            }
        }
        return handleRemove;
    }

    /**
     * 新增-保存
     * @param formRef
     */
    public store(formRef: FormInstance | undefined) {
        if (formRef === undefined) {
            return false;
        }
        const _this = this;
        console.log(_this.fileList);
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            _this.setLoadingTrue();
            _this.data.files_id = _this.fileList.value.map((e: Files) => e.id);
            new FinancialStatementRequest()
                .store(_this.data)
                .then((response: AxiosResponse) => {
                    _this.setLoadingFalse();
                    const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                    if (apiParams.flag === "Success") {
                        ElMessage({
                            type: "success",
                            message: apiParams.message,
                            onClose: function () {
                                _this.close();
                                _this.indexClass.search()
                            }
                        });
                    } else {
                        ElMessage.error(apiParams.message);
                    }
                })
                .catch((error: AxiosError) => {
                    _this.setLoadingFalse();
                    if (error.code === "ERR_BAD_RESPONSE") {
                        if (error.response) {
                            ElMessage.error(error.response.statusText);
                        }
                    } else {
                        ElMessage.error(error.message);
                    }
                });
        });
    }

    /**
     * 关闭新增页面
     */
    public close() {
        this.indexClass.setCreateDialogFalse();
    }
}