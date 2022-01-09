import React from 'react'
import {Grid} from '@material-ui/core'
import HeaderBar from '../_components/_appBars/headerBar'

interface IProps{
    
}

const PageLayout: React.FC<IProps> = (props) => {

    const {children} = props

    return(
        <Grid
            container
            direction='row'>
            <Grid
                container>
                 <HeaderBar/>
            </Grid>
            <Grid
                container>
                {children}
            </Grid>
            
        </Grid>
    )
}

export default PageLayout;