import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type { InternalRuleItem } from "async-validator/dist-types/interface";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import RegisterRequest from "@/requests/RegisterRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";
import RsaEncrypt from "@/typescripts/Common/Encrypt/Rsa/RsaEncrypt";
import type { registerFormData } from "@/typescripts/Register/RegisterInterface";

export default class RegisterClass extends BaseClass {
    public options = reactive({
        loading: false
    });

    /**
     * 验证密码
     * @param rule
     * @param value
     * @param callback
     */
    private password = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (this.data.passwordConfirm != '') {
            if (this.data.passwordConfirm != value) {
                callback(new Error("两次输入密码不一致!"));
            }
            callback();
        } else {
            callback();
        }
    };

    /**
     * 验证确认密码
     * @param rule
     * @param value
     * @param callback
     */
    private passwordConfirm = (rule: InternalRuleItem, value: string, callback: any) => {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.data.password) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    };

    public formRef = ref<FormInstance>();

    /**
     * 表单数据
     */
    public data = reactive<registerFormData>({
        account: "",
        password: "",
        passwordConfirm: "",
    });

    /**
     * 验证规则
     */
    public rule = reactive<FormRules>({
        account: [
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
        password: [
            {
                required: true,
                message: "密码不能为空",
                trigger: "blur",
            },
            {
                min: 6,
                max: 30,
                message: "密码长度必须为6到30字符",
                trigger: "blur",
            },
            {validator: this.password, trigger: "blur"},
        ],
        passwordConfirm: [
            {
                required: true,
                message: "确认密码不能为空",
                trigger: "blur",
            },
            {
                min: 6,
                max: 30,
                message: "密码长度必须为6到30字符",
                trigger: "blur",
            },
            {validator: this.passwordConfirm, trigger: "blur"},
        ]
    });

    /**
     *
     * @param formRef
     */
    public register(formRef: FormInstance | undefined) {
        if (formRef === undefined) {
            return false;
        }
        const _this = this;
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            _this.options.loading = true;
            new RegisterRequest()
                .register(_this.getFormData())
                .then(function (response: AxiosResponse) {
                    _this.options.loading = false;
                    const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                    if (apiParams.flag === "Success") {
                        ElMessage({
                            type: "success",
                            message: "注册成功",
                            onClose: function () {
                                return _this.router.push({name: "Login"});
                            }
                        });
                    } else {
                        ElMessage.error(apiParams.message);
                    }
                })
                .catch((error: AxiosError) => {
                    _this.options.loading = false;
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
     *
     * @private
     */
    private getFormData(): registerFormData {
        const _this = this;
        const formData = {
            account: _this.data.account,
            password: _this.data.password,
            passwordConfirm: _this.data.passwordConfirm,
        };
        formData.password = new RsaEncrypt().encrypt(formData.password);
        formData.passwordConfirm = new RsaEncrypt().encrypt(formData.passwordConfirm);
        return formData;
    }

    /**
     * 跳转登录页面
     */
    public toLogin() {
        return this.router.push({name: "Login"});
    }
}