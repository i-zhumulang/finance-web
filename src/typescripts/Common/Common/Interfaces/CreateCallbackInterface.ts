import type LoadingClass from "@/typescripts/Common/Common/Objects/LoadingClass";
import type {IndexInterface} from "@/typescripts/Common/Common/Interfaces/IndexInterface";
import type {UnwrapNestedRefs} from "vue";

export interface CreateCallbackInterface {
    loadingClass: UnwrapNestedRefs<LoadingClass>;

    close(): void;

    indexClass: IndexInterface;
}