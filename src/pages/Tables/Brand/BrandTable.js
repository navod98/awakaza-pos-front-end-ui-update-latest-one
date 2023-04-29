import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const BrandTable = () => {

    const [data, setData] = useState([]);
    const [brandIdData, setBrandIdData] = useState({});
    const [brandNameState, setBrandNameState] = useState({});
    const [brandCreatedAtState, setCreateState] = useState({});
    const [updateAtState, setUpdateAtState] = useState({});

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

    const viewDataByRow = (id, name, create_at, updated_at) => {
        handleShow();
        setBrandIdData(id);
        setBrandNameState(name);
        setCreateState(create_at);
        setUpdateAtState(updated_at);
    };

    const editData = (id, name) => {
        handleShow2();
        setBrandIdData(id);
        setBrandNameState(name);
    };

    const fetchBrandData = () => {
        axios
          .get(
            `${configUrl.SERVER_URL}products/brands/viewAllBrand/${configUrl.SESSION_DB}`
          )
          .then((res) => {
            console.log("hhhhhhhhhhhhhh",res);
            const brandData = res.data.data;
            setData(brandData);
    
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
            title: `${brandNameState} Changed successfully.`,
        });
    };
    //data update
    const updateData = (e) => {
        e.preventDefault();
        axios
            .patch(
                `${configUrl.SERVER_URL}products/brands/updateBrand/${brandIdData}`,
                {
                    brandName: brandNameState,
                    updatedAt: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                }
            )
            .then((res) => {
                fetchBrandData();
                handleClose2();
                updateToast();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteBrand = (brandId) => {
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
                `${configUrl.SERVER_URL}products/brands/deleteBrand/${brandId}/${configUrl.SESSION_DB}`
              )
              .then((response) => {
                fetchBrandData();
              });
          }
        });
      };


    //Function call when application rendering
    useEffect(() => {
        fetchData();
    }, []);


    //fetch data to table
    const fetchData = () => {
        console.log("cccccccccccccccc", 'dd')
        axios
            .get(
                `${configUrl.SERVER_URL}products/brands/viewAllBrand/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                console.log("hhhhhhhhhhhhhh", res);
                const brandData = res.data.data;
                setData(brandData);
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
                Header: 'Brand Name',
                accessor: 'brandName',
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
                    // console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii', items);
                    return <button
                        type="button"
                        className="btn nav-btn"
                        onClick={() => {
                            viewDataByRow(
                                items.brandId,
                                items.brandName,
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
                        type="button"
                        className="btn nav-btn"
                        onClick={() => {
                            editData(
                                items.brandId,
                                items.brandName
                            );
                        }}
                    >
                        <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                    </button>;
                }
            },
            {
                Header: 'Delete',
                Cell: ({ row }) => {
                    const items = data[row.id];
                    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii', items);
                    return <button
                        type="button"
                        className="btn nav-btn"
                        onClick={() => {
                            deleteBrand(
                                items.brandId
                            );
                        }}
                    >
                        <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>
                    </button>;
                }
            },

        ]




    const bdata = [];

    {
        data?.map((items, index) => {
            console.log('kkkkkkkk', items);


            const bdateString = new Date(items.created_at).toDateString();
            const updateDate = items.updated_at === null ? "Still not updated" : new Date(items.updated_at).toDateString();

            bdata.push({
                brandName: items.brandName,
                created_at: bdateString,
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
                            data={bdata}
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
                    <form>
                        <div className="container">
                            <div className="row">
                                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <thead >
                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Brand Name</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{brandNameState}</td>
                                        </tr>

                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Added Date</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(brandCreatedAtState).toLocaleString()}</td>
                                        </tr>

                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>updated Date</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{updateAtState === null
                                                ? "Still not updated"
                                                : new Date(updateAtState).toLocaleString()}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* End Data show Modal */}


            {/* Edit form modal */}
            <Modal show={showModal2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <h5>Edit Brands</h5>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateData}>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Brand Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="brandNameState"
                                    value={brandNameState}
                                    onChange={(e) => {
                                        setBrandNameState(e.target.value);
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

export default BrandTable