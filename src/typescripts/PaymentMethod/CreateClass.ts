import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/PaymentMethod/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { CreateDataInterface } from "@/typescripts/PaymentMethod/DataTypeInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import type { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import PaymentMethodRequest from "@/requests/PaymentMethodRequest";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import CreateCallbackClass from "@/typescripts/Common/Common/Objects/CreateCallbackClass";
import type {CreateCallbackInterface} from "@/typescripts/Common/Common/Interfaces/CreateCallbackInterface";

export default class CreateClass extends BaseClass implements CreateCallbackInterface {
    public indexClass: IndexClass;

    public formRef = ref<FormInstance>();

    public data = reactive<CreateDataInterface>({
        name: '',
    });

    private name = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入支付方式名称"));
        } else if (value) {
            const minLength = 2;
            const maxLength = 10;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error(`请输入${minLength}~${maxLength}字符的支付方式名称`));
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

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public constructor(indexClass: IndexClass) {
        super();
        this.indexClass = indexClass;
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
            new PaymentMethodRequest()
                .store(_this.data)
                .then(CreateCallbackClass.success(_this))
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
        }).then(r => r);
    }

    /**
     * 关闭新增页面
     */
    public close() {
        this.indexClass.createDialogClass.close();
    }
}