import { LocalStorageKeyEnum } from '../_enums/localStorageKeyEnum'

interface ILocalStorageResult<TItem>{
    setItem: (key: LocalStorageKeyEnum, value: string) => void
    getItem: (key: LocalStorageKeyEnum) => TItem
}

const useLocalStorage = <TItem = any>(): ILocalStorageResult<TItem> =>{

    const getItem = (key: LocalStorageKeyEnum): TItem => {
        const item: TItem = JSON.parse(JSON.stringify(window.localStorage.getItem(LocalStorageKeyEnum[key])))

        return item
    }

    const setItem = (key: LocalStorageKeyEnum, value: string) =>{
        window.localStorage.setItem(LocalStorageKeyEnum[key], value)
    }

    const result: ILocalStorageResult<TItem> = {
        getItem,
        setItem
    }

    return result
}

export default useLocalStorage;