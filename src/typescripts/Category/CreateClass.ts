import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/Category/IndexClass";
import {reactive, ref} from "vue";
import type {UnwrapNestedRefs} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import type {CreateDataInterface, OptionsInterface} from "@/typescripts/Category/DataTypeInterface";
import CategoryRequest from "@/requests/CategoryRequest";
import type {AxiosError, AxiosResponse} from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import {ElMessage} from "element-plus";
import type {InternalRuleItem} from "async-validator/dist-types/interface";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import type {CreateCallbackInterface} from "@/typescripts/Common/Common/Interfaces/CreateCallbackInterface";
import CreateCallbackClass from "@/typescripts/Common/Common/Objects/CreateCallbackClass";

export default class CreateClass extends BaseClass implements CreateCallbackInterface {
    public indexClass: IndexClass;

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
            .catch(CreateCallbackClass.failure(_this));
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
            if (_this.data.parent_id === undefined) {
                _this.data.parent_id = 0;
            }
            _this.loadingClass.show();
            new CategoryRequest()
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