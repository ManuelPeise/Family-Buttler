import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import { IAutocompleteItem } from '../../_interfaces/IAutocompleteItem';

interface IProps{
    items: IAutocompleteItem[]
    title:string
    handleChange: (id: number|null) => void
}

const AutocompleteInput: React.FC<IProps> = (props) =>{

    const {items, title, handleChange} = props

    const onChange = React.useCallback((e: React.ChangeEvent<{}>, item: IAutocompleteItem | null) =>{
        handleChange(item?.id?? null)
    },[handleChange])

    return(
        <Autocomplete
            options={items}
            noOptionsText="???"
            getOptionLabel={(x) => x.label}
            onChange={(e: React.ChangeEvent<{}>, item: IAutocompleteItem | null) => onChange(e, item)}
            renderInput={(params) => <TextField {...params} label={title}/>}
            />
    )
}

export default AutocompleteInput