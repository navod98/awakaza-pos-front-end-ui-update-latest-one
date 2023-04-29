import React from 'react'
import { Modal } from "react-bootstrap";


const InvoiceModals = ({ setOpenModal }) => {
  return (
    <div>
        <Modal show={setOpenModal}>
                <Modal.Header>
                    <h5>Add Test Invoice</h5>
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

                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="formrow-email-input"
                                        className="form-label"
                                    >
                                        Invoice No
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="in_number"
                                    // value={in_number}
                                    // onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="formrow-inputState"
                                        className="form-label"
                                    >
                                        Coupan Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="in_cou_code"
                                    // value={in_cou_code}
                                    // onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="formrow-inputState"
                                        className="form-label"
                                    >
                                        Select Customer
                                    </label>
                                    <select
                                        id="formrow-inputState"
                                        className="form-select"
                                    >
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </form>

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

export default InvoiceModals