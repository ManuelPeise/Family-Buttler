import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

interface IProps{
    title: string
    variant?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
    isReadonly?: boolean
    icon?: JSX.Element
}

const SubHeaderBar: React.FC<IProps> = (props) =>{

    const {title, variant, icon, isReadonly} = props

    return(
        <AppBar position='sticky' color='default' style={{margin: '1vh', opacity:'.4'}}>
            <Toolbar style={{display:'flex', justifyContent: 'space-between'}}>
                <Typography variant={variant}>{title}</Typography>
                {isReadonly === false &&(
                icon
                )}
            </Toolbar>
        </AppBar>
    )
}

export default SubHeaderBar