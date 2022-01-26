import { Checkbox, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React from 'react'

const styles = makeStyles({
    cell:{
        '&:hover':{
            cursor: 'pointer'
        }
    }
})

interface IProps{
    id: number
    hasCheckbox?: boolean
    value: string
    selectedItems: number[]
    handleSelectedItems: (id: number[]) => void

}

const TableCell: React.FC<IProps> = (props) => {

    const {id, hasCheckbox, selectedItems, value, handleSelectedItems} = props

    const useStyle = styles()

    const selectedIndex = selectedItems.findIndex(x => x === id)

    console.log(selectedIndex)

    const handleSelect = React.useCallback((id: number) =>{
        if(selectedIndex === -1){
            const copy = selectedItems
            copy.push(id)
            handleSelectedItems(copy)
        }else{
            const copy = selectedItems
            copy.splice(selectedItems.findIndex(x => x === id))
            handleSelectedItems(copy)
        }
    },[selectedItems, selectedIndex, handleSelectedItems])

    const cellComponent = React.useMemo(() =>{
        return(
            <Grid
                className={useStyle.cell}
                container>
                {hasCheckbox && (
                    <Tooltip title='delete'>
                        <Checkbox checked={selectedIndex !== -1} onChange={handleSelect?.bind(null, id)}/>
                    </Tooltip>
                )}
                {!hasCheckbox &&(
                <Tooltip title={value}>
                    <Typography>{value}</Typography>
                </Tooltip>
                )}
            </Grid>
        )
    },[handleSelect, selectedIndex, hasCheckbox, id, useStyle, value])

    return(
        cellComponent
    )
}

export default TableCell