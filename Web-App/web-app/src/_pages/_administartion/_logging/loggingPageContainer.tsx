import React from 'react'
import LogTable from '../../../_components/_virtualized/_table/Table';
import { AutoSizer, Index } from 'react-virtualized';
import TableColunm from '../../../_components/_virtualized/_table/TableColunm';
import { Button, Grid } from '@material-ui/core';
import TableCell from '../../../_components/_virtualized/_table/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { SetPageTitle } from '../../../_redux/_appStateStore/appStoreAccessor';
import { ILogMessageTableState } from './loggingDataService';
import { IAppState } from '../../../_interfaces/IAppState';
import { ILogmessage } from './interfaces/ILogmessage';
import { getLogMessageRow } from '../mapper';

interface IProps{
    selectedItems: ILogMessageTableState
    handleSelectedItems: (items: number[]) => void
    handleSelectAll: () => void
    deleteLogmessages: () => Promise<void>
    onCancel: () => void
}

const LoggingPageContainer: React.FC<IProps> = (props) =>{

    const {selectedItems, handleSelectedItems, handleSelectAll, onCancel, deleteLogmessages} = props

    const dispatch = useDispatch();
    const messages = useSelector<IAppState, ILogmessage[]>(state => state.logMessages)

    dispatch(SetPageTitle("Administration - Logging"))
    
    const logMessageRows = React.useMemo(() =>{
        return messages.map((item) =>{
            return getLogMessageRow(item)
        })
    },[messages])

    const rowGetter = React.useCallback((row: Index) =>{
        return logMessageRows[row.index]
    },[logMessageRows])

    const cellRenderer = React.useCallback((cellData: any, dataKey: string, index: number) =>{
        return(
            <TableCell id={logMessageRows[index].id} value={cellData} selectedItems={selectedItems.ids} hasCheckbox={dataKey==='id'} handleSelectedItems={handleSelectedItems} />
        )
    },[selectedItems, logMessageRows, handleSelectedItems])

    return(
        <Grid container>
            <Grid
                item
                xs={12}>
                <AutoSizer>
                    {({width, height}) =>(
                    <LogTable 
                        height={height} 
                        width={width} 
                        rowHeight={50} 
                        rowCount={logMessageRows.length} 
                        headerHeight={100}
                        logmessages={logMessageRows}
                        getRow={rowGetter}
                        >
                        {TableColunm({key: "0", dataKey: 'id', width: 150, headerValue:"ID", state: selectedItems, itemCount: logMessageRows.length,  customCellRenderer: cellRenderer, handleSelectAll: handleSelectAll })}
                        {TableColunm({key: "1", dataKey: 'timeStamp', width: 300, headerValue: "Date", state: selectedItems, itemCount: logMessageRows.length, customCellRenderer: cellRenderer, handleSelectAll: handleSelectAll})}
                        {TableColunm({key: "2", dataKey: 'messageType', width: 300, headerValue: "Type", state: selectedItems, itemCount: logMessageRows.length, customCellRenderer: cellRenderer, handleSelectAll: handleSelectAll})}
                        {TableColunm({key: "3", dataKey: 'message', width: 500, headerValue: "Message", state: selectedItems, itemCount: logMessageRows.length,customCellRenderer: cellRenderer, handleSelectAll: handleSelectAll})}
                        {TableColunm({key: "4", dataKey: 'exception', width: 500, headerValue: "Details", state: selectedItems, itemCount: logMessageRows.length, customCellRenderer: cellRenderer, handleSelectAll: handleSelectAll})}
                    </LogTable>
                )}
                </AutoSizer>
            </Grid>
            {logMessageRows?.length > 0 &&(
            <Grid
                item
                style={{display:'flex', justifyContent:'flex-end', paddingRight:'2rem'}}
                xs={12}>
                <Button disabled={selectedItems.ids.length === 0} onClick={onCancel}>Cancel</Button>
                <Button disabled={selectedItems.ids.length === 0} onClick={deleteLogmessages}>Save</Button>
            </Grid>
            )}
        </Grid>
    )
}

export default LoggingPageContainer