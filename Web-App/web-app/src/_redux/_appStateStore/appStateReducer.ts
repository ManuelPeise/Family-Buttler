import { IAppState } from '../../_interfaces/IAppState'
import { IMenu } from '../../_interfaces/IMenu'
import {AppStateActionTypes, ActionType} from './actionTypes' 

const initialState: IAppState = {
    pageTitle: "Home",
    url: "/",
    menuCollection: [] as IMenu[]
}

const appStateReducer = (state = initialState, action: ActionType): IAppState =>{
    switch(action.type){
        case AppStateActionTypes.SETPAGETITLE:
            return{
                ...state,
                pageTitle: action.payload
            }
        case AppStateActionTypes.SETPAGEURL:
            return{
                ...state,
                url: action.payload
            }
        case AppStateActionTypes.SETMENUCOLLECTION:
            return{
                ...state,
                menuCollection: action.payload
            }
        default: return state
        }
    }

    export default appStateReducer