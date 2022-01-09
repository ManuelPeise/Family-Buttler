import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const styles = makeStyles({
    root:{
        display:'flex',
        justifyContent: 'center',
        padding: '2vw',
        overflow: 'hidden'
    },
    contextContainer:{
        height: '70vh'
    },
    btnContainer:{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '.9vw',
        height: '10vh'

    },
    contextPaper:{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
        overflow: 'scroll'
    }
})

interface IProps{
    hasSaveBtn: boolean
    hasCancelBtn: boolean
}

const PageBodyLayout: React.FC<IProps> = (props) =>{

    const {children, hasCancelBtn, hasSaveBtn} = props
    
    const useStyle = styles()

    return(
        <Grid
            className={useStyle.root}
            item
            container>
                <Grid
                    className={useStyle.contextContainer}
                    item
                    container>
                    {children}
                </Grid>
            <Grid
                className={useStyle.btnContainer}
                container>
                {hasCancelBtn && (
                    <Button>Cancel</Button>
                )}
                {hasSaveBtn && (
                    <Button>Save</Button>
                )}
            </Grid>
        </Grid>)
}

export default PageBodyLayout