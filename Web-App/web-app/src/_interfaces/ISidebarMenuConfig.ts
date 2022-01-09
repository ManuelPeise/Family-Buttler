export interface ISidebarMenuConfig{
    key: string
    title: string
    expanded: boolean
    items: IMenuItem[]
    sortOrder: number
    handleSelected: (key: string) => void
}

export interface IMenuItem{
    key: string
    pageTitle: string
    value: string
    path: string
    selected: boolean
    disabled: boolean
    sortOrder: number
    handleSelected: (key: string) => void
}