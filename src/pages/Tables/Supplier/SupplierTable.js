import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const SupplierTable = () => {

    const [data, setData] = useState([]);
    const [idState, setIdState] = useState({});
    const [nameState, setNameState] = useState({});
    const [chequeState, setChequeState] = useState({});
    const [emailState, setEmailState] = useState({});
    const [contactState, setContactState] = useState({});
    const [contact2State, setContact2State] = useState({});
    const [addressLine1State, setAddressLine1State] = useState({});
    const [addressLine2State, setAddressLin2State] = useState({});
    const [streetState, setStreetState] = useState({});
    const [cityState, setCityState] = useState({});
    const [creditPState, setCreaditPState] = useState({});
    const [itemDetailState, setItemDetailState] = useState({});
    const [createdState, setCreatedState] = useState({});
    const [updatedState, setUpdatedState] = useState({});
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

    const rowViewData = (
        supplierId,
        sName,
        chequeName,
        email,
        contact,
        contact2,
        addressLine1,
        addressLine2,
        street,
        city,
        creditPeriod,
        itemDetails,
        created_at,
        updated_at
    ) => {
        handleShow();
        setIdState(supplierId);
        setNameState(sName);
        setChequeState(chequeName);
        setEmailState(email);
        setContactState(contact);
        setContact2State(contact2);
        setAddressLine1State(addressLine1);
        setAddressLin2State(addressLine2);
        setStreetState(street);
        setCityState(city);
        setCreaditPState(creditPeriod);
        setItemDetailState(itemDetails);
        setCreatedState(created_at);
        setUpdatedState(updated_at);
    };

    const editData = (
        supplierId,
        sName,
        chequeName,
        email,
        contact,
        contact2,
        addressLine1,
        addressLine2,
        street,
        city,
        creditPeriod,
        itemDetails,
        created_at,
        updated_at
    ) => {
        handleShow2();
        setIdState(supplierId);
        setNameState(sName);
        setChequeState(chequeName);
        setEmailState(email);
        setContactState(contact);
        setContact2State(contact2);
        setAddressLine1State(addressLine1);
        setAddressLin2State(addressLine2);
        setStreetState(street);
        setCityState(city);
        setCreaditPState(creditPeriod);
        setItemDetailState(itemDetails);
        setCreatedState(created_at);
        setUpdatedState(updated_at);
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
            title: `${nameState} Changed successfully.`,
        });
    };

    //data update
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(
                `${configUrl.SERVER_URL}suppliers/updateSupplier/${idState}`,
                {
                    supplierId: idState,
                    sName: nameState,
                    chequeName: chequeState,
                    email: emailState,
                    contact: contactState,
                    contact2: contact2State,
                    addressLine1: addressLine1State,
                    addressLine2: addressLine2State,
                    street: streetState,
                    city: cityState,
                    creditPeriod: creditPState,
                    itemDetails: itemDetailState,
                    created_at: createdState,
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

    const deleteSupplier = (supplierId) => {
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
                        `${configUrl.SERVER_URL}suppliers/deleteSupplier/${supplierId}/${configUrl.SESSION_DB}`
                    )
                    .then((response) => {
                        fetchData();
                    });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}suppliers/viewAllSupplier/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getData = res.data.data;
                setData(getData);
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
            Header: 'Supplier Name',
            accessor: 'supName',
        },
        {
            Header: 'Cheque Name',
            accessor: 'chequeName'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Contact',
            accessor: 'contact'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Credit Period',
            accessor: 'creditPeriod'
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
                            items.supId,
                            items.supName,
                            items.chequeName,
                            items.email,
                            items.contact,
                            items.contact2,
                            items.line1,
                            items.line2,
                            items.street,
                            items.city,
                            items.creditPeriod,
                            items.itemDetails,
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
                            items.supId,
                            items.supName,
                            items.chequeName,
                            items.email,
                            items.contact,
                            items.contact2,
                            items.line1,
                            items.line2,
                            items.street,
                            items.city,
                            items.creditPeriod,
                            items.itemDetails,
                            items.created_at,
                            items.updated_at
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
                console.log('oooooooooooooooooooooooooooooooooo', items);
                return <button
                    onClick={() => {
                        deleteSupplier(items.supId);
                    }}
                    type="button"
                    className="btn nav-btn"
                >
                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>{" "}
                </button>;
            }
        },

    ]

    const sdata = [];

    {
        data?.map((items, index) => {
            sdata.push({
                supName: items.supName,
                chequeName: items.chequeName,
                email: items.email,
                contact: items.contact,
                city: items.city,
                creditPeriod: items.creditPeriod,
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
                            data={sdata}
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
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier name</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{nameState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Cheque Name</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{chequeState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier Email</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emailState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier Contact</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contactState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier Contact 2</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact2State}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier AddressLine 1</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{addressLine1State}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier AddressLine 2</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{addressLine2State}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier Street</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{streetState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Supplier City</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cityState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Credit Period</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{creditPState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Item Details</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{itemDetailState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Added Date</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{createdState}</td>
                                </tr>
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Updated Date</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{updatedState === null ? "Still not updated" : new Date(updatedState).toLocaleString()}</td>
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
                            handleSubmit(e);
                        }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Supplier Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="nameState"
                                            value={nameState}
                                            onChange={(e) => {
                                                setNameState(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Cheque Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="chequeState"
                                            value={chequeState}
                                            onChange={(e) => {
                                                setChequeState(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="Email"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="emailState"
                                            value={emailState}
                                            onChange={(e) => {
                                                setEmailState(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Contact
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="contact"
                                            value={contactState}
                                            onChange={(e) => {
                                                setContactState(e.target.value);
                                            }}
                                            onInput={(e) => {
                                                if (e.target.value.length > e.target.maxLength)
                                                    e.target.value = e.target.value.slice(
                                                        0,
                                                        e.target.maxLength
                                                    );
                                            }}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Contact2
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="contact2State"
                                            value={contact2State}
                                            onChange={(e) => {
                                                setContact2State(e.target.value);
                                            }}
                                            onInput={(e) => {
                                                if (e.target.value.length > e.target.maxLength)
                                                    e.target.value = e.target.value.slice(
                                                        0,
                                                        e.target.maxLength
                                                    );
                                            }}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Address Line1
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="addressLine1State"
                                            value={addressLine1State}
                                            onChange={(e) => {
                                                setAddressLine1State(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Address Line2
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="addressLine2State"
                                            value={addressLine2State}
                                            onChange={(e) => {
                                                addressLine2State(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Street
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="streetState"
                                            value={streetState}
                                            onChange={(e) => {
                                                setStreetState(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="cityState"
                                            value={cityState}
                                            onChange={(e) => {
                                                setCityState(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Credit Period
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formrow-email-input"
                                            name="creditPState"
                                            value={creditPState}
                                            onChange={(e) => {
                                                setCreaditPState(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Item Details
                                        </label>
                                        <textarea
                                            type="area"
                                            className="form-control col-12"
                                            id="formrow-email-input"
                                            name="itemDetailState"
                                            value={itemDetailState}
                                            onChange={(e) => {
                                                setItemDetailState(e.target.value);
                                            }}
                                        />
                                    </div>
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
                                {/*   End col*/}
                            </div>
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
export default SupplierTable