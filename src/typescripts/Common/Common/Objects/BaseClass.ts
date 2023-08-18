import type { Router } from "vue-router";
import type { ComponentPublicInstance } from "vue";

export default class BaseClass {

    private _proxy: ComponentPublicInstance | undefined

    private _router!: Router

    public set proxy(proxy: ComponentPublicInstance | undefined) {
        this._proxy = proxy;
    }

    public get proxy(): ComponentPublicInstance | undefined {
        return this._proxy;
    }

    public set router(router: Router) {
        this._router = router
    }

    public get router(): Router {
        return <Router>this._router;
    }
}