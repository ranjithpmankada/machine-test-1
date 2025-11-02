import { useState } from "react";
import { Box } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";

export interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: (theme) => theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Box sx={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 2, md: 3 },
            py: 3,
            height: 'calc(100vh - 65px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}