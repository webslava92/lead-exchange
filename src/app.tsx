import React, { useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { FilesViewer } from '@features/files-viewer/files-viewer';
import { TopBar } from '@features/top-bar/top-bar';
import './App.css';
import { getData, getUploads } from '@features/upload-file-datail/api';
import { UploadFileDetail } from '@features/upload-file-datail';
import { UploadsViewer } from '@features/uploads-viewer/uploads-viewer';

export function App() {
  const [items, setItems] = useState<any>([]);
  const [uploads, setUploads] = useState<any>([]);

  useEffect(() => {
    getData().then((i) => setItems(i));
    getUploads().then((i) => setUploads(i));
  }, []);

  const theme = useTheme();
  const styles = {
    app: {
      position: 'relative',
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#eeeeee',
      padding: 2,
    },
    appInner: {
      paddingTop: '30px',
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    box: {
      maxWidth: { xs: '100%', sm: '80vw' },
      width: '100%',
      margin: '0 auto 16px',
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
            <UploadFileDetail setItems={setItems} setUploads={setUploads} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <FilesViewer items={items} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <UploadsViewer items={uploads} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
