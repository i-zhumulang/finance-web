import type {CreateCallbackInterface} from "@/typescripts/Common/Common/Interfaces/CreateCallbackInterface";
import type {AxiosResponse} from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import {ElMessage} from "element-plus";

export default class UpdateCallbackClass {
    public static success(_this: CreateCallbackInterface) {
        return (response: AxiosResponse) => {
            _this.loadingClass.close();
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
        }
    }
}