import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import InputTextField from '../../_components/_inputs/InputTextField'


const styles = makeStyles((theme) => ({
    menuItemContainer:{
        padding:'1vw'
    }
}))

interface IProps{
    label?: string
    value: string | number
    img?: any
    isReadonly: boolean
    fullWidth?: boolean
    isMultiRow?: boolean
    maxRows?: number
    hasSelect?: boolean
    selectElements?: JSX.Element[]
    type?: string
    hasError?: boolean
    errorText?: string
    onValueChanged?: (title: string) => void
    onSelectChanged?: (value: number) => void

}

const MenuInputComponent: React.FC<IProps> = (props) =>{

    const {label, value, isReadonly, img, fullWidth, isMultiRow, maxRows, hasSelect, selectElements, type, hasError, errorText, onSelectChanged, onValueChanged} = props

    const useStyle = styles()

    return(
            <Grid
                className={useStyle.menuItemContainer}
                container
                item
                direction='row'
                spacing={2}
                justifyContent='center'>
                <Grid
                    item
                    xs={11}
                    sm={11}
                    md={11}
                    lg={11}
                    xl={11}>
                    <InputTextField 
                        type={type?? 'string'}
                        label={label?? ""}
                        value={value}
                        isReadOnly={isReadonly}
                        multiLine={isMultiRow}
                        maxRows={maxRows}
                        fullWidth={fullWidth}
                        hasSelect={hasSelect}
                        hasErrorOption={hasError?? false}
                        errorText={errorText}
                        selectElements={selectElements}
                        onValueChange={onValueChanged} 
                        onSelect={onSelectChanged}/>
                </Grid>
            </Grid>
    )
}

export default MenuInputComponent