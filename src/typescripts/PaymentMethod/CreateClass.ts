import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/PaymentMethod/IndexClass";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { OptionsInterface, PaymentMethodTableInterface } from "@/typescripts/PaymentMethod/DataTypeInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import PaymentMethodRequest from "@/requests/PaymentMethodRequest";

export default class CreateClass extends BaseClass {
    private _indexClass: IndexClass | undefined;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        loading: true
    });

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

    /**
     * 表单校验规则
     */
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

    public setLoadingTrue(): void {
        this.options.loading = true;
    }

    public setLoadingFalse(): void {
        this.options.loading = false;
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
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            _this.setLoadingTrue();
            new PaymentMethodRequest()
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