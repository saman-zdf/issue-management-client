import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '226px',
    backgroundColor: '#6887e3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textDecoration: 'none',
  },
  sidebarButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarButtonLink: {
    textDecoration: 'none',
  },
  logo: {
    width: '80px',
    margin: '40px auto',
  },
}));

export default useStyles;