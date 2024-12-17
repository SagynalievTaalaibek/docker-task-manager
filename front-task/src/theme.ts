import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Основной цвет (например, для кнопок)
      light: '#63a4ff', // Светлый оттенок primary
      dark: '#004ba0', // Тёмный оттенок primary
      contrastText: '#ffffff', // Цвет текста на фоне primary
    },
    secondary: {
      main: '#9c27b0', // Вторичный цвет
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f', // Цвет для ошибок
    },
    warning: {
      main: '#ffa000', // Цвет для предупреждений
    },
    info: {
      main: '#0288d1', // Цвет для информационных элементов
    },
    success: {
      main: '#2e7d32', // Цвет для успешных операций
    },
    background: {
      default: '#f4f6f8', // Цвет фона для всего приложения
      paper: '#ffffff', // Цвет фона для карточек
    },
    text: {
      primary: '#212121', // Основной цвет текста
      secondary: '#757575', // Вторичный цвет текста
      disabled: '#bdbdbd', // Цвет текста для неактивных элементов
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Шрифты
    fontSize: 14, // Базовый размер шрифта
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Отключить capslock на кнопках
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          margin: '8px 0', // Отступы вокруг текстового поля
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Скругление углов кнопок
          textTransform: 'none', // Отключение капс-текста
        },
        contained: {
          boxShadow: 'none', // Убираем тень у кнопок
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Тень при наведении
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Скругление углов для карточек
        },
      },
    },
  },
});

export default theme;
