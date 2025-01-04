import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // State to handle collapse open/close
  const [openCollapse, setOpenCollapse] = useState({});

  const handleToggleCollapse = (id) => {
    setOpenCollapse((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Box key={menuItem.id}>
            <ListItemButton onClick={() => handleToggleCollapse(menuItem.id)}>
              <ListItemText primary={menuItem.title} />
            </ListItemButton>
            <Collapse in={openCollapse[menuItem.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItem.children?.map((child) => (
                  <NavItem key={child.id} item={child} level={2} />
                ))}
              </List>
            </Collapse>
          </Box>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
