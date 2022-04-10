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

  if ('clipboardData' in window) {
    const { clipboardData } = window as any;
    return clipboardData.setData("Text", photoUrl);
  }

  if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    const textarea = document.createElement("textarea");
    textarea.textContent = photoUrl;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    }
    catch (ex) {
      return prompt("Copy to clipboard: Ctrl+C, Enter", photoUrl);
    }
    finally {
      document.body.removeChild(textarea);
    }
  }

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
