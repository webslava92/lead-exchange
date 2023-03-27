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
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
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
  { id: 'id', label: 'Id', align: 'center' },
  { id: 'first_name', label: 'First name', align: 'center' },
  { id: 'last_name', label: 'Last name' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
];

export function FilesViewer({
  items,
}: // setDialogOpen,
Props) {
  const styles = {
    container: {
      maxHeight: 'calc(100vh - 400px)',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    title: {
      textAlign: 'center',
      margin: 2,
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
        Detailed information about information uploaded from csv files
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
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
