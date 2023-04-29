import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Card, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";

const UserTable = () => {

    const [data, setData] = useState([]);
    const [userId, setUserId] = useState({});
    const [userImg, setUserImg] = useState({});
    const [userfName, setUserFName] = useState({});
    const [userlName, setUserLName] = useState({});

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

    };

    const dataRowImgView = (id, img,fname, lname) => {
        handleShow();
        setUserId(id);
        setUserImg(img);
        setUserFName(fname);
        setUserLName(lname);

    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(`${configUrl.SERVER_URL}users/viewAllUsers/${configUrl.SESSION_DB}`)
            .then((res) => {

                const getData = res.data.data;
                setData(getData);
            });
    };


    const userDisable = (e) => {
        axios
            .patch(`${configUrl.SERVER_URL}users/user-avaiability/${e}`, {
                userId: e,
                user_isActive: 0,
                u_sync: 0,
                db: configUrl.SESSION_DB,
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => { });
    };

    const userEnable = (e) => {
        axios
            .patch(`${configUrl.SERVER_URL}users/user-avaiability/${e}`, {
                userId: e,
                user_isActive: 1,
                u_sync: 0,
                db: configUrl.SESSION_DB,
            })
            .then((res) => {
                fetchData();
            })
            .catch((err) => { });
    };

    //password reset
    const userReset = (e, email) => {
        axios
            .patch(`${configUrl.SERVER_URL}users/reset/${e}`, {
                userId: e,
                isSync: "0",
                newPwd: "00000",
                db: configUrl.SESSION_DB
            })
            .then((res) => {
                msg(email);
            })
            .catch((err) => { });
    };

    // msg
    const msg = (email) => {
        Swal.fire({
            icon: "info",
            title: "Reset password  : 0000",
            text: ` Password Reset!`,
            allowOutsideClick: false,
        });
    };

    const columns = [
        {
            Header: 'First Name',
            accessor: 'fName',
        },
        {
            Header: 'Last Name',
            accessor: 'lName'
        },
        {
            Header: 'Role',
            accessor: 'role'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Contact',
            accessor: 'phone'
        },
        {
            Header: 'Profile',
            Cell: ({ row }) => {
                const items = data[row.id];
                return <Button
                    className="ms-1"
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                        dataRowImgView(
                            items.userId,
                            items.userImage,
                            items.fName,
                            items.lName
                        );
                    }}
                >
                    View Img
                </Button>;
            }
        },
        {
            Header: 'State',
            Cell: ({ row }) => {
                const items = data[row.id];

                return items.isActive ? (
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={(e) => {
                            userDisable(items.userId);
                        }}
                    >
                        Disable
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => {
                            userEnable(items.userId);
                        }}
                    >
                        Enable
                    </Button>
                )
            }
        },
        {
            Header: 'Reset',
            Cell: ({ row }) => {
                const items = data[row.id];
                return <Button
                    className="ms-1"
                    variant="outline-dark"
                    size="sm"
                    onClick={() => {
                        userReset(items.userId, items.userName);
                    }}
                >
                    Reset
                </Button>;
            }
        },
    ]

    const udata = [];

    {
        data?.map((items, index) => {
            console.log('kkkkkkkk', items);

            udata.push({
                fName: items.fName,
                lName: items.lName,
                role: items.role,
                email: items.email,
                phone: items.phone,
                userImage: items.userImage,
                userId: items.userId,

            })
        })
    }



    return (
        <div>
            <div className='row'>
                <div className='card'>
                    <div className='card-body'>
                        {/* Main data table */}
                        <TableContainer columns={columns}
                            data={udata}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css" />
                        {/* End Main data table */}
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
                    <h5>{userfName} {userlName}</h5>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid black", padding: "20px" }}>
                        <div style={{ width: "280px", height: "420px", overflow: "hidden" }}>
                            <img
                                src={`${configUrl.IMAGE_PATH}image/userImage/${userImg}`}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                    </div>
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

export default UserTable