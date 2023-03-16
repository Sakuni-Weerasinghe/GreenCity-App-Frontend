import { useEffect, useState } from 'react';
import './CollectionCenterProfileSettings.css';
import { Modal } from 'bootstrap';

export const CollectionCenterProfileSettings = (props: any) => {
    const { isShowModal, hideModal } = props;

    useEffect(() => {
        const element = document.getElementById('collection-center-settings-modal');
        if (isShowModal) {
            const modal = new Modal(element ? element : '', { keyboard: false });
            modal.show();
        } else {
            const modal = new Modal(element ? element : '', { keyboard: false });
            modal.hide();
        }
    }, [isShowModal])

    return (
        <>
            <div id="collection-center-settings-modal" className="modal fade" data-bs-backdrop="static" tabIndex={-1} aria-hidden="true">
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