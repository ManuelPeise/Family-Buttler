import React from 'react'

export interface IApiOptions{
    serviceUri: string
    method?: 'GET'|'POST'
    params?: any | null
}

interface IApiResult<TItem>{
    items: TItem[]
    isLoading: boolean
    dataBound: boolean
    unbindData: () => void
    get: (options?: IApiOptions) => Promise<void>
    post: (options?: IApiOptions) => Promise<void>
}

const useApi = <TItem>(options: IApiOptions) : IApiResult<TItem> => {

    const [apiOptions, setApiOptions] = React.useState<IApiOptions>(options)
    const [dataBound, setDataBound] = React.useState<boolean>(false)
    const [items, setItems] = React.useState<TItem[]>([])
    const [isLoading, setIsloading] = React.useState<boolean>(false)
   

    const resolve = async (res: Response) =>{

        Promise.resolve(res.json())
        .then((data) =>{

            var responsItems = [] as TItem[]

            if(Array.isArray(data)){
                responsItems = JSON.parse(JSON.stringify(data))
            
                setItems(responsItems)

                return
            }
           
            var item: TItem = JSON.parse(JSON.stringify(data))

            responsItems.push(item)

            setItems(responsItems)
        });

        setDataBound(true)
    }

    const get = async (options?: IApiOptions) =>{

        if(options !== undefined){
            setApiOptions({...options, ...apiOptions})
        }
        
        setIsloading(true)
        await fetch(apiOptions.serviceUri, {method: 'GET', mode: 'cors'})
        .then(async (res) => {

            if(res.status === 200){

              resolve(res);

            }
        }).finally(() =>{
            
            setIsloading(false)
        })
        
    }

    const post = async (options?: IApiOptions) => {

        setIsloading(true)

        await fetch(options?.serviceUri?? "", {method: 'POST', mode:'cors', body: JSON.stringify(options?.params), headers: {"Content-Type":"application/json"}})

        .then(async (res) =>{
            if(res.status === 200){

            }
        }).finally(() =>{
            setIsloading(false)
        })
    }

    const unbindData = () =>{
        setItems([])
    }

    React.useEffect(() => {
        const fetchData = async () => {
            
            await get();
        }

        if(apiOptions.params === null){

            fetchData();
        }

    },[])

    const result: IApiResult<TItem> = {
        items,
        isLoading,
        dataBound,
        get,
        post,
        unbindData
        
    }
    

    return result;
}

export default useApi

