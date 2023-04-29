import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, Button } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";


const SupplierModals = ({ setOpenModal }) => {

    const [data, setData] = useState({
        supplierId: "",
        sName: "",
        chequeName: "",
        email: "",
        contact: "",
        contact2: "",
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        creditPeriod: "",
        itemDetails: "",
        isActive: "",
    });

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
            title: `${data.sName} Added successfully`,
        });
    };

    //Modal close function
    const modalClose = () => {
        setOpenModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Random Id
        // let crypto = require("crypto");
        // let supplierRandomId = crypto.randomBytes(4).toString("hex");

        function generateRandomID(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const supplierRandomId = generateRandomID(6);

        axios
            .post(
                `${configUrl.SERVER_URL}suppliers/addSupplier`,
                {
                    ...data,
                    supplierId: supplierRandomId,
                    isActive: 1,
                    created_at: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                modalClose();
                toastShow();
                setTimeout(() => {
                    window.location.reload();
                }, 2010);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    };

    return (
        <div>
            <Modal show={setOpenModal}>
                <Modal.Header>
                    <h5>Add Supplier</h5>
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
                    <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Supplier Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insert Supplier Name"
                                        id="formrow-email-input"
                                        name="sName"
                                        value={data.sName}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert Cheque Name"
                                        id="formrow-email-input"
                                        name="chequeName"
                                        value={data.chequeName}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert Email"
                                        id="formrow-email-input"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Contact #1
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insert Contact #1"
                                        id="formrow-email-input"
                                        name="contact"
                                        value={data.contact}
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
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Contact #2
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insert Contact #2"
                                        id="formrow-email-input"
                                        name="contact2"
                                        value={data.contact2}
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
                                        placeholder="Insert Address Line1"
                                        id="formrow-email-input"
                                        name="addressLine1"
                                        value={data.addressLine1}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert Address Line2"
                                        id="formrow-email-input"
                                        name="addressLine2"
                                        value={data.addressLine2}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert Street"
                                        id="formrow-email-input"
                                        name="street"
                                        value={data.street}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert City"
                                        id="formrow-email-input"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => {
                                            handleChange(e);
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
                                        placeholder="Insert Credit Period"
                                        id="formrow-email-input"
                                        name="creditPeriod"
                                        value={data.creditPeriod}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Item Details
                                    </label>
                                    <textarea
                                        type="area"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="itemDetails"
                                        value={data.itemDetails}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </div>
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
                    </form>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default SupplierModals