import { Grid, MenuItem } from '@material-ui/core'
import React from 'react'
import AutocompleteInput from '../../_components/_inputs/autocompleteInput'
import InputTextField from '../../_components/_inputs/InputTextField'
import { MenuTypeEnum } from '../../_enums/menuEnums'
import { IAutocompleteItem } from '../../_interfaces/IAutocompleteItem'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'

interface IProps{
    selectedMenuType: MenuTypeEnum
    items: IAutocompleteItem[]
    values: ICookingBookValues
    onMenuSelect: (id: number | null) => void
    onMenuTypeChange: (menuType: number) => void
}

const MenuFilter: React.FC<IProps> = (props) => {

    const { selectedMenuType, items, values, onMenuSelect, onMenuTypeChange} = props

    const menuTypeItems = React.useMemo(() =>{
        const items: JSX.Element[] = []

        items.push(<MenuItem key={-1} id ='-1' value={-1} selected={selectedMenuType === MenuTypeEnum.None}>{values.select}</MenuItem>)
        items.push(<MenuItem key={0} id = '0' value={0} selected={selectedMenuType === MenuTypeEnum.Pasta}>{values.recipePasta}</MenuItem>)
        items.push(<MenuItem key={1} id = '1' value={1} selected={selectedMenuType === MenuTypeEnum.Meat}>{values.recipeMeat}</MenuItem>)
        items.push(<MenuItem key={2} id = '2' value={2} selected={selectedMenuType === MenuTypeEnum.Soup}>{values.recipeSoup}</MenuItem>)
        items.push(<MenuItem key={3} id = '3' value={3} selected={selectedMenuType === MenuTypeEnum.Pastries}>{values.recipePastries}</MenuItem>)

        return items
    },[selectedMenuType, values])

    return (
            <Grid
                container
                style={{display: 'flex', justifyContent: 'center' }}
                direction='row'>
                <Grid
                    style={{padding:'2vw'}}
                    item
                    xs={7}
                    xl={7}>
                    <AutocompleteInput title={values.filter} items={items} handleChange={onMenuSelect} />
                </Grid >
                <Grid
                    style={{padding:'2vw', paddingRight:'2vw'}}
                    item
                    xs={4}
                    xl={4}>
                    <InputTextField 
                        label={values.menuType}
                        value={selectedMenuType ?? -1}
                        fullWidth={true} 
                        hasSelect={true}
                        selectElements={menuTypeItems}
                        onSelect={onMenuTypeChange}/>
                </Grid >
        </Grid> 
    )
}

export default MenuFilter