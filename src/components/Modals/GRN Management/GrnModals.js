import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";

const GrnModals = ({ setOpenModal }) => {

    const [supplierDetails, SetSupplierDetails] = useState([]);
    const [data, setData] = useState({
        grnNo: "",
        sId: "",
        sName: "",
        grnDate: "",
    });
    const [isDis, setIsDis] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = () => {
            axios
                .get(
                    `${configUrl.SERVER_URL}suppliers/viewAllSupplier/${configUrl.SESSION_DB}`
                )
                .then((res) => {
                    const data = res.data.data;
                    SetSupplierDetails(data);
                });
        };
        getData();
    }, []);

    //Modal close function
    const modalClose = () => {
        setOpenModal(false);
    };

    const submitData = (e) => {

        e.preventDefault();

        //Random id
        // let crypto = require("crypto");
        // let getId = crypto.randomBytes(6).toString("hex");

        function generateRandomID(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const getId = generateRandomID(6);

        axios
            .post(
                `${configUrl.SERVER_URL}products/grn/addGrn`,
                {
                    grnNo: getId,
                    sId: data.sId,
                    sName: data.sName,
                    grnDate: data.grnDate,
                    grnActive: 1,
                    created_at: dateFormat(new Date(), "isoDateTime"),
                    db: localStorage.getItem("userDb"),
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                console.log(res.data.sId)
                localStorage.setItem("IdNumber", getId);
                localStorage.setItem('supId', res.data.sId)
                modalClose();
                // history.push({
                //     pathname: "/ViewGrnCart",
                //     state: getId,
                // });

                navigate({
                    pathname: "/viewgrncart",
                    state: getId,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);

        //validation of date and supplier selection
        newData.sId === "Choose..." || newData.sId === "" || newData.grnDate === ""
            ? setIsDis(true)
            : setIsDis(false);
    };


    return (
        <div>
            <Modal show={setOpenModal}>
                <Modal.Header>
                    <h5 className="modal-title" id="myLargeModalLabel">
                        Add GRN
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
                    <form onSubmit={(e) => {
                        submitData(e);
                    }}>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label htmlFor="formrow-inputState" className="form-label">
                                    Select Supplier
                                </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="sId"
                                    value={data.sId}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    required
                                >
                                    <option defaultValue={"None"}>Choose...</option>
                                    {supplierDetails.map((data) => {
                                        return (
                                            <option key={data.supId} value={data.supId}>
                                                {data.supName}
                                            </option>
                                        );
                                    })}
                                </select>

                                <Form.Group controlId="dob">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control
                                       type="date"
                                       name="grnDate"
                                       placeholder="Date of Birth"
                                       value={data.grnDate}
                                       onChange={(e) => {
                                         handleChange(e);
                                       }}
                                    />
                                </Form.Group>
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

export default GrnModals