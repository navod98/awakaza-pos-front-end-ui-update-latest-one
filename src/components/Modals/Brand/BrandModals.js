import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";

const BrandModals = ({ setOpenModal }) => {
  const [brand, setBrand] = useState([]);
  const [data, setData] = useState({
    brandId: "",
    brandName: "",
    isactive: "",
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
      title: `${data.brandName} Added successfully.`,
    });
  };

  useEffect(() => {
    const fetchBrandData = () => {
      axios
        .get(
          `${configUrl.SERVER_URL}products/brands/viewAllBrand/${configUrl.SESSION_DB}`
        )
        .then((res) => {
          const data = res.data.data;
          setBrand(data);
        });
    };
    fetchBrandData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Random id
    // let crypto = require("crypto");
    // let brandRandomKey = crypto.randomBytes(3).toString("hex");

    function generateRandomID(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  const brandRandomKey = generateRandomID(6);

    axios
      .post(
        `${configUrl.SERVER_URL}products/brands/addBrand`,
        {
          brandId: brandRandomKey,
          brandName: data.brandName,
          isactive: 1,
          db: configUrl.SESSION_DB,
          created_at: dateFormat(new Date(), "isoDateTime"),
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
          <h5>Add Brand</h5>
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
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insert Brand Name"
                  name="brandName"
                  value={data.brandName}
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

export default BrandModals