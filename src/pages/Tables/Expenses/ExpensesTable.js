import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const ExpensesTable = () => {

    const [data, setData] = useState([]);
    const [exId, setExId] = useState([]);
    const [exAmount, setExAmount] = useState([]);
    const [exDate, setExDate] = useState([]);
    const [exDetails, setExDetails] = useState([]);
    const [showModal, setShow] = useState(false);
    const [showModal2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow2(true);
    };

    const rowViewData = (id, amount, date, details) => {
        handleShow();
        setExId(id);
        setExAmount(amount);
        setExDate(date);
        setExDetails(details);
    };

    const editData = (id, amount, date, details) => {
        handleShow2();
        setExId(id);
        setExAmount(amount);
        setExDate(moment(date).format("YYYY-MM-DD"));
        setExDetails(details);
    };

    //toast for dataUpdate
    const updateToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: `Changed successfully.`,
        });
    };

    const EditSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(`${configUrl.SERVER_URL}expenses/update-expenses/${exId}`, {
                updateExId: exId,
                updateExAmount: exAmount,
                updateExDate: exDate,
                updated_at: dateFormat(new Date(), "isoDateTime"),
                updateExDetails: exDetails,
                db: configUrl.SESSION_DB,
            })
            .then((res) => {
                fetchData();
                handleClose2();
                updateToast(exId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Function call when application rendering
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}expenses/viewAll-expenses/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                setData(res.data.data);
            });
    };



    const columns = [
        {
            Header: '#',
            Cell: () => {
                return <input type="checkbox" className="form-check-input" />;
            }
        },
        {
            Header: 'Expense Amount',
            accessor: 'exAmount',
        },
        {
            Header: 'Expense Date',
            accessor: 'exDate'
        },
        {
            Header: 'Expense Detail',
            accessor: 'expensesDetails'
        },
        {
            Header: 'Expense Created',
            accessor: 'created_at'
        },
        {
            Header: 'View',
            Cell: ({ row }) => {
                const items = data[row.id];
                console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii', items);
                return <button
                    type="button"
                    className="btn nav-btn"
                    onClick={() => {
                        rowViewData(
                            items.expensesId,
                            items.exAmount,
                            items.exDate,
                            items.expensesDetails,
                            items.created_at

                        );

                    }}
                >
                    <i className="mdi mdi-eye font-size-16 text-primary me-1" id="edittooltip"></i>
                </button>;
            }
        },
        {
            Header: 'Edit',
            Cell: ({ row }) => {
                const items = data[row.id];
                return <button
                    onClick={() => {
                        editData(
                            items.expensesId,
                            items.exAmount,
                            items.exDate,
                            items.expensesDetails
                        );
                    }}
                    type="button"
                    className="btn nav-btn"
                >
                    <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>{" "}
                </button>;
            }
        },
        // {
        //     Header: 'Delete',
        //     Cell: () => {
        //         return  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>;
        //       }
        // },
    ]
    //Data convert to LKR format
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2,
    });


    const edata = [];

    {
        data?.map((items, index) => {

            const examount = formatter.format(items.exAmount);
            const exdate = new Date(items.exDate).toDateString();
            const createdate = new Date(items.created_at).toDateString();

            edata.push({
                exAmount: examount,
                exDate: exdate,
                expensesDetails: items.expensesDetails,
                created_at: createdate,
            })
        })
    }

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
                            data={edata}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css" />
                        {/* End main data table */}

                    </div>
                </div>
            </div>

            {/* Start Data Show Modal */}
            <Modal
                show={showModal}
                onHide={handleClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        View Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card">
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead >
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Expense amount</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{exAmount}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Expense date</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(exDate).toDateString()}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Expense detail</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{exDetails}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
            {/* End Data show Modal */}

            {/* Edit form modal */}
            <Modal show={showModal2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <h5>Edit Products</h5>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            EditSubmit(e);
                        }}
                    >
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Expenses Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="exAmount"
                                    value={exAmount}
                                    min="1"
                                    required
                                    onChange={(e) => {
                                        setExAmount(e.target.value);
                                    }}
                                />
                                <Form.Group controlId="dob">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="exDate"
                                        placeholder="Expenses Date"
                                        value={exDate}
                                        max={new Date().toISOString().slice(0, 10)}
                                        onChange={(e) => {
                                            setExDate(e.target.value);
                                        }}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Expense Details</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        name="exDetails"
                                        value={exDetails}
                                        onChange={(e) => {
                                            setExDetails(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            {/* Model Footer */}
                            <div className="modal-footer">
                                <button className="btn btn-secondary " data-dismiss="modal"
                                    type="button"
                                    onClick={() => {
                                        setShow2(false);
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
            {/* End edit form modal */}

        </div>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default ExpensesTable