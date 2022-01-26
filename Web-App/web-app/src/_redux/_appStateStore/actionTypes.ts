import { IMenu } from "../../_interfaces/IMenu"
import { ILogmessage } from "../../_pages/_administartion/_logging/interfaces/ILogmessage"

export enum AppStateActionTypes{
    'SETPAGETITLE' = 0,
    'SETPAGEURL' = 1,
    'SETMENUCOLLECTION' = 2,
    'SETMENU' = 3,
    'SETORIGINALMENU' = 4,
    'SETLOGMESSAGES' = 5
}

export type Set_PageTitle = {
    type: typeof AppStateActionTypes.SETPAGETITLE,
    payload: string
}

export type Set_PageUrl = {
    type: typeof AppStateActionTypes.SETPAGEURL,
    payload: string
}

export type Set_Menu_Collection = {
    type: typeof AppStateActionTypes.SETMENUCOLLECTION,
    payload: IMenu[]
}

export type Set_Menu = {
    type: typeof AppStateActionTypes.SETMENU,
    payload: IMenu
}

export type Set_Original_Menu = {
    type: typeof AppStateActionTypes.SETORIGINALMENU,
    payload: IMenu
}

export type SetLogMessages = {
    type: typeof AppStateActionTypes.SETLOGMESSAGES,
    payload: ILogmessage[]
}
export type ActionType = Set_PageTitle | Set_PageUrl | Set_Menu_Collection | Set_Menu | Set_Original_Menu | SetLogMessages


