import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Table,
} from '@tanstack/react-table'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { Card, CardContent, Skeleton, Typography, CircularProgress } from '@mui/material'
import { useVirtualizer } from '@tanstack/react-virtual'


export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  onRowClick?: (event: React.MouseEvent, data: T) => void;
  loading: "pending" | "finished";
  view: "list" | "grid";
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  totalCount?: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
}


export interface ViewProps<T> {
  table: Table<T>;
  data: T[];
  loading: "pending" | "finished";
  onRowClick?: (event: React.MouseEvent, data: T) => void;
}

function DataTable<T,>({
  data,
  columns,
  onRowClick,
  loading,
  view,
  pagination,
  onPaginationChange,
  totalCount = 0,
  hasMore = false,
  onLoadMore
}: DataTableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalCount > 0 ? Math.ceil(totalCount / (pagination?.pageSize || 10)) : -1,
    state: {
      pagination: pagination || { pageIndex: 0, pageSize: 10 },
    },
    onPaginationChange: (updater) => {
      if (onPaginationChange) {
        const newPagination = typeof updater === 'function'
          ? updater(pagination || { pageIndex: 0, pageSize: 10 })
          : updater;
        onPaginationChange(newPagination);
      }
    },
    debugTable: true,
  })



  return (
    <Box sx={{
      width: '100%',
      height: "100%",
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {
        view === "list" ? (
          <ListView table={table} onRowClick={onRowClick} loading={loading} data={data} totalCount={totalCount} />
        ) : (
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <GridView
              table={table}
              onRowClick={onRowClick}
              loading={loading}
              data={data}
              hasMore={hasMore}
              onLoadMore={onLoadMore}
            />
            <Box sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              flexShrink: 0,
              p: 1.5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: (theme) => theme.palette.background.paper,
            }}>
              <Typography variant="caption" color="text.secondary">
                Showing {data.length} of {totalCount || 0} users
              </Typography>
            </Box>
          </Box>
        )
      }
    </Box>
  )
};


interface ListViewProps<T> extends ViewProps<T> {
  totalCount?: number;
}

interface GridViewProps<T> extends ViewProps<T> {
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const ListView = <T,>(props: ListViewProps<T>) => {
  const { table, loading, onRowClick, totalCount } = props;

  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          overflow: 'auto',
          maxHeight: '100%'
        }}
      >
        <MuiTable
          sx={{ minWidth: 650 }}
          stickyHeader
        >
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading === "pending" ?
              [...Array(pageSize)].map((_, index) => {
                return (
                  <TableRow key={index}>
                    {table.getAllColumns().map(col => {
                      return (
                        <TableCell key={col.id}>
                          <Skeleton variant="rectangular" sx={{ width: '100%', height: 30 }} />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              }) : null}
            {loading === "finished" ? table.getRowModel().rows.map(row => {
              return (
                <TableRow key={row.id} onClick={(event) => onRowClick && onRowClick(event, row.original)} sx={{ cursor: 'pointer' }}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            }) : null}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalCount || 0}
        rowsPerPage={pageSize}
        page={pageIndex}
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          flexShrink: 0
        }}
        slotProps={{
          select: {
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          },
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => {
          const size = e.target.value ? Number(e.target.value) : 10
          table.setPageSize(size)
          table.setPageIndex(0) // Reset to first page when page size changes
        }}
      />
    </Box>
  )
}



const GridView = <T,>(props: GridViewProps<T>) => {
  const { table, loading, onRowClick, data, hasMore, onLoadMore } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const columnCount = 3;
  const cardHeight = 280; // Estimated card height in pixels
  const cardGap = 16; // Gap between cards

  // Calculate rows needed for all data
  const totalRows = Math.max(0, Math.ceil(data.length / columnCount));

  // Create virtualizer for rows
  const rowVirtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cardHeight + cardGap,
    overscan: 2,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  // Handle scroll to load more
  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement || !onLoadMore || !hasMore || loading === 'pending') return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      // Load more when user scrolls to within 200px of the bottom
      if (scrollHeight - scrollTop - clientHeight < 200) {
        onLoadMore();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, hasMore, loading]);

  if (loading === "pending" && data.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Card key={index} variant="outlined" sx={{ height: cardHeight }}>
              <CardContent>
                <Skeleton variant="circular" width={60} height={60} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  if (data.length === 0 && loading === "finished") {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No users found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={parentRef}
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        p: 2,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const endIndex = Math.min(startIndex + columnCount, data.length);
          const rowData = table.getRowModel().rows.slice(startIndex, endIndex);

          if (rowData.length === 0) return null;

          return (
            <Box
              key={virtualRow.key}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2,
              }}
            >
              {rowData.map((row, colIndex) => {
                const actualIndex = startIndex + colIndex;
                if (!row || !row.original) return null;

                return (
                  <Card
                    key={row.id || `row-${actualIndex}`}
                    variant="outlined"
                    onClick={(e) => onRowClick && onRowClick(e, row.original)}
                    sx={{
                      height: cardHeight,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: 2,
                      boxShadow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                      {row.getVisibleCells().map((cell) => (
                        <Box key={cell.id} sx={{ mb: 1.5, '&:last-child': { mb: 0 } }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          );
        })}
        {/* Loading indicator at bottom when loading more */}
        {loading === 'pending' && data.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: `${rowVirtualizer.getTotalSize()}px`,
              left: 0,
              width: '100%',
              p: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DataTable;