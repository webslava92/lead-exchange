/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { FilesViewer } from '@features/files-viewer/files-viewer';
import { TopBar } from '@features/top-bar/top-bar';
import './App.css';
import { getData } from '@features/file-upload/api';
import { UploadFile } from '@features/file-upload/upload-file';

export function App() {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    getData().then((i) => setItems(i));
  }, []);

  const theme = useTheme();
  const styles = {
    app: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#eeeeee',
    },
    appInner: {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    box: {
      maxWidth: { xs: '100%', sm: '80vw' },
      width: '100%',
      margin: { xs: '0 16px', sm: '0 auto' },
      padding: '16px',
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '10px',
    },
    adress: {
      display: 'flex',
      fontSize: '0.9rem',
      fontWeight: 700,
      color: theme.palette.primary.main,
      margin: '16px auto 0',
      textAlign: 'center',
      minHeight: '1.8rem',
      wordBreak: 'break-all',
    },
    input: {
      marginTop: '16px',
      marginBottom: '16px',
      '& .MuiInput-underline:after': {
        color: theme.palette.primary.main,
      },
    },
    filesWrapper: {
      backgroundColor: theme.palette.primary.contrastText,
      boxSizing: 'border-box',
    },
  };

  return (
    <Box sx={styles.app}>
      <TopBar />
      <Box sx={styles.appInner}>
        <Paper sx={styles.box}>
          <Box>
            <UploadFile setItems={setItems} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <FilesViewer items={items} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
