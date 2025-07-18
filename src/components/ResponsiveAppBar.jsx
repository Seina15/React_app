import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/person';
import WorkIcon from '@mui/icons-material/Work';
import { Avatar } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import useScrollToHash from "./ScrollToID";


// ナビゲーションバー（MUI引用）
const drawerWidth = 240;

const navItems = [
  { label: 'Home', icon: <HomeIcon />, to: '/#top' },
  { label: 'About Me', icon: <PersonIcon />, to: '/#about-me' },
  { label: 'Work', icon: <WorkIcon />, to: '/#work' },
  { label: 'Skill', icon: <WorkspacePremiumIcon />, to: '/skills/#skill-top' }
];

function DrawerAppBar(props) {
  useScrollToHash();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={
                item.label === 'About Me' ? '/#about-me' :
                item.label === 'Work' ? '/#work' :
                item.label === 'Home' ? '/#top' :
                item.label === 'Skill' ? '/skills/#skill-top' :
                '#'
              }
              
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#0b1e3f' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="My icon"
              src={import.meta.env.BASE_URL + "icon.png"}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography variant="body1" sx={{ color: 'white', lineHeight: 1 }}>
              Seina Inagawa
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', flexGrow: 1, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: '#fff' }}
                startIcon={item.icon}
                component={Link}
                to={
                  item.label === 'About Me' ? '/#about-me' :
                  item.label === 'Work' ? '/#work' :
                  item.label === 'Home' ? '/#top' :
                  item.label === 'Skill' ? '/skills/#skill-top' :
                  '#'
                }
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          mx: 'auto', 
          overflowX: 'hidden',
          p: 0,
          m: 0
        }}
      >

        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
