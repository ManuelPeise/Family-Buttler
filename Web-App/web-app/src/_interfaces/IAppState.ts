import { IMenu } from "./IMenu";

export interface IAppState{
    pageTitle: string,
    url: string,
    menuCollection: IMenu[]
    menu: IMenu
}