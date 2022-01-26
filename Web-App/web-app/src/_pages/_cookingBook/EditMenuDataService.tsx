import React from 'react'
import useApi from '../../_hooks/useApi'
import { IMenu, IMenuResponse } from '../../_interfaces/IMenu'
import apiConfig from '../../_config/apiConfig.json'
import { SetMenuCollection } from '../../_redux/_appStateStore/appStoreAccessor'
import { useDispatch } from 'react-redux'
import MenuLayout from './MenuLayout'
import { IMenuLayoutConfig } from './interfaces/IMenueLayoutConfig'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'
import useLocalStorage from '../../_hooks/useLocalStorage'
import { IButtlerConfiguration } from '../../_interfaces/IButtlerConfiguration'
import { LocalStorageKeyEnum } from '../../_enums/localStorageKeyEnum'


const EditMenuDataService: React.FC= () =>{

    const dispatch = useDispatch();

    const menuDataService = useApi<IMenuResponse>({serviceUri: apiConfig.baseUrl + apiConfig.cookingBook.getMenuCollection, params: null})
    const localStorageService = useLocalStorage<IButtlerConfiguration>();

    const valuesUrlPrefix = React.useMemo(() =>{
        return `cookingbook_cookingbook${localStorageService.getItem(LocalStorageKeyEnum.buttlerConfiguration).language?? 'En'}`
    },[localStorageService])

    const valueDataService = useApi<ICookingBookValues>({serviceUri: apiConfig.baseUrl + apiConfig.i18nController + valuesUrlPrefix, params: null}) 
    
    const saveOrUpdateRecipe = React.useCallback(async (menu: IMenu) =>{
        await menuDataService.post({serviceUri: apiConfig.baseUrl + apiConfig.cookingBook.addOrUpdateRecipe, method: 'POST', params: menu})
        .then(() =>{
          
        })
    },[menuDataService])

    const component = React.useMemo(() =>{

        const config: IMenuLayoutConfig = {
            isReadOnly: false, 
            hasFilter: true, 
            hasMenuList: true,
            componentKey: 'edit'
            }
                
        return <MenuLayout 
                    layoutConfig={config} 
                    menuCollection={menuDataService.items[0]?.menuCollection?? []}
                    values={valueDataService.items[0]}
                    handleSave={saveOrUpdateRecipe}/>
         
    },[menuDataService.items, valueDataService.items, saveOrUpdateRecipe])

    if(menuDataService.items[0] === null){

        return null
    }

    if(valueDataService.items[0] === null || valueDataService.items[0] === undefined){
        return null
    }
    
    dispatch(SetMenuCollection(menuDataService.items[0]?.menuCollection))
   
    
    return component
}

export default EditMenuDataService
