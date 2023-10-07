import { Button, Modal, Typography, Box } from "@mui/material";
import React from "react";


const PopUp = ({
  open,
  hideModal,
  body,
  title,
  callApi,
  showButton,
  ButtonNmae
}) => {
  return (
    <div>

      <Modal
        open={open}
        onClose={hideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {body}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {showButton && (
              <Button theme="success" onClick={callApi}>
                {ButtonNmae ? ButtonNmae : "Add"}
              </Button>
            )}
            <Button theme="danger" onClick={hideModal}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PopUp;
