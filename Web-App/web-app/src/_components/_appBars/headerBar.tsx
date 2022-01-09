import React from 'react'
import {AppBar, Box, CssBaseline, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType, AppStateActionTypes } from '../../_redux/_appStateStore/actionTypes';
import { IAppState } from '../../_interfaces/IAppState';
import { Link } from 'react-router-dom';
import {Menu} from '@material-ui/icons'
import SideMenu from '../_menus/sideMenu';



const HeaderBar: React.FC = () =>{

    const title = useSelector<IAppState, string>((state) => state.pageTitle);

    const dispatch = useDispatch()

    const setPageTitle = (title: string): ActionType =>{
        return{
            type: AppStateActionTypes.SETPAGETITLE,
            payload: title
        }
    }

    const onHomeClick = () =>{
        dispatch(setPageTitle("Home"))
    }

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

    const handleMenuOpen = React.useCallback(() =>{
        setMenuOpen(true)
    },[setMenuOpen])

    const handleMenuClose = React.useCallback(() =>{
        setMenuOpen(false)
    },[setMenuOpen])


    return(
        <Box style={{display: 'flex', width: '100vw'}}>
            <CssBaseline/>
            <AppBar color='primary' position='sticky'>
                <Toolbar style={{display: 'flex'}}>
                    <IconButton style={{color:'white'}} onClick = {handleMenuOpen}>
                        <Menu />
                    </IconButton>
                    <Tooltip title = 'Home'>
                        <Link style={{textDecoration: 'none', color:'white'}} to = "/" onClick={onHomeClick}>
                            <Typography variant="h6" component="div" >
                                Family Buttler
                            </Typography>
                        </Link>
                    </Tooltip>
                    <Typography style = {{marginLeft: '2vw'}} variant="h6" component="div" >
                                {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <SideMenu open={menuOpen} handleClose={handleMenuClose}/>
        </Box>

    )
}

export default HeaderBar