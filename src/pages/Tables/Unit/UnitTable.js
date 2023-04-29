import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const UnitTable = () => {

    const [data, setData] = useState([]);
    const [uIdState, setUIdState] = useState({});
    const [uNameState, setUNameState] = useState({});
    const [uCreatedAtState, setUCreatedAtState] = useState({});
    const [uUpdatedAtState, setUpadatedAtState] = useState({});
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

    const dataRowView = (id, name, createdAt, updatedAt) => {
        handleShow();
        setUIdState(id);
        setUNameState(name);
        setUCreatedAtState(createdAt);
        setUpadatedAtState(updatedAt);
    };

    const editData = (id, name) => {
        handleShow2();
        setUIdState(id);
        setUNameState(name);
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
      title: `${uNameState} Changed successfully.`,
    });
  };

  //update data
  const updateData = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${configUrl.SERVER_URL}products/unit/updateUnit/${uIdState}`,
        {
          unitId: uIdState,
          unitName: uNameState,
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

    //Delete Data
    const deleteUnit = (unitId) => {
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
                `${configUrl.SERVER_URL}products/unit/deleteUnit/${unitId}/${configUrl.SESSION_DB}`
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
                `${configUrl.SERVER_URL}products/unit/viewAllUnit/${configUrl.SESSION_DB}`
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
                Header: 'Unit Name',
                accessor: 'unitName',
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
                    return <button
                    type="button"
                    className="btn nav-btn"
                    onClick={() => {
                        dataRowView(
                            items.unitId,
                            items.unitName,
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
                    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii', items);
                    return <button
                        onClick={() => {
                            editData(
                                items.unitId,
                                items.unitName
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
                            deleteUnit( items.unitId);
                          }}
                    >
                        <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>
                    </button>;
                }
            },

        ]

    const udata = [];


    {
        data?.map((items, index) => {
            console.log('kkkkkkkk', items);

            const udateString = new Date(items.created_at).toDateString();
            const updateDate = items.updated_at === null ? "Still not updated" : new Date(items.updated_at).toDateString();

            udata.push({
                unitName: items.unitName,
                created_at: udateString,
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
                            data={udata}
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
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}> Unit name</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{uNameState}</td>
                                        </tr>
                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Added Date</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(uCreatedAtState).toLocaleString()}</td>
                                        </tr>
                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Updated Date</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{uUpdatedAtState === null ? "Still not updated" : new Date(uUpdatedAtState).toLocaleString()}</td>
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
                                <label className="form-label">Unit Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="uNameState"
                                    value={uNameState}
                                    required
                                    onChange={(e) => {
                                        setUNameState(e.target.value);
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

export default UnitTable