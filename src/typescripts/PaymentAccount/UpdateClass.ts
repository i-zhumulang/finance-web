import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/PaymentAccount/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { UpdateDataInterface, OptionsInterface } from "@/typescripts/PaymentAccount/DataTypeInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import PaymentAccountRequest from "@/requests/PaymentAccountRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";

export default class UpdateClass extends BaseClass {
    public indexClass: IndexClass;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        payment_method: [],
    });

    public data = reactive<UpdateDataInterface>({
        payment_method_id: undefined,
        name: '',
        account: '',
    });

    private name = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入账号名称"));
        } else if (value) {
            const minLength = 1;
            const maxLength = 10;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error(`请输入${minLength}~${maxLength}字符的账号名称`));
            }
            callback();
        } else {
            callback();
        }
    };

    private account = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入账号"));
        } else if (value) {
            const minLength = 2;
            const maxLength = 30;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error(`请输入${minLength}~${maxLength}字符的账号`));
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
        name: [
            {validator: this.name, trigger: "blur"},
        ],
        account: [
            {validator: this.account, trigger: "blur"},
        ]
    });

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public constructor(indexClass: IndexClass) {
        super();
        this.indexClass = indexClass;
    }

    /**
     * 编辑
     */
    public edit(): void {
        const _this = this;
        const params = _this.indexClass.params.value;
        _this.loadingClass.show();
        new PaymentAccountRequest()
            .edit(params.id)
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    if (apiParams.data.formData.payment_method_id) {
                        _this.data.payment_method_id = apiParams.data.formData.payment_method_id
                    }
                    _this.data.name = apiParams.data.formData.name
                    _this.data.account = apiParams.data.formData.account

                    _this.options.payment_method = apiParams.data.formOptions.paymentMethod
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
            _this.loadingClass.show();
            new PaymentAccountRequest()
                .update(params.id, _this.data)
                .then((response: AxiosResponse) => {
                    _this.loadingClass.close();
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
                    _this.loadingClass.close();
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
        this.indexClass.updateDialogClass.close()
    }
}