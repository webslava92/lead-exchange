import React, { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material'; import {
  Close,
  ContentCopy,
  CropSquare,
  Minimize,
} from '@mui/icons-material';


const { ipcRenderer } = window.require('electron');

const ipc = ipcRenderer;

const minimizeBtn = () => {
  ipc.send('minimizeApp');
};

const maximizeRestoreBtn = () => {
  ipc.send('maximizeRestoreApp');
};

const closeBtn = () => {
  ipc.send('closeApp');
};

export function TopBar() {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const theme = useTheme();
  const styles = {
    topBar: {
      backgroundColor: theme.palette.primary.dark,
    },
    titleBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuBox: {
      display: 'flex',
      width: '100%',
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: 700,
      width: '100%',
      m: 1,
      userSelect: 'none',
      appRegion: 'drag',
    },
    titleBarActions: {
      display: 'flex',
      maxWidth: '120px',
    },
    menuBtn: {
      color: theme.palette.primary.contrastText,
      display: 'flex',
      alignItems: 'center',
      h: '100%',
    },
    actionBtn: {
      color: theme.palette.primary.contrastText,
      display: 'flex',
      alignItems: 'center',
      minWidth: 'unset',
      h: '100%',
    },
  };

  ipc.on('isMaximized', () => {
    setIsMaximized(true);
  });

  ipc.on('isRestored', () => {
    setIsMaximized(false);
  });

  return (
    <Box sx={styles.topBar}>
      <Box sx={styles.titleBar}>
        <Box sx={styles.menuBox}>
          <Box component='p' sx={styles.title}>
            Lead exchange
          </Box>
        </Box>
        <Box sx={styles.titleBarActions}>
          <Button sx={styles.actionBtn} title='Minimize'>
            <Minimize onClick={minimizeBtn} />
          </Button>
          <Button
            sx={styles.actionBtn}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <ContentCopy onClick={maximizeRestoreBtn} fontSize='small' /> :
            <CropSquare onClick={maximizeRestoreBtn} />}
          </Button>
          <Button sx={styles.actionBtn} title='Close'>
            <Close onClick={closeBtn} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
