import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/Category/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { CreateDataInterface, OptionsInterface } from "@/typescripts/Category/DataTypeInterface";
import CategoryRequest from "@/requests/CategoryRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";

export default class CreateClass extends BaseClass {
    private indexClass: IndexClass;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        category: [],
    });

    public data = reactive<CreateDataInterface>({
        parent_id: undefined,
        name: '',
    });

    private name = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请输入分类名称"));
        } else if (value) {
            const minLength = 2;
            const maxLength = 30;
            const valueLength = value.length;
            if (valueLength < minLength || valueLength > maxLength) {
                callback(new Error("请输入2~30字符的分类名称"));
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
     * 新增
     */
    public create() {
        const _this = this;
        _this.loadingClass.show();
        new CategoryRequest()
            .create({})
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.options.category = apiParams.data.category
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
            if (_this.data.parent_id === undefined) {
                _this.data.parent_id = 0;
            }
            _this.loadingClass.show();
            new CategoryRequest()
                .store(_this.data)
                .then((response: AxiosResponse) => {
                    _this.loadingClass.close();
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
     * 关闭新增页面
     */
    public close() {
        this.indexClass.createDialogClass.close();
    }
}