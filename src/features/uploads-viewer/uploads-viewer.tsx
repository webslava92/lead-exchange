/* eslint-disable no-console */
import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

type Row = {
  id: number;
  created_at: string;
  number_of_entries: number;
};

type Props = {
  items: Row[];
  // setDialogOpen?: Function;
};

type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right' | undefined;
};

const columns: readonly Column[] = [
  { id: 'id', label: 'Id' },
  { id: 'create_at', label: 'Create date' },
  { id: 'numbers_of_entries', label: 'Number of entries' },
];

export function UploadsViewer({
  items,
}: Props) {
  const styles = {
    container: {
      maxHeight: 'calc(100vh - 400px)',
      borderRadius: '4px',
      boxSizing: 'border-box',
      margin: 2,
    },
    title: {
      textAlign: 'center',
    },
    headerCell: {
      fontWeight: 700,
      backgroundColor: '#ccc',
    },
  };

  const handleContextMenu = (row: any) => {
    console.log('row', row.id);
  };

  return (
    <>
      <Typography variant='h5' sx={styles.title}>
        Download list
      </Typography>
      <Paper>
        <TableContainer sx={styles.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={styles.headerCell}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row: Row) => (
                <TableRow
                  onContextMenu={() => handleContextMenu(row)}
                  sx={{ cursor: row.id ? 'pointer' : 'unset' }}
                  key={row.id}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.number_of_entries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
