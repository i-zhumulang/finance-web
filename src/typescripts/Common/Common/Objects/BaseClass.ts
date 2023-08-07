import type { Router } from "vue-router";

export default class BaseClass {

    private _ctx: any

    private _proxy: any

    private _router!: Router

    public set ctx(ctx: any) {
        this._ctx = ctx;
    }

    public get ctx(): any {
        return this._ctx;
    }

    public set proxy(proxy: any) {
        this._proxy = proxy;
    }

    public get proxy(): any {
        return this._proxy;
    }

    public set router(router: Router) {
        this._router = router
    }

    public get router(): Router {
        return <Router>this._router;
    }
}