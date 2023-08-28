import {reactive} from "vue";
import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import type {ContainerDataInterface} from "@/typescripts/Common/Container/ContainerClassInterface";

export default class ContainerClass extends BaseClass {
    public data = reactive<ContainerDataInterface>({
        user: {
            name: ''
        },
        aside: [],
        asideActivePath: ""
    });

    /**
     * 初始化
     */
    public init(): void {
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
        this.data.aside = [
            {
                id: 10,
                name_zh: "首页",
                children: [
                    {
                        id: 101,
                        component: '/index',
                        name_zh: "控制台",
                    }
                ]
            },
            {
                id: 20,
                name_zh: "基础设置",
                children: [
                    {
                        id: 201,
                        component: '/family-user',
                        name_zh: "消费组",
                    },
                    {
                        id: 202,
                        component: '/family-invite',
                        name_zh: "消费组邀请",
                    },
                    {
                        id: 203,
                        component: '/category',
                        name_zh: "支出分类",
                    },
                    {
                        id: 204,
                        component: '/payment-method',
                        name_zh: "支付方式",
                    },
                    {
                        id: 205,
                        component: '/payment-account',
                        name_zh: "支付账号",
                    },
                ]
            },
            {
                id: 30,
                name_zh: "财务信息",
                children: [
                    {
                        id: 301,
                        component: '/financial-statement',
                        name_zh: "财务流水",
                    },
                ]
            }
        ];
    }
}