import { Divider, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { deleteMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
const Message = ({ message }) => {
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  const decodedToken = jwtdecode(token);
  const classes = useStyles();
  const handleDelete = (id) => {
    deleteMessage(id)
      .then((data) => {
        console.log(data);
        dispatch({ type: 'INCREASE_COUNTER' });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.mutualContainer}>
      <Typography>{message.userName}</Typography>
      <Divider />
      <Typography>{message.messageBody}</Typography>
      {(decodedToken.id === message.userId || decodedToken.isAdmin) && (
        <DeleteForeverSharpIcon
          className={classes.deleteMsgIcon}
          onClick={() => handleDelete(message._id)}
        />
      )}
    </div>
  );
};

export default Message;
