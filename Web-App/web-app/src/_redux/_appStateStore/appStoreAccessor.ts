import { IAppState } from "../../_interfaces/IAppState";
import { IMenu } from "../../_interfaces/IMenu";
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

export const mapStateToProps = (state: IAppState): IAppState =>{
    return{
        pageTitle: state.pageTitle,
        url: state.url,
        menuCollection: state.menuCollection
    }
}