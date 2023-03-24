/* eslint-disable no-console */
import { AttachFile } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { FileType, UploadFileProps } from './types';
import { uploadFiles } from './api';

export function UploadFile({ setItems }: UploadFileProps) {
  const [currentFile, setCurrentFile] = useState<any>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<any>(undefined);
  const [isError, setIsError] = useState<boolean>(false);

  const selectFile = (event: FileType) => {
    const file = event.target.files;
    const fileExtension = file[0].name.split('.').pop();
    const isCsv = fileExtension === 'csv';

    if (isCsv) {
      setCurrentFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    uploadFiles(
      currentFile,
      (event: { loaded: number; total: number }) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }
    )
      .then((i) => {
        setItems(i);
        setMessage(undefined);
        setIsError(false);
      })
      .catch(() => {
        setProgress(0);
        setMessage('Could not upload the file!');
        setCurrentFile(undefined);
        setIsError(true);
      });
  };

  const styles = {
    wrapper: {},
    paper: {
      padding: 2,
      margin: 2,
    },
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    fileBox: {
      display: 'flex',
      alignItems: 'center',
    },
    fileName: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 2,
    },
    message: {},
    errorMessage: {
      color: 'red',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper sx={styles.paper}>
        <Box sx={styles.inner}>
          <Box sx={styles.fileBox}>
            <label htmlFor='btn-upload'>
              <input
                id='btn-upload'
                name='btn-upload'
                style={{ display: 'none' }}
                type='file'
                accept='.csv'
                onChange={selectFile}
              />
              <IconButton component='span'>
                <AttachFile />
              </IconButton>
            </label>
            <Box component='div'>
              {currentFile ? currentFile.name : null}
            </Box>
          </Box>

          <Button
            color='primary'
            variant='contained'
            component='span'
            disabled={!currentFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
        {currentFile && progress !== 0 && progress !== 100 && (
          <Box display='flex' alignItems='center'>
            <Box minWidth={35}>
              <Typography variant='body2' sx={styles.fileName}>
                Loading file ...
              </Typography>
            </Box>
            <Box width='100%' mr={1}>
              <LinearProgress variant='determinate' value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant='body2' sx={styles.fileName}>
                {`${progress}%`}
              </Typography>
            </Box>
          </Box>
        )}
        <Typography
          variant='subtitle2'
          sx={isError ? styles.errorMessage : message}
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
}
