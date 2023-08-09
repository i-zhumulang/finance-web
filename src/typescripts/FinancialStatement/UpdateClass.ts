import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/FinancialStatement/IndexClass";
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import type {
    FinancialStatementTableInterface,
    OptionsInterface
} from "@/typescripts/FinancialStatement/CommonInterface";
import type {InternalRuleItem} from "async-validator/dist-types/interface";
import FinancialStatementRequest from "@/requests/FinancialStatementRequest";
import type {AxiosError, AxiosResponse} from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import {ElMessage} from "element-plus";

export default class UpdateClass extends BaseClass {
    private _indexClass: IndexClass | undefined;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        category: [],
        payment_method: [],
        payment_account: []
    });

    public data = reactive<FinancialStatementTableInterface>({
        category_id: undefined,
        payment_account_id: undefined,
        amount: 0,
        consumption_date: '',
        description: '',
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
            {required: true, min: 0.01, max: 99999, type: "number", message: "请输入消费金额", trigger: "blur"}
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

    /**
     * 编辑
     */
    public edit(): void {
        const _this = this;
        const params = _this.indexClass.params.value;
        new FinancialStatementRequest()
            .edit(params.id)
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    if (apiParams.data.formData.category_id) {
                        _this.data.category_id = apiParams.data.formData.category_id;
                    }
                    if (apiParams.data.formData.payment_account_id) {
                        _this.data.payment_account_id = apiParams.data.formData.payment_account_id
                    }
                    _this.data.consumption_date = apiParams.data.formData.consumption_date
                    _this.data.amount = apiParams.data.formData.amount
                    _this.data.description = apiParams.data.formData.description

                    _this.options.category = apiParams.data.formOptions.category
                    _this.options.payment_method = apiParams.data.formOptions.paymentMethod
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
     * @param formRef
     */
    public update(formRef: FormInstance | undefined) {
        if (formRef === undefined) {
            return false;
        }
        const _this = this;
        const params = _this.indexClass.params.value;
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            new FinancialStatementRequest()
                .update(params.id, _this.data)
                .then((response: AxiosResponse) => {
                    const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                    if (apiParams.flag === "Success") {
                        ElMessage({
                            type: "success",
                            message: apiParams.message,
                            onClose: function () {
                                _this.close();
                                _this.indexClass.index();
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
        });
    }

    /**
     * 关闭页面
     */
    public close() {
        this.indexClass.setUpdateDialogFalse()
    }
}