import {reactive} from "vue";
import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type {DataType} from "@/typescripts/Common/Container/ContainerClassInterface";

export default class ContainerClass extends BaseClass {
    public data = reactive<DataType>({
        user: {
            name: ''
        },
        module: "",
        moduleId: "",
        aside: [],
        asideActivePath: ""
    });

    /**
     * 当前模块
     */
    public appKey: string = '';

    /**
     * 权限类型
     */
    public appType: string = '';

    /**
     * 初始化
     */
    public init(): void {
        this.appKey = <string>this.router.currentRoute.value.query.app;
        this.appType = <string>this.router.currentRoute.value.query.type;
        const currentPath = this.router.currentRoute.value.path;
        this.setAsideActivePath(currentPath);
        this.initAside();
    }

    /**
     * 退出
     */
    public logout() {

    }

    /**
     * 设置当前点击菜单
     * @param path
     */
    public setAsideActivePath(path: string): void {
        this.data.asideActivePath = this.getUri(path);
    }

    /**
     * 获取当前点击菜单
     */
    public getAsideActivePath(): string {
        return this.data.asideActivePath;
    }

    /**
     * 拼接路由
     * @param uri
     */
    public getUri(uri: string): string {
        return uri
    }

    /**
     * 初始化左侧菜单
     */
    public initAside(): void {
        this.data.aside = [];
    }
}