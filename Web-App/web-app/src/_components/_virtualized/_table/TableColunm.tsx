import React from "react";
import {Column, ColumnProps} from 'react-virtualized'
import { ILogMessageTableState } from "../../../_pages/_administartion/_logging/loggingDataService";
import HeaderCell from "./HeaderCell";


interface IProps extends ColumnProps{
    key: string
    dataKey: string
    headerValue: string
    state: ILogMessageTableState
    itemCount: number
    customCellRenderer: (cellData: any, dataKey: string, index: number) => JSX.Element
    handleSelectAll: () => void
}

const TableColunm: React.FC<IProps> = (props) =>{

    const {key, dataKey, width, headerValue, style, state, itemCount, customCellRenderer, handleSelectAll} = props

    return(
      
            <Column
                key={key}
                style={style}
                dataKey={dataKey} 
                width={width}
                cellRenderer={(cell) => customCellRenderer(cell.cellData, cell.dataKey, cell.rowIndex)}
                headerRenderer={() => (<HeaderCell value = {headerValue} hasCheckbox={dataKey === 'id'} itemCount={itemCount} state={state} handleSelectAll={handleSelectAll}/>)}
            />
    )
} 

export default TableColunm