import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
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
    CreateDataInterface,
    OptionsInterface,
    Files
} from "@/typescripts/FinancialStatement/DataTypeInterface";
import FinancialStatementRequest from "@/requests/FinancialStatementRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import CreateCallbackClass from "@/typescripts/Common/Common/Objects/CreateCallbackClass";
import type {CreateCallbackInterface} from "@/typescripts/Common/Common/Interfaces/CreateCallbackInterface";

export default class CreateClass extends BaseClass implements CreateCallbackInterface{
    public indexClass: IndexClass;

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

    public data = reactive<CreateDataInterface>({
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

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public constructor(indexClass: IndexClass) {
        super();
        this.indexClass = indexClass;
    }

    /**
     * 新增
     */
    public create() {
        const _this = this;
        _this.loadingClass.show();
        new FinancialStatementRequest()
            .create({})
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.options.category = apiParams.data.formOptions.category
                    _this.options.payment_method = apiParams.data.formOptions.paymentMethod

                    _this.data.consumption_date = apiParams.data.formData.consumption_date;
                } else {
                    ElMessage.error(apiParams.message);
                }
            })
            .catch(CreateCallbackClass.failure(_this));
    }

    /**
     * 自定义上传文件覆盖原生 xhr
     */
    public handleHttpRequest() {
        const _this = this;
        return (options: UploadRequestOptions) => {
            const formData: FormData = new FormData();
            formData.append("file", options.file);
            _this.loadingClass.show();
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
            _this.loadingClass.close();
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
            _this.loadingClass.close();
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
        const handlePreview: UploadProps['onPreview'] = (uploadFile: any) => {
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
        formRef.validate((isValid: boolean) => {
            if (!isValid) {
                return;
            }
            _this.loadingClass.show();
            _this.data.files_id = _this.fileList.value.map((e: Files) => e.id);
            new FinancialStatementRequest()
                .store(_this.data)
                .then(CreateCallbackClass.success(_this))
                .catch(CreateCallbackClass.failure(_this));
        }).then(r => r);
    }

    /**
     * 关闭新增页面
     */
    public close() {
        this.indexClass.createDialogClass.close();
    }
}