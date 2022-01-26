import React from "react";
import { Index, Table as VirtualizedTable, TableProps } from "react-virtualized";
import 'react-virtualized/styles.css'

interface IProps extends TableProps{
    getRow: (info: Index) => any
}

const Table: React.FC<IProps> = (props) =>{
    const {children, getRow} = props

    return(
        <VirtualizedTable 
            rowGetter={getRow} 
            {...props} 
            headerStyle={{color: 'lightgray'}} 
            rowStyle={{backgroundColor: 'white', border: '1px solid gray'}} >
           {children}
        </VirtualizedTable>
    )
} 

export default Table

