import React from "react";
import { useDispatch } from "react-redux";
import apiConfig from '../_config/apiConfig.json'
import { IMenu } from "../_interfaces/IMenu";
import { SetMenu } from "../_redux/_appStateStore/appStoreAccessor";

export interface IImageUploadResult{
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const useImageConverter = (menu: IMenu): IImageUploadResult =>{
  
    const dispatch = useDispatch();
    const fetchData = React.useCallback(async (form: any) =>{
        await fetch(apiConfig.baseUrl + apiConfig.cookingBook.imageConverter, {method: 'POST', mode: 'cors', body: form})
        .then(async (res) => {
            if(res.status === 200){
                const imageString:string = JSON.parse(JSON.stringify(await res.json()))

                dispatch(SetMenu({...menu, image: "data:image/png;base64," + imageString}))
               
            }
        })
    },[dispatch, menu])

    const getFormData = (file: File) =>{
        const formData = new FormData();
        formData.append("image", file)
        
        return formData
    }

    const getBase64Image = React.useCallback(async (file: File) => {
        
        const formData = getFormData(file)
        
        await fetchData(formData)
       
    },[fetchData])

    const handleChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        if(e.target.files !== null && e.target.files[0]){

            const file = e.target.files[0]

            await getBase64Image(file)  
        }
    },[getBase64Image])

    return {   
        handleChange
    }
} 