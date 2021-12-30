import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Avatar,
  Alert,
  Stack,
} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useStyles } from './EmployeStyle';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwtdecode from 'jwt-decode';

const EmployeeTable = () => {
  const { state } = useGlobalContext();
  const classes = useStyles();
  const {
    currentUser: { token },
  } = state;
  const decodeToken = jwtdecode(token);

  const {
    users: { allUsers },
  } = state;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {state.isUpdated && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='warning'>
            You have updated your profile successfully
          </Alert>
        </Stack>
      )}
      <Typography variant='h3' align='center' className={classes.heading}>
        Tickets
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Hire Date
              </TableCell>
              <TableCell className={classes.tableHeaderCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.currentUser &&
              allUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Link className={classes.userTitle} to={user._id}>
                        <Avatar
                          src={user.imageUrl}
                          className={classes.avatarIcon}
                        />
                        <Typography>{user.name}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {allUsers && moment(user.createdAt).format('LL')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {(decodeToken.id === user._id || decodeToken.isAdmin) && (
                        <>
                          <Link to={user._id}>
                            <DeleteForeverSharpIcon
                              className={classes.deleteIcon}
                            />
                          </Link>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={allUsers && allUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;