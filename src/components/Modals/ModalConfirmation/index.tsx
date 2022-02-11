import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { render } from 'react-dom';

interface ModalConfirmationIProps {
  title: string;
  description: string;
  handleConfirm: () => any;
}

const ModalConfirmation: React.FC<ModalConfirmationIProps> = ({
  title,
  description,
  handleConfirm,
}) => {
  const [show, setShow] = useState(true);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-80h">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            handleConfirm();
            setShow(false);
          }}
        >
          Confirmar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmation;

export const modalConfirmation = ({
  title,
  description,
  handleConfirm,
}: ModalConfirmationIProps): void => {
  const containerDomNode = document.createElement('div');
  document.body.appendChild(containerDomNode);
  render(
    <ModalConfirmation
      title={title}
      description={description}
      handleConfirm={handleConfirm}
    />,
    containerDomNode,
  );
};
