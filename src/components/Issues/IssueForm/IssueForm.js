import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TypeDropdown from './TypeDropdown/TypeDropdown';
import PriorityDropdown from './PriorityDropdown/PriorityDropdown';
import StatusDropdown from './StatusDropdown/StatusDropdown';
import MembersDropdown from './MembersDropdown/MembersDropdown';
import { useGlobalContext } from '../../../contextReducer/Context';
import { createIssue } from '../../../apiServices/IssueApi';
import { useForm } from 'react-hook-form/dist/index.cjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const IssueForm = () => {
  const { state } = useGlobalContext();
  const { user } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    console.log(data);
    data.userId = user && state.user.uid;

    createIssue(data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setOpen(false);
  };

  return (
    <>
      {state.userProfile && (
        <div>
          <Button onClick={handleOpen}>New Issue</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register('title', { required: true })}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                />
                {errors.title && (
                  <p style={{ color: 'red' }}>Title can't be blank!</p>
                )}
                <TextField
                  {...register('description', { required: true })}
                  multiline
                  rows={2}
                  maxRows={4}
                  label="Description"
                />
                {errors.description && (
                  <p style={{ color: 'red' }}>Description can't be blank!</p>
                )}
                <TypeDropdown register={register} />
                {errors.type && (
                  <p style={{ color: 'red' }}>Type can't be blank!</p>
                )}
                <PriorityDropdown register={register} />
                {errors.priority && (
                  <p style={{ color: 'red' }}>Priority can't be blank!</p>
                )}
                <StatusDropdown register={register} />
                {errors.status && (
                  <p style={{ color: 'red' }}>Status can't be blank!</p>
                )}
                {/* <MembersDropdown name="members" /> */}
                <input type="submit" value="Submit" />
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default IssueForm;