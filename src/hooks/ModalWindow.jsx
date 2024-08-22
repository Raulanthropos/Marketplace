import React from "react";
import { styled } from "@mui/system";
import { Grid, Button, Typography } from "@mui/material";
import createTheme from "../theme";

const MainContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalContent = styled(Grid)(({ theme }) => ({
  backgroundColor: createTheme.palette.common.white,
  padding: "2rem",
  borderRadius: "0.5rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: createTheme.palette.common.black,
}));

const ModalButtonContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "1rem",
}));

const ModalButton = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketblue,
  },
}));

const ModalWindow = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <MainContainer className="modal-overlay">
      <ModalContent className="modal-content">
        <ModalTitle className="modal-title">
          Are you sure you want to clear the cart?
        </ModalTitle>
        <ModalButtonContainer className="modal-button-container">
          <ModalButton onClick={onConfirm}>Yes</ModalButton>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </MainContainer>
  );
};

export default ModalWindow;
