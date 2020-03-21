import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { useUser } from '../../context/user';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  menuLink: {
    color: 'black',
    textDecoration: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menu: {
    marginTop: 40,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { methods: { signOut, isLoggedIn, isAdmin } } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    handleMenuClose();
    signOut();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      className={classes.menu}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 
      {isLoggedIn() ? <>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/profile">Profile</Link></MenuItem>
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </> : 
      <>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/login">Login</Link></MenuItem>
      </>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      className={classes.menu}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={logout}><Link className={classes.menuLink} to="/Users">Users</Link></MenuItem>
      {isAdmin() ? <>
        <MenuItem onClick={logout}><Link className={classes.menuLink} to="/categories">Categories</Link></MenuItem>
        <MenuItem onClick={logout}><Link className={classes.menuLink} to="/sub-categories">Sub-Categories</Link></MenuItem>
      </> : null}
      {isLoggedIn() ? <>
        <MenuItem onClick={handleProfileMenuOpen}>
          <Link className={classes.menuLink} to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <Link className={classes.menuLink} to="/login">Login</Link>
        </MenuItem></> : 
        <MenuItem onClick={logout}>Sign out</MenuItem>
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <Link to=""><HomeIcon /></Link>
          </IconButton>
          <MenuItem>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.link} to="/users">Users</Link>
            </Typography>
          </MenuItem>
          {isAdmin() ? <>
            <MenuItem>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link className={classes.link} to="/categories">Categories</Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link className={classes.link} to="/sub-categories">Sub-Categories</Link>
              </Typography>
            </MenuItem>
          </> : null}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Link className={classes.link} to="/users/"><PeopleIcon /></Link>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <CategoryIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
