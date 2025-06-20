import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./DetailProject.css"



export function DetailProject({ open, onClose, item }) {
  if (!item) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-style">
        <Typography id="modal-title" variant="h6" component="h2">
          {item.title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          開催場所: {item.place}
        </Typography>
        <img
          src={item.img}
          alt={item.title}
          style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
        />
      </Box>
    </Modal>
  );
}
