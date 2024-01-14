import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import StatisticsFamilyClass from "@/typescripts/Index/StatisticsFamilyClass";
import type { TabsPaneContext } from "element-plus";

export default class IndexClass extends BaseClass {

    public activeName: string = 'statistics-family';

    private readonly _statisticsFamily: StatisticsFamilyClass;

    public constructor() {
        super();
        this._statisticsFamily = new StatisticsFamilyClass();
    }

    public get statisticsFamily(): StatisticsFamilyClass {
        return this._statisticsFamily
    }

    /**
     * tab 切换事件
     * @param tab
     * @param event
     */
    public handleClick(tab: TabsPaneContext, event: Event) {
        console.log(tab, event)
    }
}