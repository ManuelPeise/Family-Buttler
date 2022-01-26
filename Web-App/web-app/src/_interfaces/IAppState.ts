import { ILogmessage } from "../_pages/_administartion/_logging/interfaces/ILogmessage";
import { IMenu } from "./IMenu";

export interface IAppState{
    pageTitle: string,
    url: string,
    cookingBook: ICookingBookState
    logMessages: ILogmessage[]
}

export interface ICookingBookState{
    menuCollection: IMenu[]
    selectedMenu: IMenu
    originalMenu: IMenu
}