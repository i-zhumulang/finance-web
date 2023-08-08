interface children {
    id: string,
    component: string,
    name_zh: string
}

interface aside {
    id: string,
    name_zh: string,
    children: children[]
}

export interface DataType {
    user: { name: string }
    module: string,
    moduleId: string,
    aside: aside[],
    asideActivePath: string
}