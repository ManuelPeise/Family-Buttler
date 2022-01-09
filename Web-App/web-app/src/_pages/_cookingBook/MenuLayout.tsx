import {  Grid, Paper } from '@material-ui/core'
import React from 'react'
import { IMenu } from '../../_interfaces/IMenu'
import { IMenuLayoutConfig } from './interfaces/IMenueLayoutConfig'
import MenuFilter from './MenuFilter'
import MenuContainer from './MenuContainer'
import { IAutocompleteItem } from '../../_interfaces/IAutocompleteItem'
import { MenuTypeEnum } from '../../_enums/menuEnums'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'


interface IProps{
   layoutConfig: IMenuLayoutConfig
   selectedMenu: IMenu
   menuCollection: IMenu[]
   values: ICookingBookValues
   handleSelectMenu: (id: number | null) => void
   handleSave:(menu: IMenu) => Promise<void>
}

const MenuLayout: React.FC<IProps> = (props) => {

    const {layoutConfig, menuCollection, selectedMenu, values, handleSelectMenu, handleSave} = props
    
    const [menuType, setMenuType] = React.useState<number>(MenuTypeEnum.None)

    const onMenuTypeChange = React.useCallback((menuType: number) =>{
        setMenuType(menuType)
    }, [setMenuType])

    const filteredMenus = React.useMemo(() =>{

        if(menuType === MenuTypeEnum.None){
            return menuCollection
        }

        return menuCollection.filter(menu => menu.menuType === menuType)
    },[menuType, menuCollection])

    const filterItems = React.useMemo((): IAutocompleteItem[] =>{
       
        return filteredMenus.map((item) =>{
            return(
                {id: item.id, label: item.name}
            )
        })
            
    },[filteredMenus])

    return(
            <Grid
                container
                style={{overflow: 'auto'}}
                direction='row'
                justifyContent='center'
                alignContent='center'>
                    {layoutConfig.hasFilter && (
                    <Grid
                        style={{marginTop: '1.5vh'}}
                        item
                        xs={11}
                        xl={11}>
                        <Paper style={{backgroundColor: '#f2f2ed'}}>
                            <MenuFilter
                                items={filterItems}
                                selectedMenuType={menuType}
                                values={values}
                                onMenuSelect={handleSelectMenu}
                                onMenuTypeChange={onMenuTypeChange}/>
                        </Paper>
                    </Grid>
                    )}
                    <Grid
                        style={{marginTop: '1.5vh'}}
                        item
                        xs={11}
                        xl={11}>
                        <Paper style={{display:'flex', justifyContent:'center', padding:'1vw'}}>
                            <MenuContainer 
                                selectedMenu={selectedMenu ?? {} as IMenu} 
                                values={values}
                                config={layoutConfig}
                                menuCollection={filteredMenus}
                                handleSave={handleSave}/>
                        </Paper>
                    </Grid>
            </Grid>
    )
}

export default MenuLayout
