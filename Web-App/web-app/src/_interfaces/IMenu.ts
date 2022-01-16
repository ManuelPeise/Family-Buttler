import { MenuTypeEnum, UnitTypeEnum } from "../_enums/menuEnums"

export interface IMenuResponse{
    menuCollection: IMenu[],
    notification: INotification
}

export interface IMenu{
    id: number
    name: string,
    description: string,
    howTo: string,
    menuType: MenuTypeEnum,
    image: string
    ingredients: IIngredient[]
}

export interface INotification{
    error: string,
    errorDetails: string
}

export interface IIngredient{
    id: number,
    name: string,
    amount: number,
    unit: UnitTypeEnum
}

