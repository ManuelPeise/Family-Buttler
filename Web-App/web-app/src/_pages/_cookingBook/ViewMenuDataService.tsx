import React from 'react'
import useApi from '../../_hooks/useApi'
import { IMenu, IMenuResponse } from '../../_interfaces/IMenu'
import apiConfig from '../../_config/apiConfig.json'
import { SetMenuCollection } from '../../_redux/_appStateStore/appStoreAccessor'
import { useDispatch } from 'react-redux'
import MenuLayout from './MenuLayout'
import { IMenuLayoutConfig } from './interfaces/IMenueLayoutConfig'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'

const ViewMenuDataService: React.FC= () =>{

    const dispatch = useDispatch();
    
    const menuDataService = useApi<IMenuResponse>({serviceUri: apiConfig.baseUrl + apiConfig.cookingBook.getMenuCollection, params: null})
    
    const valueDataService = useApi<ICookingBookValues>({serviceUri: apiConfig.baseUrl + apiConfig.i18nController + "cookingbook_cookingbookEn", params: null}) 

    const handleSave = React.useCallback(async (menu: IMenu) =>{

    },[])

    const component = React.useMemo(() =>{
       
        const config: IMenuLayoutConfig = {
            isReadOnly: true, 
            hasFilter: true, 
            hasMenuList: true,
            componentKey: 'view'
            }
                
        return <MenuLayout 
                    layoutConfig={config}
                    menuCollection={menuDataService.items[0]?.menuCollection?? []}
                    values={valueDataService.items[0]}
                    handleSave={handleSave} />
         
    },[menuDataService.items, valueDataService.items, handleSave])

    if(menuDataService.items[0] === null){

        return null
    }

    if(valueDataService.items[0] === null || valueDataService.items[0] === undefined){
        return null
    }

    dispatch(SetMenuCollection(menuDataService.items[0]?.menuCollection))
    
    return component
}

export default ViewMenuDataService