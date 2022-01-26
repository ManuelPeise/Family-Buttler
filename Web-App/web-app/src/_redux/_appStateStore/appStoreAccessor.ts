import { IAppState } from "../../_interfaces/IAppState";
import { IMenu } from "../../_interfaces/IMenu";
import { ILogmessage } from "../../_pages/_administartion/_logging/interfaces/ILogmessage";
import { ActionType, AppStateActionTypes } from "./actionTypes";

export const SetPageTitle = (title: string): ActionType => {
    return{
        type: AppStateActionTypes.SETPAGETITLE,
        payload: title
    }
}

export const SetPageUrl = (url: string) : ActionType => {
    return{
        type: AppStateActionTypes.SETPAGEURL,
        payload: url
    }
}

export const SetMenuCollection = (collection: IMenu[]): ActionType =>{
    return{
        type: AppStateActionTypes.SETMENUCOLLECTION,
        payload: collection
    }
}

export const SetMenu = (menu: IMenu): ActionType =>{
    return{
        type: AppStateActionTypes.SETMENU,
        payload: menu
    }
}

export const SetOriginalMenu = (menu: IMenu): ActionType =>{
    return{
        type: AppStateActionTypes.SETORIGINALMENU,
        payload: menu
    }
}

export const SetLogMessages = (messages: ILogmessage[]) =>{
    return{
        type: AppStateActionTypes.SETLOGMESSAGES,
        payload: messages
    }
}

export const mapStateToProps = (state: IAppState): IAppState =>{
    return{
        pageTitle: state.pageTitle,
        url: state.url,
        cookingBook: state.cookingBook,
        logMessages: state.logMessages
    }
}
