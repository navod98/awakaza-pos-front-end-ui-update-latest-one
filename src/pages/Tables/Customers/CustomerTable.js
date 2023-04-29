import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';

const CustomerTable = () => {

    const [data, setData] = useState([]);


    //const [showModal, setShow] = useState(false);
    //const [showModal2, setShow2] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => {
    //     setShow(true);
    // };

    // const handleClose2 = () => setShow2(false);
    // const handleShow2 = () => {
    //     setShow2(true);
    // };

    const rowViewData = () => {
        handleShow();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}customers/viewAllCustomer/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const result = res.data.data;
                setData(result);
            });
    };



    const columns = useMemo(
        () => [
            {
                Header: '#',
                Cell: () => {
                    return <input type="checkbox" className="form-check-input" />;
                }
            },
            {
                Header: 'Customer Name',
                accessor: 'cusName',
            },
            {
                Header: 'NIC',
                accessor: 'cusNic'
            },
            {
                Header: 'Contact Number',
                accessor: 'cusPhone'
            },
            {
                Header: 'Address Line 1',
                accessor: 'cusLine1'
            },
            {
                Header: 'Address Line 2',
                accessor: 'cusLine2'
            },
            {
                Header: 'Street',
                accessor: 'cusStreet'
            },
            {
                Header: 'City',
                accessor: 'cusCity'
            },
            // {
            //     Header: 'View',
            //     Cell: ({ row }) => {
            //         const items = data[row.id];
            //         console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii', items);
            //         return <button
            //             type="button"
            //             className="btn nav-btn"
            //             onClick={() => {
            //                 rowViewData();

            //             }}
            //         >
            //             <i className="mdi mdi-eye font-size-16 text-primary me-1" id="edittooltip"></i>
            //         </button>;
            //     }
            // },
            // {
            //     Header: 'Edit',
            //     Cell: () => {
            //         return <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>;
            //     }
            // },
            // {
            //     Header: 'Delete',
            //     Cell: () => {
            //         return <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>;
            //     }
            // },

        ],
        []
    );

    const cdata = [];

    {
        data?.map((items, index) => {
            console.log('kkkkkkkk', items);
            cdata.push({
                cusName: items.cusName,
                cusNic: items.cusNic,
                cusPhone: items.cusPhone,
                cusLine1: items.cusLine1,
                cusLine2: items.cusLine2,
                cusStreet: items.cusStreet,
                cusCity: items.cusCity,
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
            {/* <Modal
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
                    
                </Modal.Body>
            </Modal> */}
            {/* End Data show Modal */}

        </div>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default CustomerTable