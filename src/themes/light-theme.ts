import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f3f3f3',
          color: '#010304',
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
        colorPrimary: {
          backgroundColor: "#fff", // optional: if you don't want default blue
        },
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
        selected: { backgroundColor: "red" },
        groupedHorizontal: {
          border: "1px solid rgba(0,0,0,0.2)",
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
          background: '#e6e9ef',
          borderRadius: "8px",
          border: '0',
          color: "#172866",
          fontSize: '0.7em',
          "&:hover": {
            color: "#e6e9ef",
            backgroundColor: "#172866",
          },
          "&.Mui-selected": {
            color: "#e6e9ef",
            border: '0',
            backgroundColor: "#172866",
            "&:hover": {
              backgroundColor: "#172866",
            },
          },
        },
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          // Global styles for the table container
          borderRadius: '2px',
          boxShadow: "none"
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // Global styles for the table header
          backgroundColor: '#f3f3f3',
          "& .MuiTableCell-head": {
            backgroundColor: "#f3f3f3"
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          // Global styles for header cells
          fontWeight: 900,
          color: '#727475',
        },
        body: {
          // Global styles for body cells
          fontSize: '0.875rem',
          padding: '0.96em',
          borderColor: '#f1f1f1',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // Global styles for table rows
          '&:nth-of-type(even)': {
            backgroundColor: '#fafafa',
          },
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f3f3f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#010304',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

export default lightTheme;