import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../store';
import { fetchAlbums } from '../store/slices';

export default function Albums() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { albums } = useSelector((state: RootState) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);

    const { id } = albums[index];

    navigate(id);
    /*
    try {
      const resultAction = await dispatch(fetchPhotosByAlbumId(id)).unwrap();
      console.log({resultAction});
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
    */
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Shared Albums
          </Typography>
        </Toolbar>
      </AppBar>

      <List component='nav' aria-labelledby='list-subheader'>
        {albums.map((album, index) => (
          <ListItemButton
            key={album.id}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemText primary={album.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
