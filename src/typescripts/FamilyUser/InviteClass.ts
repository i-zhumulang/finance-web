import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type IndexClass from "@/typescripts/FamilyUser/IndexClass";
import { reactive, ref } from "vue";
import type { UnwrapNestedRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { InviteDataInterface } from "@/typescripts/FamilyUser/DataTypeInterface";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import FamilyInviteRequest from "@/requests/FamilyInviteRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";

export default class InviteClass extends BaseClass {
    public indexClass: IndexClass;

    public formRef = ref<FormInstance>();

    public data = reactive<InviteDataInterface>({
        mobile: '',
    });

    /**
     * 表单校验规则
     */
    public rule = reactive<FormRules>({
        mobile: [
            {
                message: "手机号码不能为空",
                required: true,
                trigger: "blur",
            },
            {
                min: 11,
                max: 11,
                message: "手机号码长度错误",
                trigger: "blur",
            },
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
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            _this.loadingClass.show();
            new FamilyInviteRequest()
                // 这里需要加上选中的组ID
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
        this.indexClass.inviteDialogClass.close();
    }
}