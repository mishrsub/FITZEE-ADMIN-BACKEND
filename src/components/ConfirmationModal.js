import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDelete,
  itemToDelete,
}) {
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete(itemToDelete);
    onClose();
  };

  return (
    <Dialog 
    open={open} 
    onClose={handleCancel}
    >
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete Workshop {itemToDelete}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
        onClick={handleCancel} 
        color="primary"
        >
          Cancel
        </Button>
        <Button 
        onClick={handleDelete} 
        color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
