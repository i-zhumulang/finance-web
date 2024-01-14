import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import StatisticsFamilyClass from "@/typescripts/Index/StatisticsFamilyClass";
import type { TabsPaneContext } from "element-plus";
import StatisticsCategoryClass from "@/typescripts/Index/StatisticsCategoryClass";

export default class IndexClass extends BaseClass {

    public activeName: string = 'statistics-family';

    private readonly _statisticsFamily: StatisticsFamilyClass;
    private readonly _statisticsCategory: StatisticsCategoryClass;

    public constructor() {
        super();
        this._statisticsFamily = new StatisticsFamilyClass();
        this._statisticsCategory = new StatisticsCategoryClass();
    }

    public get statisticsFamily(): StatisticsFamilyClass {
        return this._statisticsFamily
    }

    public get statisticsCategory(): StatisticsCategoryClass {
        return this._statisticsCategory
    }

    /**
     * tab 切换事件
     * @param tab
     * @param event
     */
    public handleClick(tab: TabsPaneContext, event: Event) {
        console.log(tab.paneName, event)
    }
}