export default class DialogClass {
    private _dialog: boolean = false;

    public set dialog(dialog: boolean) {
        this._dialog = dialog;
    }

    public get dialog(): boolean {
        return this._dialog;
    }

    public show() {
        this._dialog = true;
    }

    public close() {
        this._dialog = false;
    }
}