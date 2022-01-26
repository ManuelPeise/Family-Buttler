import { IAppState } from '../../_interfaces/IAppState'
import { IMenu } from '../../_interfaces/IMenu'
import {AppStateActionTypes, ActionType} from './actionTypes' 

const initialState: IAppState = {
    pageTitle: "Home",
    url: "/",
    cookingBook: {menuCollection: [], selectedMenu: {} as IMenu, originalMenu: {} as IMenu},
    logMessages:[]
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
                cookingBook: {...state.cookingBook, menuCollection: action.payload}
            }
        case AppStateActionTypes.SETMENU:
            return{
                ...state,
                cookingBook: {...state.cookingBook, selectedMenu: action.payload}
            }
        case AppStateActionTypes.SETORIGINALMENU:
            return{
                ...state,
                cookingBook: {...state.cookingBook, originalMenu: action.payload}
            }
        case AppStateActionTypes.SETLOGMESSAGES:
            return{
                ...state,
                logMessages: action.payload
            }
        default: return state
        }
    }

    export default appStateReducer