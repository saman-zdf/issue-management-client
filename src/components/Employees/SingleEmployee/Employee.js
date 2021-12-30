import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
} from '@mui/material';
import jwtdecode from 'jwt-decode';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useStyles } from './EmployeeStyles';
import { deleteUser, singleUser } from '../../../apiServices/UserApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Employee = () => {
  const classes = useStyles();
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  const decodedToken = jwtdecode(token);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    singleUser(id)
      .then((data) => setUser(data.singleUser))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    deleteUser(id)
      .then((data) => {
        console.log(data);
        dispatch({ type: 'INCREASE_COUNTER' });
        navigate('/employee');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card sx={{ maxWidth: 450 }} className={classes.card}>
        <CardMedia
          component='img'
          height='250'
          image={user.imageUrl}
          alt={user.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Name: {user.name}
          </Typography>
          <Typography variant='p' color='text.secondary'>
            Email: {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          {decodedToken.id === user._id ||
            (decodedToken.isAdmin && (
              <>
                <Button
                  size='small'
                  style={{ color: 'red' }}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              </>
            ))}
          <Link to='/employee' className={classes.backBtn}>
            Back
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Employee;