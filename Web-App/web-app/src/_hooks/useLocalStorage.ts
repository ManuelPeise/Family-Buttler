import { LocalStorageKeyEnum } from '../_enums/localStorageKeyEnum'
import React from 'react'

interface ILocalStorageResult<TItem>{
    setItem: (key: LocalStorageKeyEnum, value: string) => void
    getItem: (key: LocalStorageKeyEnum) => TItem
}

const useLocalStorage = <TItem = any>(): ILocalStorageResult<TItem> =>{

    const getItem = React.useCallback((key: LocalStorageKeyEnum) => {
        const item = window.localStorage.getItem(LocalStorageKeyEnum[key])

        return item ? (JSON.parse(item) as TItem) : {} as TItem
    },[])

    const setItem = React.useCallback((key: LocalStorageKeyEnum, value: string) =>{
        window.localStorage.setItem(LocalStorageKeyEnum[key], value)
    },[])

    const result: ILocalStorageResult<TItem> = {
        getItem,
        setItem
    }

    return result
}

export default useLocalStorage;