interface query {
    object_id: string
}

interface index {
    behavior: string,
    created_by_name: string,
    created_at_format: string,
    behavior_before_text: string,
    behavior_after_text: string,
}

export default interface LogsClassInterface {
    query: query,
    table: {
        index: index[],
        count: number
    },
}