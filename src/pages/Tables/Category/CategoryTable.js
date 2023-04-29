import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import dateFormat, { masks } from "dateformat";


const CategoryTable = () => {

    const [data, setData] = useState([]);

    // const [cid, setcId] = useState({});

    const [id, setId] = useState({});
    const [cateName, setCateName] = useState({});
    const [createTime, setCreateTime] = useState({});
    const [updatedTime, setUpdatedTime] = useState({});

    const [showModal, setShow] = useState(false);
    const [showModal2, setShow2] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow2(true);
    };

    const handleModal = (
        catId,
        catNames
    ) => {
        handleShow2();
        setId(catId);
        setCateName(catNames);
    };


    const showDataByRow = (
        cartId,
        cateNames,
        createTime,
        upadteTime
    ) => {
        handleShow();
        setId(cartId);
        setCateName(cateNames);
        setCreateTime(createTime);
        setUpdatedTime(upadteTime);
    };



    //Function call when application rendering
    useEffect(() => {
        fetchData();
    }, []);


    //fetch data to table
    const fetchData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/category/viewAllCategory/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getData = res.data.data;
                setData(getData);
            });
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
            title: `${cateName} Changed successfully.`,
        });
    };

    //update data
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .patch(`${configUrl.SERVER_URL}products/category/updateCategory/${id}`, {
                catName: cateName,
                catId: id,
                updatedDate: dateFormat(new Date(), "isoDateTime"),
                db: configUrl.SESSION_DB,
            })
            .then((res) => {
                fetchData();
                handleClose2();
                updateToast();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //delete data
    const deleteCategory = (catId) => {
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
                        `${configUrl.SERVER_URL}products/Category/deleteCategory/${catId}/${configUrl.SESSION_DB}`
                    )
                    .then((response) => {
                        fetchData();
                    });
            }
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
            Header: 'Category Name',
            accessor: 'catName',
        },
        {
            Header: 'Added Date',
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
                console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', items);
                return <button
                    type="button"
                    className="btn nav-btn"
                    onClick={() => {
                        showDataByRow(
                            items.id,
                            items.catName,
                            items.created_at,
                            items.updated_at
                        );
                    }}
                >
                    <i className="mdi mdi-eye font-size-16 text-primary me-1"></i>
                </button>;
            }
        },
        {
            Header: 'Edit',
            Cell: ({ row }) => {
                const items = data[row.id];
                return <button
                    onClick={() => {
                        handleModal(
                            items.catId,
                            items.catName
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
                const items = cdata[row.id];
                console.log('oooooooooooooooooooooooooooooooooo', items);
                return <button
                    onClick={() => {
                        deleteCategory(items.catId);
                    }}
                    type="button"
                    className="btn nav-btn"
                >
                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>{" "}
                </button>;
            }

        },

    ]


    const cdata = [];

    {
        data?.map((items, index) => {

            const cdateString = new Date(items.created_at).toDateString();

            const updateDate = items.updated_at === null ? "Still not updated" : new Date(items.updated_at).toDateString();


            cdata.push({
                catId: items.catId,
                catName: items.catName,
                created_at: cdateString,
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
                        <TableContainer
                            columns={columns}
                            data={cdata}
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
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Category Name</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cateName}</td>
                                </tr>
                            </thead>
                            <thead >
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Addes Date</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(createTime).toLocaleString()}</td>
                                </tr>
                            </thead>
                            <thead >
                                <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Updated Date</th>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{updatedTime === null
                                        ? "Still not updated"
                                        : new Date(updatedTime).toLocaleString()}</td>
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
                    <h5>Edit Category</h5>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cateName"
                                    value={cateName || ""}
                                    onChange={(e) => setCateName(e.target.value)}
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
                                {/* Model Footer */}
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
export default CategoryTable