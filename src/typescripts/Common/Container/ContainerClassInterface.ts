interface ChildrenInterface {
    id: number,
    component: string,
    name_zh: string
}

interface AsideInterface {
    id: number,
    name_zh: string,
    children: ChildrenInterface[]
}

export interface ContainerDataInterface {
    user: { name: string }
    aside: AsideInterface[],
    asideActivePath: string
}