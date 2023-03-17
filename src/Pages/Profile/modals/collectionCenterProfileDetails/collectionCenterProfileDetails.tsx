import { useEffect, useRef } from 'react';
import './CollectionCenterProfileDetails.css';
import { Modal } from 'bootstrap';

export const CollectionCenterProfileDetails = (props: any) => {
    const { isShowModal, hideModal } = props;
    const modalRef = useRef(null);

    // Handle show/hide settings modal
    useEffect(() => {
        const element = modalRef.current;
        if (element) {
            if (isShowModal) {
                const modal = new Modal(element);
                modal?.show();
            } else {
                const modal = Modal.getInstance(element);
                modal?.hide();
            }
        }
    }, [isShowModal])

    return (
        <>
            <div className="modal fade" data-bs-backdrop="static" tabIndex={-1} aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}