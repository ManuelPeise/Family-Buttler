import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { IButtlerConfiguration } from '../../_interfaces/IButtlerConfiguration';
import { ILandingpageValues } from '../../_interfaces/ILandingpageValues';

interface IProps{
    values: ILandingpageValues
    buttlerConfig: IButtlerConfiguration
}

const GreetingComponent: React.FC<IProps> = (props) =>{
    const {values, buttlerConfig} = props
    
    return(
        <Grid justifyContent='center' alignContent='center' container style={{display:'flex', flexDirection:'column'}}>
            <Grid item style={{padding:'1vw'}}>
                <Typography variant='h3'>{values.greeting}</Typography>
            </Grid>
            <Grid item>
                <Typography style={{padding:'3vw'}} variant='h4'>{values.buttler.replace('buttlername', buttlerConfig.name?? "")}</Typography>
            </Grid>
            <Grid item>
                <Typography variant='h4'>{values.todo}</Typography>
            </Grid>
        </Grid>
    )
}

export default GreetingComponent