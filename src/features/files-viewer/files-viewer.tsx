/* eslint-disable no-console */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      maxHeight: 'calc(100vh - 250px)',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    headerCell: {
      fontWeight: 700,
    },
  };

  const handleContextMenu = (row: any) => {
    console.log('row', row.id);
  };

  return (
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
              sx={{ cursor: row.first_name ? 'pointer' : 'unset' }}
              key={row.id}
            >
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
