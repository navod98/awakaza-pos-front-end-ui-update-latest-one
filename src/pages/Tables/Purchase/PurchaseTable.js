import React, { useMemo, useState } from 'react';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import { Modal, Form } from "react-bootstrap";

const PurchaseTable = () => {

    const [showModal, setShow] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);


    //Assign to selected row data to states
    const supplierSelectionByRow = (
        // supId,
        // supName,
        // purchaseSupId,
        // purchaseCartId
    ) => {
        handleShow();
        // setIsSupplierId(supId);
        // setIsSendSupplierName(supName);
        // setIsSendPurchaseId(purchaseSupId);
        // setIsSendPurchaseCartId(purchaseCartId);
    };

    //modal on off switch functions
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };


    const columns = [
        {
            Header: 'Purchase Cart Id',
            accessor: 'purchasecartid',
        },
        {
            Header: 'Supplier',
            accessor: 'supplier'
        },
        {
            Header: 'Completed',
            accessor: 'completed'
        },
        {
            Header: 'Listed Date',
            accessor: 'listeddate'
        },
        {
            Header: 'View',
            Cell: () => {
                // const items = data[row.id];
                return <button
                    type="button"
                    className="btn nav-btn"
                    onClick={() => {
                        supplierSelectionByRow(
                        );
                    }}
                >
                    <i className="mdi mdi-eye font-size-16 text-primary me-1"></i>
                </button>;
            }
        },
        {
            Header: 'Edit',
            Cell: () => {
                return <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>;
            }
        },
        {
            Header: 'Delete',
            Cell: () => {
                return <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>;
            }
        },
    ]

    const data = [
        {
            "purchasecartid": "null",
            "supplier": "null",
            "completed": 'null',
            "listeddate": "null",
        },

    ];

    return (
        <div>
            <div className='row'>
                <div className='card'>
                    <div className='card-body'>

                        {/* <h5>DATATABLE</h5> */}
                        {/* using this component we can send our component title  */}
                        {/* <Breadcrumb title="Tables" breadcrumbItem="Data Tables" /> */}

                        {/* Main data table */}
                        <TableContainer columns={columns}
                            data={data}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css" />
                        {/* End main data table */}

                    </div>
                </div>
            </div>

            {/* Grn submition form */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <h5> Add GRN</h5>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            submitData(e);
                        }}
                    >
                        <div className="col-md-12">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="isSendSupplierId"
                                    //   defaultValue={isSendSupplierId}
                                    hidden
                                />
                                <label className="form-label">Supplier Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="isSendSupplierName"
                                    //   value={isSendSupplierName}
                                    readOnly
                                />

                                <Form.Group controlId="dob">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="grnDate"
                                        placeholder="Date of Birth"
                                    // value={supplierData.grnDate}
                                    // onChange={(e) => {
                                    //   handleChange(e);
                                    // }}
                                    />
                                </Form.Group>
                            </div>

                            {/* Model Footer */}
                            <div className="modal-footer">
                                <button className="btn btn-secondary " data-dismiss="modal"
                                    type="button"
                                    onClick={() => {
                                        setShow(false);
                                    }}> Close
                                </button>
                                <button type="submit" className="btn btn-primary ">
                                    update
                                </button>
                            </div>
                            {/* Model Footer */}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* End Grn submition form */}

        </div>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default PurchaseTable