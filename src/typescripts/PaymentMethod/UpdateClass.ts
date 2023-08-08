import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/PaymentMethod/IndexClass";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { PaymentMethodTableInterface } from "@/typescripts/PaymentMethod/CommonInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import PaymentMethodRequest from "@/requests/PaymentMethodRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";

export default class UpdateClass extends BaseClass {
    private _indexClass: IndexClass | undefined;

    public formRef = ref<FormInstance>();

    public data = reactive<PaymentMethodTableInterface>({
        name: '',
    });

    private name = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入支付方式名称"));
        } else if (value) {
            const minLength = 2;
            const maxLength = 30;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error("请输入2~30字符的支付方式名称"));
            }
            callback();
        } else {
            callback();
        }
    };

    public rule = reactive<FormRules>({
        name: [
            {validator: this.name, trigger: "blur"},
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
        new PaymentMethodRequest()
            .edit(params.id)
            .then((response: AxiosResponse) => {
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.name = apiParams.data.formData.name
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
            new PaymentMethodRequest()
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