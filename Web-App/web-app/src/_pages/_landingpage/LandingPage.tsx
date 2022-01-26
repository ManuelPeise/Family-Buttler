import { Grid } from '@material-ui/core'
import React from 'react'
import { IButtlerConfiguration } from '../../_interfaces/IButtlerConfiguration'
import { ILandingpageValues } from '../../_interfaces/ILandingpageValues'
import GreetingComponent from './GreetingComponent'
import LandingpageButtlerConfigurationDialog from './LandingPageButtlerConfiguratuinDialog'

interface IProps{
    values: ILandingpageValues
    buttlerConfig: IButtlerConfiguration
    setButtlerConfiguration: (config: IButtlerConfiguration) => void
}
const LandingPage: React.FC<IProps> = (props) => {
    
    const {values, buttlerConfig, setButtlerConfiguration} = props

    const [dialogOpen, setDialogOpen] = React.useState<boolean>(buttlerConfig?.name == null)

    const handleCloseDialog = React.useCallback(() =>{
        setDialogOpen(false)
     },[])

    return(
        <Grid container style={{width: '100vw', height:'60vh'}}>
          <GreetingComponent values={values} buttlerConfig={buttlerConfig} />
          <LandingpageButtlerConfigurationDialog 
                dialogOpen={dialogOpen} 
                values={values}
                handleClose={handleCloseDialog}
                setButtlerConfiguration={setButtlerConfiguration}
                />
        </Grid>
    )
}

export default LandingPage