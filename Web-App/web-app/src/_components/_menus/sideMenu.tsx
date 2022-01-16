import React from 'react'
import {CssBaseline, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSideBarMenuConfig } from '../../_config/sideBarMenuConfig'
import {ArrowBack} from '@material-ui/icons'

const styles = makeStyles((theme) =>({
    root:{
       display:'flex'
    },
    header:{
        display:'inerit',
        justifyContent:'space-between',
        width: '-webkit-fill-available',
        maxWidth:'20vw',
        [theme.breakpoints.down(900)]:{
            width: '-webkit-fill-available',
            minWidth:'40vw',
            maxWidth:'40vw',
        },
    },
    headerContainer:{
        padding:'1vw',
    },
    headerListItem:{
        display:'flex',
        justifyContent:'space-between'
    },
    menuList:{
        width: '-webkit-fill-available',
        minWidth:'20vw',
        maxWidth:'20vw',
        [theme.breakpoints.down(900)]:{
            width: '-webkit-fill-available',
            minWidth:'40vw',
            maxWidth:'40vw',
        },
    },
    menuItem:{
        color: 'black',
        padding: '1vw',
        [theme.breakpoints.down(900)]:{
            width: '-webkit-fill-available',
            minWidth:'40vw',
            maxWidth:'40vw',
        },
        '&:hover':{
            cursor: 'pointer',
        }
    },
    itemTxt:{
        fontSize: '2em'
    },
    link:{
        textDecoration: 'none',
        paddingLeft:'2vw',
        color: 'black',
        fontSize: '2em'
    }
}))

interface IProps{
    open: boolean
    handleClose: () => void
}

const SideMenu: React.FC<IProps> = (props) =>{

    const useStyle = styles()
    const {open, handleClose} = props

    const sideBarConfig = useSideBarMenuConfig(handleClose)

    const sideBarMenu = React.useMemo(() =>{

        return(
            <List className={useStyle.menuList}>
                {sideBarConfig.map((config, index) =>{
                    return(
                        <Grid
                            key={index}
                            className={useStyle.root}
                            container>
                            <ListItem key={config.key} className={useStyle.menuItem} selected = {config.expanded} onClick = {config.handleSelected.bind(null, config.key)}>
                                <ListItemText className = {useStyle.itemTxt}>
                                        {config.title}
                                </ListItemText>
                            </ListItem>
                            {config.expanded && (
                                config.items.map((item) =>{
                                    return(
                                        <ListItem 
                                            key={item.key} 
                                            className={useStyle.menuItem} 
                                            selected = {item.selected}
                                            disabled = {item.disabled} 
                                            onClick = {item.handleSelected.bind(null, item.key)}>         
                                            <Link className = {useStyle.link} to = {!item.disabled ? item.path : '#'} >
                                                <ListItemText className = {useStyle.itemTxt}>
                                                        {item.value}
                                                </ListItemText>
                                            </Link>
                                        </ListItem>
                                    )
                                })
                            )}
                        </Grid>
                    )
                })}

            </List>
        )
    },[sideBarConfig, useStyle]) 

    return(
        <Drawer
            className={useStyle.root}
            open={open}
            onClose={handleClose}>
            <Grid
                className={useStyle.headerContainer}
                item
                container>
                <Grid
                    className={useStyle.header}>
                    <ListItem className={useStyle.headerListItem}>
                        <CssBaseline/>
                        <ListItemText>
                            <Typography variant='h5'>Menu</Typography>
                        </ListItemText>
                        <ListItemIcon>
                            <IconButton onClick={handleClose}>
                                <ArrowBack/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                </Grid>
            </Grid>
            <Grid
                style={{display: 'flex', padding:'1vw'}}
                item
                container>
                {sideBarMenu}
            </Grid>
        </Drawer>
    )
}

export default SideMenu;