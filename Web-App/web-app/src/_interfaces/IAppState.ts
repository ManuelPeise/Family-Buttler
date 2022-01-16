import { IMenu } from "./IMenu";

export interface IAppState{
    pageTitle: string,
    url: string,
    cookingBook: ICookingBookState
}

export interface ICookingBookState{
    menuCollection: IMenu[]
    selectedMenu: IMenu
    originalMenu: IMenu
}