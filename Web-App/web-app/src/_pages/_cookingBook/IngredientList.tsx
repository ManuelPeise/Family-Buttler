import React from 'react'
import {Grid, List} from '@material-ui/core'
import SubHeaderBar from '../../_components/_appBars/subHeader'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'
import { IIngredient } from '../../_interfaces/IMenu'
import IngrdientListtem from './IngredientListItem'
import {AddRounded} from '@material-ui/icons'
import { Tooltip } from '@mui/material'

interface IProps{
    ingredients: IIngredient[]
    isReadOnly: boolean
    values: ICookingBookValues
    unitTypes: JSX.Element[]
    title?: string
    onIngredientsChanged: (ingredient: IIngredient[]) => void
    handleAddIngredient: () => void
}


const IngrdientList: React.FC<IProps> = (props) => {

    const {ingredients, isReadOnly, values, unitTypes, title, onIngredientsChanged, handleAddIngredient} = props

    const onIngredientChanged = React.useCallback((ingredient: IIngredient) =>{
        const copy = ingredients?.slice()
        const index = copy?.findIndex(x => x.id === ingredient.id)
        copy[index] = ingredient
        onIngredientsChanged(copy)
    },[ingredients, onIngredientsChanged])

    const ingredientList = React.useMemo(() =>{
        return(
            <List style={{width: '90%', padding: '2vh', marginTop:'1.5vh'}}>
                {ingredients?.length &&  ingredients?.map((ingredient, index) => {
                    return(
                        <IngrdientListtem 
                                key={index} 
                                values={values} 
                                ingredient={ingredient} 
                                unitTypeItems={unitTypes}
                                isReadOnly = {isReadOnly}
                                onIngredientChanged={onIngredientChanged}/>
                    )
                })}
            </List>
        )
    },[isReadOnly, ingredients, values, unitTypes, onIngredientChanged])

    const addIcon = React.useMemo(() =>{
        return(
            <Tooltip title={title?? ""}>
                <AddRounded onClick = {handleAddIngredient}/>
            </Tooltip>
        )
    },[title, handleAddIngredient])

    return(
        <Grid
            style={{display:'flex', justifyContent: 'center', marginTop:'2vh'}}
            container>
            <SubHeaderBar 
                title={values.ingrdients}
                icon={addIcon} 
                variant='h5' 
                isReadonly={isReadOnly}/>
            {ingredientList}
        </Grid>
    )
}

export default IngrdientList