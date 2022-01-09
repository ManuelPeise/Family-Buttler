import { IMenu } from "../../_interfaces/IMenu"

export enum AppStateActionTypes{
    'SETPAGETITLE' = 0,
    'SETPAGEURL' = 1,
    'SETMENUCOLLECTION' = 2
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

export type ActionType = Set_PageTitle | Set_PageUrl | Set_Menu_Collection

