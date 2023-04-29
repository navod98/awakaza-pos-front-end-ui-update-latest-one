import React from 'react';
import { Modal } from "react-bootstrap";

const CustomerModals = ({ setOpenModal }) => {
  return (
    <div>
            <Modal show={setOpenModal}>
                <Modal.Header>
                    <h5>Add Customer</h5>
                    <div className="modal__close">
                        <h5
                            className="view overlay zoom"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <i
                                className="hoverable bx bx-x "
                                style={{ fontSize: "26px" }}
                            ></i>
                        </h5>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    {/* start add Customer form  */}
                    <form>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert Customer Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">NIC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert NIC"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert Contact Number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Address Line1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert Address Line1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Address Line2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert Address Line2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Street</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert Street"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    placeholder="Insert City"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    {/* end add Customer form  */}
                </Modal.Body>

                {/* Model Footer */}
                <div className="modal-footer">
                    <button className="btn btn-secondary " data-dismiss="modal"
                        type="button"
                        onClick={() => {
                            setOpenModal(false);
                        }}> Close
                    </button>
                    <button type="button" className="btn btn-primary ">
                        Submit
                    </button>
                    {/* Model Footer */}
                </div>
            </Modal>
        </div>
  )
}

export default CustomerModals