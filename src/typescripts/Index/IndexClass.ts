import BaseClass from "@/typescripts/Common/Common/Objects/BaseClass";
import StatisticsFamilyClass from "@/typescripts/Index/StatisticsFamilyClass";
import StatisticsCategoryClass from "@/typescripts/Index/StatisticsCategoryClass";
import StatisticsUserClass from "@/typescripts/Index/StatisticsUserClass";
import type { TabsPaneContext } from "element-plus";

export default class IndexClass extends BaseClass {

    public activeName: string = 'statistics-user';

    private readonly _statisticsUser: StatisticsUserClass;
    private readonly _statisticsFamily: StatisticsFamilyClass;
    private readonly _statisticsCategory: StatisticsCategoryClass;

    public constructor() {
        super();
        this._statisticsUser = new StatisticsUserClass();
        this._statisticsFamily = new StatisticsFamilyClass();
        this._statisticsCategory = new StatisticsCategoryClass();
    }

    public get statisticsUser(): StatisticsUserClass {
        return this._statisticsUser
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
     * @param _this
     */
    public handleClick(tab: TabsPaneContext, event: Event, _this: IndexClass) {
        console.log(tab)
        console.log(event)
        console.log(_this)
        switch (tab.paneName) {
            case 'statistics-user':
                _this.statisticsUser.index()
                break;
            case 'statistics-family':
                _this.statisticsFamily.index()
                break;
            case 'statistics-category':
                _this.statisticsCategory.index()
                break;
        }
    }
}