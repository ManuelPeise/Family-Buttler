import React from 'react'
import {IIngredient} from '../../_interfaces/IMenu'
import {Grid, makeStyles} from '@material-ui/core'
import MenuInputComponent from './MenueInputComponent'
import { ICookingBookValues } from '../../_interfaces/ICookingBookValues'

const styles = makeStyles({
    ingrdient_root:{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '83vw',
        overflow:'hidden'
    },
    item:{
    }
})

interface IProps{
    ingredient: IIngredient
    isReadOnly: boolean
    values: ICookingBookValues
    unitTypeItems: JSX.Element[]
    onIngredientChanged: (ingredient: IIngredient) => void
}


const IngrdientListtem: React.FC<IProps> = (props) => {

    const {ingredient, isReadOnly, values, unitTypeItems, onIngredientChanged} = props

    const useStyle = styles()

    const handleAmountChanged = React.useCallback((value: string) => {
       
        onIngredientChanged({...ingredient, amount: parseInt(value)})
    },[ingredient, onIngredientChanged])

    const handleNameChanged = React.useCallback((value: string) => {
        
        onIngredientChanged({...ingredient, name: value})
    },[ingredient, onIngredientChanged])

    const handleUnitChanged = React.useCallback((value: number) => {
       
        onIngredientChanged({...ingredient, unit: value})
    },[ingredient, onIngredientChanged])



    return(
       <Grid 
            container
            justifyContent='center'
            className={useStyle.ingrdient_root}>
                <Grid
                    className={useStyle.item}
                    xs={2}
                    item>
                    <MenuInputComponent
                        label={values.amount}
                        fullWidth={true}
                        type='number'
                        value={ingredient?.amount?? ''}
                        isReadonly= {isReadOnly}
                        onValueChanged={handleAmountChanged}/>
                </Grid>
                <Grid
                    className={useStyle.item}
                    xs={6}
                    item>
                     <MenuInputComponent
                        label={values.unit}
                        fullWidth={true}
                        value={ingredient?.unit?? ''}
                        isReadonly= {isReadOnly}
                        hasSelect={true}
                        onSelectChanged={handleUnitChanged}
                        selectElements={unitTypeItems}
                        />
                </Grid>
                <Grid
                    className={useStyle.item}
                    xs={4}
                    item>
                    <MenuInputComponent
                        label={values.name}
                        fullWidth={true}
                        value={ingredient?.name?? ''}
                        isReadonly= {isReadOnly}
                        onValueChanged={handleNameChanged}/>
                </Grid>
        </Grid>
    )
}

export default IngrdientListtem