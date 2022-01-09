import React from 'react'
import useApi from '../_hooks/useApi';
import { ISidebarMenuConfig } from '../_interfaces/ISidebarMenuConfig';
import apiConfig from '../_config/apiConfig.json'

export const useSideBarMenuConfig = (handleClose: () => void) =>{

    const dataService = useApi({serviceUri: apiConfig.baseUrl + apiConfig.i18nController + 'app_appMenuDe', params: null});
    
    const [selectedMenu, setSelectedMenu] = React.useState<string>("");
    const [selectedSubMenu, setSelectedSubMenu] = React.useState<string>("");
    
    const handleSelectMenu = React.useCallback((key: string) =>{
        setSelectedMenu(key)
    },[])

    const handleSelectSubMenu = React.useCallback((key: string, title: string) =>{
        setSelectedSubMenu(key)
        handleClose()
        setSelectedMenu('')
        setSelectedSubMenu('')
    },[handleClose])

    const menuValues = JSON.parse(JSON.stringify(dataService.items))[0]

        const config = [] as ISidebarMenuConfig[]

        const cookingBookConfig: ISidebarMenuConfig = ({
            title: menuValues?.menuItemCookingBook,
            key: menuValues?.menuItemCookingBook,
            expanded: selectedMenu === menuValues?.menuItemCookingBook,
            sortOrder: 0,
            handleSelected: handleSelectMenu,
            items: [{
                key: menuValues?.menuSubItemAdd,
                value: menuValues?.menuSubItemAdd,
                selected: selectedSubMenu === menuValues?.menuSubItemAdd,
                path: '/cookingbook/add',
                disabled: false,
                pageTitle: "Cooking Book Add",
                sortOrder: 1,
                handleSelected: handleSelectSubMenu.bind(null, menuValues?.menuSubItemAdd, "Cooking Book Add")

            },
            {
                key: menuValues?.menuSubItemEdit,
                value: menuValues?.menuSubItemEdit,
                selected: selectedSubMenu === menuValues?.menuSubItemEdit,
                path: '/cookingbook/edit',
                disabled: false,
                pageTitle: "Cooking Book Edit",
                sortOrder: 2,
                handleSelected: handleSelectSubMenu.bind(null, menuValues?.menuSubItemEdit, "Cooking Book Edit")

            },
            {
                key: menuValues?.menuSubItemView,
                value: menuValues?.menuSubItemView,
                selected: selectedSubMenu === menuValues?.menuSubItemView,
                path: '/cookingbook/view',
                disabled: false,
                pageTitle: "Cooking Book View",
                sortOrder: 0,
                handleSelected: handleSelectSubMenu.bind(null, menuValues?.menuSubItemView, "Cooking Book View")

            }]
        })

        const administrationConfig: ISidebarMenuConfig = ({
            title: menuValues?.menuItemAdministartion,
            key: menuValues?.menuItemAdministartion,
            expanded: selectedMenu === menuValues?.menuItemAdministartion,
            sortOrder: 1,
            handleSelected: handleSelectMenu,
            items: [
                {
                    key: menuValues?.menuSubItemLogging,
                    value: menuValues?.menuSubItemLogging,
                    selected: selectedSubMenu === menuValues?.menuSubItemLogging,
                    path: '/administration/logging',
                    disabled: true,
                    pageTitle: 'Logging',
                    sortOrder: 0,
                    handleSelected: handleSelectSubMenu.bind(null, menuValues?.menuSubItemLogging, "Logging")
                }
            ]
            
        })
        cookingBookConfig.items = cookingBookConfig.items.sort((x, y) => x.sortOrder > y.sortOrder ? 1 : -1);
        config.push(cookingBookConfig)
        config.push(administrationConfig)


        return config.sort((x,y) => x.sortOrder > y.sortOrder ? 1 : -1)

}
