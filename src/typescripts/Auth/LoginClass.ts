import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import AuthRequest from "@/requests/AuthRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import {ElMessage} from "element-plus";
import RsaEncrypt from "@/typescripts/Common/Encrypt/Rsa/RsaEncrypt";
import type { loginFormData } from "@/typescripts/Auth/LoginClassInterface";
import { useUser } from "@/stores/Auth/User";

export default class LoginClass extends BaseClass {
    public formRef = ref<FormInstance>();

    public data = reactive({
        account: "18120827456",
        password: "18120827456",
    });

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
        ],
    });

    /**
     * 登录
     * @param formRef
     */
    public login(formRef: FormInstance | undefined) {
        if (formRef === undefined) {
            return false;
        }
        const _this = this;
        formRef.validate((valid: boolean) => {
            if (!valid) {
                return false;
            }
            new AuthRequest<loginFormData>()
                .login(_this.getFormData())
                .then((response: AxiosResponse) => {
                    const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data;
                    if (apiParams.flag === "Success") {
                        ElMessage({
                            type: "success",
                            message: "登录成功",
                            onClose: function () {
                                const userStore = useUser();
                                userStore.setUser(apiParams.data);
                                _this.router.push({name: "Module"});
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
     * 获取表单数据
     * @private
     */
    private getFormData(): loginFormData {
        const _this = this;
        return {
            account: _this.data.account,
            password: new RsaEncrypt().encrypt(_this.data.password),
        };
    }

    /**
     * 跳转注册页面
     */
    public toRegister() {
        return this.router.push({name: "Register"});
    }
}