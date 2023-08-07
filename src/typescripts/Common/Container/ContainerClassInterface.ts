interface children {
    id: string,
    component: string,
    nameZh: string
}

interface aside {
    id: string,
    nameZh: string,
    children: children[]
}

export interface DataType {
    user: { name: string }
    module: string,
    moduleId: string,
    aside: aside[],
    asideActivePath: string
}