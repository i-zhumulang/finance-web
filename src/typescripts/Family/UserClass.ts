import type IndexClass from "@/typescripts/Family/IndexClass";
import { reactive } from "vue";
import type { UnwrapNestedRefs } from "vue";
import LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import FamilyRequest from "@/requests/FamilyRequest";
import type { AxiosError, AxiosResponse } from "axios";
import type ApiParamsInterface from "@/typescripts/Common/Common/Interfaces/ApiParamsInterface";
import { ElMessage } from "element-plus";

export default class UserClass {
    public indexClass: IndexClass;

    public data = reactive({
        table: {
            index: []
        }
    });

    public loadingClass: UnwrapNestedRefs<LoadingClass> = reactive<LoadingClass>(new LoadingClass());

    public constructor(indexClass: IndexClass) {
        this.indexClass = indexClass;
    }

    public init() {
        const _this = this;
        _this.loadingClass.show();
        new FamilyRequest()
            .user(_this.indexClass.params.value.id)
            .then((response: AxiosResponse) => {
                _this.loadingClass.close();
                const apiParams: ApiParamsInterface = <ApiParamsInterface>response.data
                if (apiParams.flag === "Success") {
                    _this.data.table.index = apiParams.data.list;
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
}