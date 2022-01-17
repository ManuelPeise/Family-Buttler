import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import InputTextField from '../../_components/_inputs/InputTextField'
import { IButtlerConfiguration } from '../../_interfaces/IButtlerConfiguration'
import { ILandingpageValues } from '../../_interfaces/ILandingpageValues'

interface IProps{
    dialogOpen: boolean
    values: ILandingpageValues
    handleClose: () => void
    setButtlerConfiguration: (config: IButtlerConfiguration) => void
}

const LandingpageButtlerConfigurationDialog: React.FC<IProps> = (props) =>{

    const {dialogOpen, values, handleClose, setButtlerConfiguration} = props

    const [config, setConfig] = React.useState<IButtlerConfiguration>({name:'', language:'Un'} )

    const saveDisabled = React.useMemo(() =>{
        return config.name === "" || config.language === 'Un'
    },[config])

    const selectElements = React.useMemo(() =>{
        const items: JSX.Element[] = []
        
        items.push(<MenuItem key={0} id='0' value={0}>Select Language</MenuItem>)
        items.push(<MenuItem key={1} id='1' value={1}>{values.german}</MenuItem>)
        items.push(<MenuItem key={2} id='2' value={2}>{values.english}</MenuItem>)

        return items
    },[values])

    const handleButtlerNameChanged = React.useCallback((name: string) =>{
        setConfig({...config, name})
    },[config])

    const handleLanguageChanged = React.useCallback((value: number) =>{
        if(value === 0){
            setConfig({...config, language: 'Un'})
        }

        if(value === 1){
            setConfig({...config, language: 'De'})
        }

        if(value === 2){
            setConfig({...config, language: 'En'})
        }
    },[config])

    const languageValue = React.useMemo(() =>{
        if(config.language === 'De'){
           return 1
        }

        if(config.language === 'En'){
            return 2
         }

         return 0
    },[config])

    const onSave = React.useCallback(() =>{
        setButtlerConfiguration(config)
        handleClose()
    },[config, setButtlerConfiguration, handleClose])

    return(
        <Dialog 
            open = {dialogOpen}>
            <DialogTitle style={{backgroundColor:'blue', color:'white'}}>
                <Typography style ={{ fontSize: '1rem'}}>{values.buttlerConfiguration}</Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container style={{padding:'.5rem', display: 'flex', flexDirection:'column' }}>
                    <Grid item style={{padding:'.5rem'}}>
                    <InputTextField 
                        label={values.buttlerName} 
                        value={config.name}
                        fullWidth={true}
                        onValueChange={handleButtlerNameChanged}/>
                    </Grid>
                    <Grid item style={{padding:'.5rem'}}>
                    <InputTextField
                        label={values.language}
                        value={languageValue}
                        fullWidth={true}
                        hasSelect={true}
                        selectElements={selectElements}
                        onSelect={handleLanguageChanged}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{values.cancel}</Button>
                <Button disabled={saveDisabled} onClick={onSave}>{values.save}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LandingpageButtlerConfigurationDialog