import React from "react";
import DataTable from "../../../components/data-table";
import { Box, ToggleButton, ToggleButtonGroup, Alert } from "@mui/material";
import GridViewIcon from '@mui/icons-material/ViewModule';
import ListViewIcon from '@mui/icons-material/ViewList';
import type { User } from "../../../models/models";
import useUserList from "./use-user-list";

export interface UsersList {
  children?: React.ReactNode;
}

export interface UserListProps {
  onRowClick?: (e: React.MouseEvent, data: User) => void;
}

function UserList(props: UserListProps) {
  const { onRowClick: onRowClickProp } = props;

  const { view, setView, columns, state, onRowClick, pagination, setPagination, loadMore } = useUserList(onRowClickProp);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      <Toolbar title="Users" view={view} onChangeView={(view) => { setView(view) }} />
      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading users: {state.error}
        </Alert>
      )}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <DataTable<User>
          data={state.users}
          loading={state.loading}
          columns={columns}
          onRowClick={onRowClick}
          view={view}
          pagination={pagination}
          onPaginationChange={setPagination}
          totalCount={state.total}
          hasMore={state.hasMore}
          onLoadMore={view === 'grid' ? loadMore : undefined}
        />
      </Box>
    </Box>
  );
}

type ToolbarProps = {
  title: string;
  view: 'grid' | 'list';
  onChangeView: (view: 'grid' | 'list') => void;
};

function Toolbar({ title, view, onChangeView }: ToolbarProps) {
  return (
    <Box
      sx={{ mt: '12px' }}
    >
      <Box sx={{
        background: (theme) => theme.palette.background.paper,
        display: 'flex',
        borderRadius: "4px",
        p: '8px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {title}
        </Box>
        <ToggleButtonGroup
          size="small"
          sx={{ ml: 'auto' }}
          value={view}
          exclusive
          onChange={(_, newView) => {
            if (newView) {
              onChangeView(newView);
            }
          }}
        >
          <ToggleButton
            size="small"
            color="primary"
            sx={{ gap: 0.5 }}
            value="grid"
            selected={view === 'grid'}
          >
            <GridViewIcon fontSize="small" /> Grid
          </ToggleButton>
          <ToggleButton
            size="small"
            color="primary"
            sx={{ gap: 0.5 }}
            value="list"
            selected={view === 'list'}
          >
            <ListViewIcon fontSize="small" /> List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}

export default UserList;