import { useState, useEffect, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../../models/models";
import { Box, Avatar, Chip, useTheme } from "@mui/material";
import React from "react";

function useUserList(onRowClickProp?: (e: React.MouseEvent, data: User) => void) {
    const theme = useTheme();
    const [view, setView] = useState<"list" | "grid">("list");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [state, setState] = useState<{
        users: User[],
        loading: "pending" | "finished",
        error?: string,
        total: number,
        hasMore: boolean
    }>({
        users: [],
        loading: "pending",
        total: 0,
        hasMore: true
    });

    const columns = useMemo<ColumnDef<User>[]>(
        () => {
            if (!theme || !theme.palette) {
                console.warn('Theme not available, using default colors');
            }
            const mode = theme?.palette?.mode || 'light';
            const avatarBgColor = mode === 'light' ? '#f3f3f3' : 'rgba(255, 255, 255, 0.12)';

            return [
                {
                    accessorFn: (row: User) => row.firstName,
                    id: 'name',
                    cell: (info) => <Box component="div" sx={{ display: 'flex', gap: '12px', fontWeight: '700', alignItems: 'center' }}>
                        <Avatar src={info.row.original.image} sx={{
                            background: avatarBgColor
                        }} />
                        {info.getValue() as string}
                    </Box>,
                    header: () => <span>Name</span>,
                    footer: (props) => props.column.id,
                },
                {
                    accessorFn: (row: User) => row.company.name,
                    id: 'company.name',
                    cell: (info) => info.getValue(),
                    header: () => <span>Company Name</span>,
                    footer: (props) => props.column.id,
                }
                , {
                    accessorFn: (row: User) => row.email,
                    id: 'email',
                    cell: (info) => info.getValue(),
                    header: () => <span>Email</span>,
                    footer: (props) => props.column.id,
                },

                {
                    accessorFn: (row: User) => row.phone,
                    id: 'phone',
                    cell: (info) => info.getValue(),
                    header: () => <span>Phone No.</span>,
                    footer: (props) => props.column.id,
                },
                {
                    accessorFn: (row: User) => row.role,
                    id: 'role',
                    cell: (info) => <Chip label={info.getValue() as string} />,
                    header: () => <span>Role</span>,
                }
            ];
        },
        [theme]
    );

    const onRowClick = (e: React.MouseEvent, data: User) => {
        if (onRowClickProp) onRowClickProp(e, data);
    }

    useEffect(() => {
        // Reset users when pageIndex is 0 (initial load or reset)
        if (pagination.pageIndex === 0) {
            setState(prev => ({ ...prev, loading: 'pending', error: undefined, users: [] }));
        } else {
            setState(prev => ({ ...prev, loading: 'pending', error: undefined }));
        }

        const skip = pagination.pageIndex * pagination.pageSize;
        const limit = pagination.pageSize;

        fetch(`https://dummyjson.com/users?skip=${skip}&limit=${limit}`)
            .then((res: Response) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((res) => {
                const newUsers = res.users || [];
                const total = res.total || 0;
                const currentTotal = skip + newUsers.length;

                setState(prev => ({
                    users: pagination.pageIndex === 0
                        ? newUsers
                        : [...prev.users, ...newUsers],
                    loading: 'finished',
                    total: total,
                    hasMore: currentTotal < total
                }));
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setState(prev => ({
                    ...prev,
                    loading: 'finished',
                    error: error.message,
                    hasMore: false
                }));
            });
    }, [pagination.pageIndex, pagination.pageSize]);

    const loadMore = () => {
        if (state.loading === 'pending' || !state.hasMore) return;

        setPagination(prev => ({
            ...prev,
            pageIndex: prev.pageIndex + 1
        }));
    };

    return {
        view,
        setView,
        state,
        columns,
        onRowClick,
        pagination,
        setPagination,
        loadMore
    };
}

export default useUserList;