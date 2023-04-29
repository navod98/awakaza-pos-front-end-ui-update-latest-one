import React, { useState, useRef } from "react";
import axios from "axios";
import configUrl from "../../../ConfigURL";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { get } from "jquery";
import dateFormat, { masks } from "dateformat";




function AddUser({ setOpenModal }) {

    const [storeData, setStoreData] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        userRole: "",
        email: "",
        tp: "",
        password: "",
        uImage: "",
        userIsActive: 1,
        db: localStorage.getItem("userDb"),
        created_at: dateFormat(new Date(), "isoDateTime"),
    });
    const [val, setVal] = useState("");

    //Modal close function
    const modalClose = () => {
        setOpenModal(false);
    };

    //toast for dataInsert
    const toastShow = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: `User Added successfully`,
        });
    };

    const inputImgs = useRef();

    const userRegister = (e) => {
        const imgVal = inputImgs.current.files[0];
        e.preventDefault();

        if (!imgVal?.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
            setVal("*Requires valid image.");
            return false;
        }
        if (imgVal.size > 1000000) {
            setVal("*Requires less than 1MB image.");
            return false;
        }
        userData();
    };
    const userData = () => {
        if (storeData.userRole === "") {
            setVal("*User role requires.");
            return false;
        }

        //user id generate
        var chars =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 6;
        var genUserId = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            genUserId += chars.substring(randomNumber, randomNumber + 1);
        }

        //append data
        const formData = new FormData();
        Object.entries(storeData).forEach(([key, value]) =>
            formData.append(key, value)
        );
        formData.append("userId", genUserId);
        formData.append("uImage", inputImgs.current.files[0]);
        // formData.append("db", localStorage.getItem("userDb"));

        //user data send to sub db

        axios
            .post(
                `${configUrl.SERVER_URL}users/registers`,
                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                console.log("done");
                modalClose();
                toastShow();
                // setTimeout(() => {
                //   window.location.reload();
                // }, 2010);
            })
            .catch((err) => {
                console.log(err);
            });

        //access userNo from main db
        axios
            .get(`http://127.0.0.1:8080/api/requestFromDb-${configUrl.SESSION_DB}`)
            .then((res) => {
                console.log(res.data[0].userNo);
                console.log(res.data[0].uName);
                console.log(genUserId);
                sendDataToMainDb(genUserId, res.data[0].userNo, res.data[0].uName);
            })
            .then((err) => { });

        //user-data send to main db
    };
    const sendDataToMainDb = (genId, userNo, userName) => {
        axios
            .post(
                `http://127.0.0.1:8080/api/addInitialUser `,
                {
                    userId: genId,
                    userNo: userNo,
                    userName: storeData.firstName,
                    subscriberId: userName,
                    initialUserEmail: storeData.email,
                    userpw: storeData.password,
                    userContact: storeData.tp,
                    userRole: storeData.userRole,
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => { })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        const newData = { ...storeData };
        newData[e.target.name] = e.target.value;
        setStoreData(newData);
    };
    return (
        <div>
            <div>
                <Modal show={setOpenModal}>
                    <Modal.Header>
                        <h5 className="modal-title" id="myLargeModalLabel">
                            Add Users
                        </h5>
                        <div className="modal__close">
                            <h5
                                className="view overlay zoom"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                <i
                                    className="hoverable bx bx-x "
                                    style={{ fontSize: "26px" }}
                                ></i>
                            </h5>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            onSubmit={(e) => {
                                userRegister(e);
                            }}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="formrow-email-input"
                                                className="form-label"
                                                required
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formrow-email-input"
                                                name="firstName"
                                                value={storeData.firstName}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="formrow-email-input"
                                                className="form-label"
                                                required
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formrow-email-input"
                                                name="lastName"
                                                value={storeData.lastName}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="formrow-inputState"
                                                className="form-label"
                                            >
                                                User Role
                                            </label>
                                            <select
                                                id="formrow-inputState"
                                                className="form-select"
                                                name="userRole"
                                                value={setStoreData.userRole}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                required
                                            >
                                                <option value="" selected disabled="disabled">
                                                    Choose...
                                                </option>
                                                <option value="Admin">Admin</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Cashier">Cashier</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Supervisor">Supervisor</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="md-3">
                                            <label
                                                htmlFor="formrow-email-input"
                                                className="form-label"
                                            >
                                                E-mail
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={storeData.email}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="formrow-inputState"
                                                className="form-label"
                                            >
                                                Contact
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="tp"
                                                value={storeData.tp}
                                                onChange={(e) => {
                                                    handleChange(e);
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
                                            <label
                                                htmlFor="formrow-email-input"
                                                className="form-label"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                // autoComplete="off"
                                                value={storeData.password}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                // onInput={(e) => {
                                                //   if (e.target.value.length > e.target.maxLength)
                                                //     e.target.value = e.target.value.slice(
                                                //       0,
                                                //       e.target.maxLength
                                                //     );
                                                // }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Profile Picture
                                            </label>
                                            <input
                                                className="form-control"
                                                ref={inputImgs}
                                                type="file"
                                                id="formFile"
                                                name="uImage"
                                                required
                                            />
                                            <p className="text-danger">{val}</p>
                                        </div>
                                    </div>
                                    {/* Model Footer */}
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary " data-dismiss="modal"
                                            type="button"
                                            onClick={() => {
                                                setOpenModal(false);
                                            }}> Close
                                        </button>
                                        <button type="submit" className="btn btn-primary ">
                                            Submit
                                        </button>
                                        {/* Model Footer */}
                                    </div>
                                    {/*   End col*/}
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* /.modal-content */}
                {/* /.modal-dialog */}
            </div>
            {/* /.modal */}
            {/*ModalEdit*/}
            <div
                className="modal fade bs-example-modaledit-lg"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="myLargeModalLabel">
                                Edit Vender
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Full Name
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Vende Type
                                        </label>
                                        <select id="formrow-inputState" className="form-select">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Birthday
                                        </label>
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Address
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            E-mail
                                        </label>
                                        <input type="email" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Telephone
                                        </label>
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputState" className="form-label">
                                            Working Area
                                        </label>
                                        <select className="form-select">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="dropzone">
                                                    <div className="fallback">
                                                        <input
                                                            name="file"
                                                            type="file"
                                                            multiple="multiple"
                                                        />
                                                    </div>
                                                    <div className="dz-message needsclick">
                                                        <div className="mb-3">
                                                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                                        </div>

                                                        <h4>Drop files here or click to upload.</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center mt-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary waves-effect waves-light"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*   End col*/}
                            </div>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
            {/* /.modal */}
        </div>
    );
}

export default AddUser;
