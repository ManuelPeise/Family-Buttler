import React from 'react'
import MenuInputComponent from './MenueInputComponent'
import {IIngredient, IMenu} from '../../_interfaces/IMenu'
import { MenuTypeEnum } from '../../_enums/menuEnums'
import { Grid, MenuItem, Button } from '@material-ui/core'
import IngrdientList from './IngredientList'
import SubHeaderBar from '../../_components/_appBars/subHeader'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'
import { IMenuLayoutConfig } from './interfaces/IMenueLayoutConfig'
import ImageInput from '../../_components/_inputs/ImageInput'
import noImg from '../../img/no-pic.png'
import { useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../../_interfaces/IAppState'
import { SetMenu } from '../../_redux/_appStateStore/appStoreAccessor'

interface IProps{
    values: ICookingBookValues
    config: IMenuLayoutConfig
    menuCollection: IMenu[]
    handleSave: (menu: IMenu) => Promise<void>
}

const MenuContainer: React.FC<IProps> = (props) =>{

    const {values, config, menuCollection, handleSave} = props

    const menu = useSelector<IAppState, IMenu>(state => state.menu)

    const dispatch = useDispatch();

    // maybe set original state to redux
    const original = React.useMemo(() =>{
        return menu
    },[menu])

    const existingMenuNames = React.useMemo(() =>{
        return menuCollection.map((menu) =>{
            return menu.name.toLocaleLowerCase()
        })
    },[menuCollection])

    const menuNameAlreadyExists = React.useMemo(() =>{
        return existingMenuNames.findIndex(x => x.normalize() === menu?.name?.toLocaleLowerCase().normalize()) !== -1
    },[menu.name, existingMenuNames])

    const isValidMenu = React.useMemo(() =>{
        return(
            menu.name !== "" && menuNameAlreadyExists === false
            && menu.description !== ""
            && menu.menuType !== MenuTypeEnum.None
            && menu?.ingredients?.length > 0
        )
    },[menu, menuNameAlreadyExists])

    const isEqualIngrdient = (original: IIngredient, modified: IIngredient) => {
        return original?.amount === modified?.amount && original?.name === modified?.name && original?.unit === modified?.unit
    } 

    const ingredientsEqual = React.useCallback(() =>{
        
        const equal = original?.ingredients?.map((ingredient, index) =>{

            return isEqualIngrdient(ingredient, menu?.ingredients[index])
        })
        
        return equal?.filter(x => x === true)?.length === original?.ingredients?.length

    },[original?.ingredients, menu?.ingredients])

    const disabled = React.useMemo(() =>{
        if(config.componentKey === 'add'){
            return isValidMenu === false
        }
    
        if(config.componentKey === 'edit'){

            console.log(original)
            if(menu?.name === undefined){
                return true
            }

            return (
            menu.description === original.description)
            // || menu.howTo !== original.howTo
            // || menu.menuType !== original.menuType
            // || menu.ingredients.length < original.ingredients.length
            // || menu.ingredients.length > original.ingredients.length)
        }

        return true
       
    },[config, menu, original, ingredientsEqual, isValidMenu])

    const onTitleChanged = React.useCallback((name: string) =>{
        const data: IMenu = {...menu, name}
       
        dispatch(SetMenu(data))
    },[menu, dispatch])

    const onDescriptionChanged = React.useCallback((description: string) =>{
        const data: IMenu = {...menu, description}
        dispatch(SetMenu(data))
    },[menu, dispatch])

    const onHowToChanged = React.useCallback((howTo: string) =>{
        const data: IMenu = {...menu, howTo}
        dispatch(SetMenu(data))
    },[menu, dispatch])

    const onMenuTypeChanged = React.useCallback((value: number) =>{
        const data: IMenu = {...menu, menuType: value}
        dispatch(SetMenu(data))
    },[menu, dispatch])

    const onIngredientChanged = React.useCallback((ingredients: IIngredient[]) =>{
        dispatch(SetMenu({...menu, ingredients: ingredients}))
    },[menu, dispatch])

    const menuTypes = React.useMemo(() => {
        const elements = [] as JSX.Element[]

        elements.push(<MenuItem key={-1} id ='-1' value={-1} selected={menu.menuType === MenuTypeEnum.None}>{values.select}</MenuItem>)
        elements.push(<MenuItem key={0} id = '0' value={0} selected={menu.menuType === MenuTypeEnum.Pasta}>{values.recipePasta}</MenuItem>)
        elements.push(<MenuItem key={1} id = '1' value={1} selected={menu.menuType === MenuTypeEnum.Meat}>{values.recipeMeat}</MenuItem>)
        elements.push(<MenuItem key={2} id = '2' value={2} selected={menu.menuType === MenuTypeEnum.Soup}>{values.recipeSoup}</MenuItem>)
        elements.push(<MenuItem key={3} id = '3' value={3} selected={menu.menuType === MenuTypeEnum.Pastries}>{values.recipePastries}</MenuItem>)

        return elements
    },[menu.menuType, values])

    const unitTypes = React.useMemo(() => {
        const elements = [] as JSX.Element[]

        elements.push(<MenuItem key={-1} id ='-1' value={-1}>{values.select}</MenuItem>)
        elements.push(<MenuItem key={3} id = '3' value={3}>{values.unitGram}</MenuItem>)
        elements.push(<MenuItem key={2} id = '2' value={2}>{values.unitKilo}</MenuItem>)
        elements.push(<MenuItem key={0} id = '0' value={0}>{values.unitLiter}</MenuItem>)
        elements.push(<MenuItem key={1} id = '1' value={1}>{values.unitMilliliters}</MenuItem>)
        elements.push(<MenuItem key={7} id = '7' value={7}>{values.unitPiece}</MenuItem>)
        elements.push(<MenuItem key={4} id = '4' value={4}>{values.unitTablespoon}</MenuItem>)
        elements.push(<MenuItem key={5} id = '5' value={5}>{values.unitTeaspoon}</MenuItem>)

        return elements
    },[values])

    const handleAddIngredient = React.useCallback(() => {
        const update: IMenu = {...menu, ingredients: menu.ingredients?? [] as IIngredient[]}
        
        update.ingredients.push({id: menu?.ingredients?.length} as IIngredient)
        dispatch(SetMenu(update))

    },[menu, dispatch])

    const onCancel = React.useCallback(() =>{
        dispatch(SetMenu({...original, ingredients: original?.ingredients?.filter(x => x.id !== -1)}))
    },[original, dispatch])

    const onSave = React.useCallback(async () => {
        await handleSave(menu)
        dispatch(SetMenu({} as IMenu))
    },[menu, handleSave, dispatch])

    return(
        <Grid
            container
            item
            justifyContent='center'
            xs={11}
            xl={11}>
            <Grid
                item
                xs = {12}
                container>
                <SubHeaderBar title={values.recipe} variant='h5'/>
                <Grid
                    xs={12}
                    sm={8}
                    item>
                        <MenuInputComponent
                                    label={values.name}
                                    value={menu?.name?? ""}
                                    fullWidth={true} 
                                    isReadonly={config.isReadOnly && (config.componentKey === 'view' || config.componentKey === 'edit')}
                                    hasError={menuNameAlreadyExists && config.componentKey === 'add'}
                                    errorText={menuNameAlreadyExists && config.componentKey === 'add' ? "Menu already exists!" : ""}
                                    onValueChanged={onTitleChanged} />
                        <MenuInputComponent
                                    label={values.description}
                                    isMultiRow={true}
                                    maxRows={5}
                                    fullWidth={true} 
                                    value={menu?.description?? ""} 
                                    isReadonly={config.isReadOnly}
                                    onValueChanged={onDescriptionChanged}/>
                        <MenuInputComponent
                                    label={values.hoTo}
                                    isMultiRow={true}
                                    maxRows={20}
                                    fullWidth={true} 
                                    value={menu?.howTo?? ""} 
                                    isReadonly={config.isReadOnly}
                                    onValueChanged={onHowToChanged}/>
                        <MenuInputComponent
                                    label={values.menuType}
                                    isMultiRow={true}
                                    maxRows={5}
                                    fullWidth={true} 
                                    value={menu.menuType ?? -1} 
                                    isReadonly={config.isReadOnly}
                                    hasSelect={true}
                                    selectElements={menuTypes}
                                    onSelectChanged={onMenuTypeChanged}/>
                </Grid>
                <Grid
                    xs={12}
                    sm={4}
                    item>
                    <ImageInput 
                        isReadOnly={config.isReadOnly}
                        width={200}
                        height={200}
                        noImageSrc={noImg}
                        menu={menu}
                    />

                </Grid>
            </Grid>
            <Grid
                item
                xs={12}>
                    <IngrdientList
                        title={values.addIngredient} 
                        values={values} 
                        ingredients={menu.ingredients}
                        unitTypes={unitTypes}
                        isReadOnly= {config.isReadOnly}
                        onIngredientsChanged={onIngredientChanged}
                        handleAddIngredient={handleAddIngredient}/>
            </Grid>
            {!config.isReadOnly && (
            <Grid
                justifyContent='flex-end'
                style={{margin: '2vw'}}
                container>
                    <Button disabled={disabled} onClick={onCancel}>Cancel</Button>
                    <Button disabled={disabled} onClick={onSave}>Save</Button>
            </Grid>
            )}
        </Grid>
    )
}

export default MenuContainer  