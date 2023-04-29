import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const GrnTable = () => {

    const [data, setData] = useState([]);
    const [grnData, setGrnData] = useState([]);
    const [showModal, setShow] = useState(false);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2,
    });

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const fetchGrnDataNew = (id) => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/grn/showData/${id}/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                setGrnData(res.data.data);
            });
    };

    const showDataByRow = (id) => {
        handleShow();
        fetchGrnDataNew(id);
    };

    // const showDataByRow = (id) => {
    //     handleShow();

    //     axios
    //       .get(
    //         `${configUrl.SERVER_URL}products/grn/showData/${id}/${configUrl.SESSION_DB}`
    //       )
    //       .then((res) => {
    //         setGrnData(res.data.data);
    //       });
    //   };


    //grn delete row by row
    const deleteRowData = (e) => {
        productStockReduce(e);
        grnCartDelete(e);
        grnDelete(e);
    };
    const productStockReduce = (id) => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/grn/getGrnCarts-productId/${id}/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                res.data.data.map((data) => {
                    return reduceStocks(data.grnCProductId, data.grnCQty);
                });
            });
    };

    //delete grn cart data
    const grnCartDelete = (id) => {
        axios
            .delete(
                `${configUrl.SERVER_URL}products/grn/deleteGrnCarts/${id}/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                console.log(res);
            });
    };
    //delete grns
    const grnDelete = (id) => {
        axios
            .delete(
                `${configUrl.SERVER_URL}products/grn/deleteGrns/${id}/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                console.log(res);
                deleteToast();
                fetchGrnData();
            });
    };

    //toast for delete data
    const deleteToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: `Deleted successfully.`,
        });
    };



    useEffect(() => {
        fetchGrnData();
    }, []);

    //fetch data to table
    const fetchGrnData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/grn/viewGrn/${configUrl.SESSION_DB}`
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
            Header: 'GRN Date',
            accessor: 'grnDate'
        },
        {
            Header: 'Created At',
            accessor: 'created_at'
        },
        {
            Header: 'View',
            Cell: ({ row }) => {
                const items = data[row.id];
                //console.log('wwwwwwwwwwwwwwwwwwwwwwww',items);
                return <button
                    type="button"
                    className="btn nav-btn"
                    onClick={() => {
                        showDataByRow(
                            items.grnId
                        );
                    }}
                >
                    <i className="mdi mdi-eye font-size-16 text-primary me-1"></i>
                </button>;
            }
        },
        // {
        //     Header: 'Edit',
        //     Cell: () => {
        //         return <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>;
        //     }
        // },
        {
            Header: 'Delete',
            Cell: ({ row }) => {
                const items = data[row.id];
                console.log('oooooooooooooooooooooooooooooooooo', items);
                return <button
                    onClick={() => {
                        deleteRowData(items.grnId);
                    }}
                    type="button"
                    className="btn nav-btn"
                >
                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>{" "}
                </button>;
            }
        },

    ]

    const gdata = [];


    {
        data?.map((items, index) => {
            const grndate = new Date(items.grnDate).toDateString();
            const grncreatedate = new Date(items.created_at).toDateString();

            gdata.push({
                supName: items.supName,
                grnDate: grndate,
                created_at: grncreatedate,
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
                            data={gdata}
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
                    {grnData.map(item => (
                        <div key={item.id}>
                            <label >Product Name</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{item.GrnCPName}</p>
                            <label>Expiring Date</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{new Date(item.grnCExpDate).toDateString()}</p>
                            <label>Cost Price</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{formatter.format(item.grnCCostPrice)}</p>
                            <label>Selling Price</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{formatter.format(item.grnCSellingPrice)}</p>
                            <label>Unit</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{item.unitName}</p>
                            <label>Qty</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{item.grnCQty}</p>
                            <label>Discount</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{item.grnCDiscountPercentage + "%"}</p>
                            <label>Gap</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{item.grnCGap}</p>
                            <label>Created At</label>
                            <p style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>{new Date(item.created_at).toLocaleString()}</p>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
            {/* End Data show Modal */}

        </div>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}
export default GrnTable