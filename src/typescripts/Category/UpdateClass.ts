import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/Category/IndexClass";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { CategoryTableInterface, OptionsInterface } from "@/typescripts/Category/CommonInterface";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import CategoryRequest from "@/requests/CategoryRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";

export default class UpdateClass extends BaseClass {
    private _indexClass: IndexClass | undefined;

    public formRef = ref<FormInstance>();

    public options = reactive<OptionsInterface>({
        category: [],
        loading: true
    });

    public data = reactive<CategoryTableInterface>({
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
     * 编辑
     */
    public edit(): void {
        const _this = this;
        const params = _this.indexClass.params.value;
        _this.setLoadingTrue();
        new CategoryRequest()
            .edit(params.id)
            .then((response: AxiosResponse) => {
                _this.setLoadingFalse();
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
            _this.setLoadingTrue();
            new CategoryRequest()
                .update(params.id, _this.data)
                .then((response: AxiosResponse) => {
                    _this.setLoadingFalse();
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
     * 关闭页面
     */
    public close() {
        this.indexClass.setUpdateDialogFalse()
    }
}