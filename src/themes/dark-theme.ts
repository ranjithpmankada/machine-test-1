import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          color: '#ffffff',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.12)"
            : "rgba(255, 255, 255, 0.12)"
            }`,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#ffffff"
              : theme.palette.background.paper,
          color: theme.palette.text.primary,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          transition: "background-color 0.3s ease",
        }),
        colorPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
          "@media (min-width:600px)": {
            minHeight: 64,
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: '8px',
          borderWidth: 0,
        },
        selected: { backgroundColor: "rgba(144, 202, 249, 0.16)" },
        groupedHorizontal: {
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "&:not(:first-of-type)": {
            borderLeft: "none",
          },
          "&:first-of-type": {
            border: '0',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          },
          "&:last-of-type": {
            border: '0',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
        },
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: "8px",
          border: '0',
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: '0.7em',
          "&:hover": {
            color: "#ffffff",
            backgroundColor: "rgba(144, 202, 249, 0.16)",
          },
          "&.Mui-selected": {
            color: "#ffffff",
            border: '0',
            backgroundColor: "rgba(144, 202, 249, 0.16)",
            "&:hover": {
              backgroundColor: "rgba(144, 202, 249, 0.24)",
            },
          },
        },
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          boxShadow: "none",
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          "& .MuiTableCell-head": {
            backgroundColor: "rgba(255, 255, 255, 0.05)"
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        body: {
          fontSize: '0.875rem',
          padding: '0.96em',
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          backgroundImage: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

export default darkTheme;

