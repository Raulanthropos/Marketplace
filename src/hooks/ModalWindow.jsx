//Create a modal window to be used in the Main window, to confirm form submissions

const ModalWindow = (isOpen, onClose, onConfirm) => {
    return (
        <ModalWindow isOpen={isOpen} onClose={onClose}>
        <div>
          Are you sure you want to log out?
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </ModalWindow>
    )
}

export default ModalWindow;