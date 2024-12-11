import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/Category/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { UpdateDataInterface, OptionsInterface } from "@/typescripts/Category/DataTypeInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import CategoryRequest from "@/requests/CategoryRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import UpdateCallbackClass from "@/typescripts/Common/Common/Objects/UpdateCallbackClass";
import type {CreateCallbackInterface} from "@/typescripts/Common/Common/Interfaces/CreateCallbackInterface";

export default class UpdateClass extends BaseClass implements CreateCallbackInterface{
    public indexClass: IndexClass;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        category: [],
    });

    public data = reactive<UpdateDataInterface>({
        parent_id: undefined,
        name: '',
    });

    private name = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入分类名称"));
        } else if (value) {
            const minLength = 1;
            const maxLength = 10;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error(`请输入${minLength}~${maxLength}字符的分类名称`));
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
     * 编辑
     */
    public edit(): void {
        const _this = this;
        const params = _this.indexClass.params.value;
        _this.loadingClass.show();
        new CategoryRequest()
            .edit(params.id)
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    if (apiParams.data.formData.parent_id) {
                        _this.data.parent_id = apiParams.data.formData.parent_id;
                    }
                    _this.data.name = apiParams.data.formData.name
                    _this.options.category = apiParams.data.formOptions.category
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
        formRef.validate((isValid: boolean) => {
            if (!isValid) {
                return;
            }
            _this.loadingClass.show();
            new CategoryRequest()
                .update(params.id, _this.data)
                .then(UpdateCallbackClass.success(_this))
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
     * 关闭页面
     */
    public close() {
        this.indexClass.updateDialogClass.close();
    }
}