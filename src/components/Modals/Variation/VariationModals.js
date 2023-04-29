import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";

const VariationModals = ({ setOpenModal }) => {
    const [data, setData] = useState({
        variationId: "",
        vName: "",
        isActive: "",
    });

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
            title: `${data.vName} Added successfully.`,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Random id
        // let crypto = require("crypto");
        // let getRandomKey = crypto.randomBytes(4).toString("hex");

        function generateRandomID(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
      
        const getRandomKey = generateRandomID(6);

        axios
            .post(
                `${configUrl.SERVER_URL}products/variation/addVariation`,
                {
                    variationId: getRandomKey,
                    vName: data.vName,
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
                }, 2050);
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
                    <h5>Add Variation</h5>
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
                            handleSubmit(e);
                        }}
                    >
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Variation Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Insert Variation Name"
                                    name="vName"
                                    value={data.vName}
                                    required
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
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
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default VariationModals