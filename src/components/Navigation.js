import React, { useState } from 'react'

import Customers from '../views/Customers'
import Trainings from '../views/Trainings'
import Calendar from '../views/Calendar'
import PageNotFound from '../views/PageNotFound'

import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CalendarIcon from '@material-ui/icons/CalendarToday'
import SportsIcon from '@material-ui/icons/Sports'
import CustomerIcon from '@material-ui/icons/Person'

const Navigation = () => {
    const pageHeadlines = [ "Customers", "Trainings", "Calendar" ]
    const [ activeIcon, setActiveIcon ] = useState()

    const toggleActiveIcon = (headline) => {
        if(headline === 'Customers') {
            setActiveIcon(<CustomerIcon />)
        } else if(headline === 'Trainings') {
            setActiveIcon(<SportsIcon />)
        } else if(headline === 'Calendar') {
            setActiveIcon(<CalendarIcon />)
        }
    }

    const drawerWidth = 120;

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
      toolbarIcon: {
          marginTop: 20,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      link: {
          textDecoration: 'none',
          color: 'black',
      },
    }));

    const classes = useStyles();


    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography noWrap>
                            Personal-Trainer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}} anchor="left">
                    <div className={classes.toolbar}>
                        <div className={classes.toolbarIcon}>
                            {activeIcon}
                        </div>
                    </div>
                    <Divider />
                    <List>
                        {pageHeadlines.map((headline, i) => (
                            <Link key={i} className={classes.link} to={`/${headline.toLowerCase()}`}>
                                <ListItem onClick={() => {toggleActiveIcon(headline)}} button>
                                    <ListItemText>{headline}</ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/" render={(props) => <Customers {...props} setActiveIcon={setActiveIcon}/>} />
                        <Route path="/customers" render={(props) => <Customers {...props} setActiveIcon={setActiveIcon}/>} />
                        <Route path="/trainings" render={(props) => <Trainings {...props} setActiveIcon={setActiveIcon}/>} />
                        <Route path="/calendar" render={(props) => <Calendar {...props} setActiveIcon={setActiveIcon}/>}/>
                        <Route render={(props) => <PageNotFound {...props} setActiveIcon={setActiveIcon}/>}/>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default Navigation
