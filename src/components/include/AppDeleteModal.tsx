import { Button, Modal } from "react-bootstrap";

interface IDeleteModalProps {
    show: boolean;
    onHide: () => void;
    text: string;
    handleDelete?: any;
    closeDeleteModal?: any;
}

export const AppDeleteModal: React.FC<IDeleteModalProps> = ({show, onHide, text, handleDelete, closeDeleteModal }) => {

    const handleSubmit = () => {
        handleDelete();
    };

    const closeModal = () => {
        closeDeleteModal();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <div className='d-block text-lg mx-3 my-3 p-3'>
                {text}
                <div className="d-flex align-items-center justify-content-start mt-3">
                    <Button className="btn btn-sm btn-danger me-3" onClick={handleSubmit}> Yes </Button>
                    <Button onClick={closeModal} className="btn btn-sm btn-warning">No </Button>
                </div>
            </div>
        </Modal>
    )
}
