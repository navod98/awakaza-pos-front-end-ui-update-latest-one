import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const VariationTable = () => {

    const [data, setData] = useState([]);
    const [variationIdState, setVariationIdState] = useState({});
    const [variationNameState, setVariationNameState] = useState({});
    const [createdTimeState, setCreatedTimeState] = useState({});
    const [updatedTimeState, setUpdatedTimeState] = useState({});
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

    const rowViewData = (id, name, createdAt, updatedAt) => {
        handleShow();
        setVariationIdState(id);
        setVariationNameState(name);
        setCreatedTimeState(createdAt);
        setUpdatedTimeState(updatedAt);
    };

    const editData = (id, name) => {
        handleShow2();
        setVariationIdState(id);
        setVariationNameState(name);
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
            title: `${variationNameState} Changed successfully.`,
        });
    };

    const updateData = (e) => {
        e.preventDefault();
        axios
            .patch(
                `${configUrl.SERVER_URL}products/variation/updateVariation/${variationIdState}`,
                {
                    vName: variationNameState,
                    variationId: variationIdState,
                    updated_at: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                fetchData();
                handleClose2();
                updateToast();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteData = (variationId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                axios
                    .delete(
                        `${configUrl.SERVER_URL}products/variation/deleteVariation/${variationId}/${configUrl.SESSION_DB}`
                    )
                    .then((response) => {
                        fetchData();
                    });
            }
        });
    };

    //Function call when application rendering
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/variation/viewAllVariation/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getData = res.data.data;
                setData(getData);
            });
    };




    const columns =  [
            {
                Header: '#',
                Cell: () => {
                    return <input type="checkbox" className="form-check-input" />;
                }
            },
            {
                Header: 'Variation Name',
                accessor: 'varName',
            },
            {
                Header: 'Created Date',
                accessor: 'created_at'
            },
            {
                Header: 'Updated Date',
                accessor: 'updated_at'
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
                                items.varId,
                                items.varName,
                                items.created_at,
                                items.updated_at
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
                                items.varId,
                                items.varName
                            );
                        }}
                        type="button"
                        className="btn nav-btn"
                    >
                        <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>{" "}
                    </button>;
                }
            },
            {
                Header: 'Delete',
                Cell: ({ row }) => {
                    const items = data[row.id];
                    return <button
                        type="button"
                        className="btn nav-btn"
                        onClick={() => {
                            deleteData(items.varId);
                        }}
                    >
                        <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>
                    </button>;
                }
            },

        ]

    const vdata = [];


    {
        data?.map((items, index) => {
            console.log('kkkkkkkk', items);

            const updateDate = items.updated_at === null ? "Still not updated" : new Date(items.updated_at).toDateString();

            const dateString = new Date(items.created_at).toDateString();

            vdata.push({
                varName: items.varName,
                created_at: dateString,
                updated_at: updateDate,
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
                            data={vdata}
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
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Variation name</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{variationNameState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Created at</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(createdTimeState).toLocaleString()}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Last Updated</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{" "}
                                        {updatedTimeState === null
                                            ? "Still not updated"
                                            : new Date(updatedTimeState).toLocaleString()}</td>
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
                            updateData(e);
                        }}
                    >
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Variation Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vName"
                                    value={variationNameState}
                                    required
                                    onChange={(e) => {
                                        setVariationNameState(e.target.value);
                                    }}
                                />
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

export default VariationTable