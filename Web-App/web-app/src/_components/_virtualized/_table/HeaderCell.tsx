import { Checkbox, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { ILogMessageTableState } from '../../../_pages/_administartion/_logging/loggingDataService'

const styles = makeStyles({
    col:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        fontSize: '1.5rem',
        padding: '1rem',
        
    },
    cell:{
        '&:hover':{
            cursor: 'pointer'
        }
    }
})

interface IProps{
    value: string
    state: ILogMessageTableState
    hasCheckbox: boolean
    itemCount: number
    handleSelectAll: () => void
}

const HeaderCell: React.FC<IProps> = (props) =>{

    const {value, hasCheckbox, state, itemCount, handleSelectAll} = props
    const useStyle = styles()

    const handleSelect = React.useCallback(() =>{
       
        handleSelectAll()
    },[handleSelectAll])

    const cellComponent = React.useMemo(() =>{
        return(
            <Grid
                className={useStyle.cell}
                container>
        {hasCheckbox && (
            <Tooltip title='delete all'>
                <Checkbox
                    disabled={itemCount === 0} 
                    checked={state.allSelected} 
                    indeterminate={state.ids.length !== itemCount && state.allSelected} 
                    onChange={handleSelect}/>
            </Tooltip>
        )}
        {!hasCheckbox &&(
        <Tooltip title={value}>
            <Typography>{value}</Typography>
        </Tooltip>
        )}
    </Grid>)
    },[state, hasCheckbox, useStyle, value, itemCount, handleSelect])

    return(cellComponent)
}

export default HeaderCell