export default class LoadingClass {
    private _loading: boolean = true;

    public set loading(loading: boolean) {
        this._loading = loading
    }

    public get loading(): boolean {
        return this._loading
    }

    public show() {
        this._loading = true;
    }

    public close() {
        this._loading = false;
    }
}