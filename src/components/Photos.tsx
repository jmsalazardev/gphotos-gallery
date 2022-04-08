import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Photo } from '../common/interfaces';

export interface PhotosProps {
  data: Photo[];
  name: string;
}

const copyToClipboard = (photo: Photo) => {
  const photoUrl = `${photo.url}#width=${photo.width}&height=${photo.height}`;
  navigator.clipboard.writeText(photoUrl);
};

export default function Photos(props: PhotosProps) {
  const { name, data } = props;

  return (
    <ImageList sx={{ flexGrow: 1 }}>
      <ImageListItem key='Subheader' cols={2}>
        <ListSubheader component='div'>{name}</ListSubheader>
      </ImageListItem>
      {data.map((item) => (
        <ImageListItem key={item.url}>
          <img src={`${item.url}=s248`} alt={item.name} loading='lazy' />
          <ImageListItemBar
            title={item.name}
            subtitle={`${item.width}x${item.height}`}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`copy public url ${item.name}`}
                onClick={() => {
                  copyToClipboard(item);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
