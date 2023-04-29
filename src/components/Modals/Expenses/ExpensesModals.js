import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Form, Button } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";

const ExpensesModals = ({ setOpenModal }) => {

    const [data, setData] = useState({
        expensesId: "",
        expensesAmount: "",
        expensesDate: "",
        expensesDetails: "",
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
      title: `${data.expensesId} Added successfully.`,
    });
  };

    //Data storing db
    const handleSubmit = () => {

        //Random id
        // let crypto = require("crypto");
        // let exId = crypto.randomBytes(7).toString("hex");


        function generateRandomID(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const exId = generateRandomID(6);

        axios
            .post(
                `${configUrl.SERVER_URL}expenses/add-expenses`,
                {
                    expensesId: exId,
                    expensesAmount: data.expensesAmount,
                    expensesDate: data.expensesDate,
                    expensesDetails: data.expensesDetails,
                    created_at: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                console.log(res)
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
                    <h5>Add Expenses</h5>
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
                                <label className="form-label">Expenses Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="expensesAmount"
                                    value={data.expensesAmount}
                                    required
                                    min="1"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                <Form.Group controlId="dob">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="expensesDate"
                                        placeholder="Expenses Date"
                                        value={data.expensesDate}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                        max={new Date().toISOString().slice(0, 10)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Expense Details</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        name="expensesDetails"
                                        value={data.expensesDetails}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </Form.Group>
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
    )
}

export default ExpensesModals