export default class PaginationClass {
    /**
     * 数据列表分页
     */
    public static indexPageSize = 20;

    /**
     * 日志数据列表分页
     */
    public static logsPageSize = 10;

    public static indexLayout = ' ->, total,prev, pager, next';

    public static logsLayout = ' ->, total, prev, pager, next';
}