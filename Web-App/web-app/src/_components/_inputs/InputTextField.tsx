import React from 'react'
import {TextField} from '@material-ui/core'

interface IProps{
    value: string | number
    type?: string
    label: string
    maxRows?: number
    multiLine?: boolean
    fullWidth?: boolean
    isReadOnly?:boolean
    hasSelect?: boolean
    selectElements?: JSX.Element[]
    hasErrorOption?: boolean
    errorText?: string
    onValueChange?: (value: string) => void
    onSelect?: (value: number) => void
}

const InputTextField: React.FC<IProps> = (props) =>{

    const {value, type, label, maxRows, multiLine, fullWidth,isReadOnly, hasSelect, selectElements, hasErrorOption, errorText, onSelect, onValueChange} = props
    
    const handleValueChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>{
        
        if(onValueChange !== undefined)
            onValueChange(e.currentTarget.value as string)
    },[onValueChange])

    const onSelectChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>{
        if(onSelect !== undefined){
            onSelect(parseInt(e.currentTarget.id))
        }
    },[onSelect])
    
    return(
        <TextField
            disabled={isReadOnly}
            fullWidth = {fullWidth}
            multiline={multiLine}
            maxRows={maxRows}
            label = {label}
            type={type?? 'text'}
            value={value}
            select={hasSelect}
            error = {hasErrorOption}
            helperText={hasErrorOption && errorText?.length ? errorText : ""}
            onChange={hasSelect === undefined ? handleValueChanged : onSelectChanged}>
            {hasSelect && (
               selectElements?.map((element) =>{
                   return element
               })
            )}
        </TextField>
    )
}

export default InputTextField