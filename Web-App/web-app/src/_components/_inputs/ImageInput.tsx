import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useImageConverter } from '../../_hooks/useImageConverter'
import { IMenu } from '../../_interfaces/IMenu'

interface IProps{
    isReadOnly: boolean
    width: number
    height: number
    noImageSrc: string
    menu: IMenu
}

const ImageInput: React.FC<IProps> = (props) =>{

    const {isReadOnly, width, height, noImageSrc, menu} = props
    
    const imageService = useImageConverter(menu)
    
    const src = React.useMemo(() => {
        if(menu?.image === undefined || menu?.image === ""){
            return noImageSrc
        }

        return menu.image
    },[menu, noImageSrc])

    const handleChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    
        await imageService.handleChange(e)
        
    },[imageService])


    return(
        <Grid
            style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center' }}
            container>
            <Grid
                 xs={12}
                item>
                <img width={width} height={height} src={src} alt=''/>
            </Grid>
            <Grid
                xs={12}
                item>
                {!isReadOnly && (
                    <TextField hidden={true} type='file' onChange={handleChange}/>
                )}
            </Grid>   
        </Grid>
    )
}

export default ImageInput