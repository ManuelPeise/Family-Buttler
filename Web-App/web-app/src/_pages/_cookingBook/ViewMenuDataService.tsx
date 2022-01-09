import React from 'react'
import useApi from '../../_hooks/useApi'
import { IMenu, IMenuResponse } from '../../_interfaces/IMenu'
import apiConfig from '../../_config/apiConfig.json'
import { SetMenuCollection, SetPageTitle } from '../../_redux/_appStateStore/appStoreAccessor'
import { useDispatch } from 'react-redux'
import MenuLayout from './MenuLayout'
import { IMenuLayoutConfig } from './interfaces/IMenueLayoutConfig'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'

const ViewMenuDataService: React.FC= () =>{

    const dispatch = useDispatch();
    
    const [selectedMenuId, setSelectedMenuId] = React.useState<number>(0)

    const menuDataService = useApi<IMenuResponse>({serviceUri: apiConfig.baseUrl + apiConfig.cookingBook.getMenuCollection, params: null})
    
    const valueDataService = useApi<ICookingBookValues>({serviceUri: apiConfig.baseUrl + apiConfig.i18nController + "cookingbook_cookingbookEn", params: null}) 
    
    const handleMenuSelect = React.useCallback((id: number | null) =>{
        if(id !== null)
        setSelectedMenuId(id)
    },[setSelectedMenuId])

    const handleSave = React.useCallback(async (menu: IMenu) =>{

    },[])

    const selectedMenu = React.useMemo(() =>{
        return menuDataService.items[0]?.menuCollection?.find(menu => menu.id === selectedMenuId) ?? {} as IMenu
    },[selectedMenuId, menuDataService])
    
    const component = React.useMemo(() =>{
       
        const config: IMenuLayoutConfig = {
            isReadOnly: true, 
            hasFilter: true, 
            hasMenuList: true,
            selectedMenuId: selectedMenuId,
            componentKey: 'view'
            }
                
        return <MenuLayout 
                    layoutConfig={config}
                    selectedMenu={selectedMenu}
                    menuCollection={menuDataService.items[0]?.menuCollection?? []}
                    values={valueDataService.items[0]}
                    handleSelectMenu={handleMenuSelect}
                    handleSave={handleSave} />
         
    },[menuDataService.items, valueDataService.items, selectedMenuId, selectedMenu, handleMenuSelect, handleSave])

    if(menuDataService.items[0] === null){

        return null
    }

    if(valueDataService.items[0] === null || valueDataService.items[0] === undefined){
        return null
    }

    dispatch(SetMenuCollection(menuDataService.items[0]?.menuCollection))
    dispatch(SetPageTitle(valueDataService.items[0].pageTitleView))
    return component
}

export default ViewMenuDataService