import React from 'react'
import useApi from '../../../_hooks/useApi'
import { ILogmessage } from './interfaces/ILogmessage'
import LoggingPageContainer from './loggingPageContainer'
import apiConfig from '../../../_config/apiConfig.json'
import { useDispatch } from 'react-redux'
import { SetLogMessages } from '../../../_redux/_appStateStore/appStoreAccessor'

export interface ILogMessageTableState{
    allSelected: boolean
    ids: number[] 
}
interface IProps{

}

const LoggingDataservice: React.FC<IProps> = (props) =>{
   
    const dispatch = useDispatch();

    const logDataService = useApi<ILogmessage>({
        serviceUri: apiConfig.baseUrl + apiConfig.administration.getLogmessages,
        params: null
    })

    const [selectedItems, setSelectedItems] = React.useState<ILogMessageTableState>({allSelected: false, ids:[]})

    // const logMessageRows = React.useMemo(() =>{
    //     return logDataService.items.map((item) =>{
    //         return getLogMessageRow(item)
    //     })
    // },[logDataService])

    const handleSelectedItemsChanged = React.useCallback((items: number[]) =>{
        setSelectedItems({allSelected: logDataService.items.length === items.length && items !== [], ids: items})
    },[logDataService.items])

    const handleSelectAll = React.useCallback(() => {
        if(selectedItems?.ids?.length){
            setSelectedItems({allSelected: false, ids:[]})

            return
        }
        const items = logDataService.items.map((msg) =>{
                return msg.id
        })
        
        setSelectedItems({allSelected: items.length === logDataService.items.length, ids: items})
    },[logDataService.items, selectedItems.ids.length])
   
    const getMessagesToDelete = React.useCallback(() =>{
        const messages = [] as ILogmessage[]

        logDataService.items.forEach(msg => {
            
            const index = selectedItems.ids.findIndex(x => x === msg.id)

            if(index !== -1){
                messages.push(msg)
            }
        })

        return messages
    },[logDataService.items, selectedItems.ids])

    const deleteLogmessages = React.useCallback(async () =>{
        await logDataService.post({
            serviceUri:apiConfig.baseUrl + apiConfig.administration.deleteLogmessages,
            params: selectedItems.ids
        })

        const messages = getMessagesToDelete()

        dispatch(SetLogMessages(messages))
        

    },[logDataService, selectedItems.ids, getMessagesToDelete, dispatch])

    const onCancel = React.useCallback(() =>{
        setSelectedItems({allSelected:false, ids:[]})
    },[])

    if(logDataService.items === undefined){
        return null
    }
    
    dispatch(SetLogMessages(logDataService.items))

    return(
        <LoggingPageContainer
            selectedItems={selectedItems}
            handleSelectedItems={handleSelectedItemsChanged}
            handleSelectAll={handleSelectAll}
            deleteLogmessages={deleteLogmessages}
            onCancel={onCancel}
            />
    )
}

export default LoggingDataservice
