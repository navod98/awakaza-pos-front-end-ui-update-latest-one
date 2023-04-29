import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";

function ProductModals({ setOpenModal }) {
    //All states
    const [data, setData] = useState({
        pId: "",
        pName: "",
        pBarCode: "",
        pVariation: "",
        pBrand: "",
        pCategory: "",
        pUnit: "",
        pSupplier: "",
        pBuyingPrice: "",
        pSellingPrice: "",
        isDiscount: "",
        pDiscountPercentage: "",
        isActive: "",
        pImage: "",
        created_at: dateFormat(new Date(), "isoDateTime"),
    });
    const [pQtyState, setPQtyState] = useState({});
    const [variation, setVariation] = useState([]);
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [unit, setUnit] = useState([]);
    const [imgVal, setImageVal] = useState("");
    const [toastMsg, setToastMsg] = useState(true);
    const [showDiscount, setShowDiscount] = useState(false);
    //Ref for image
    const inputImgs = useRef();

    //Use ref for call
    useEffect(() => {
        getVariation();
        getBrand();
        getCategory();
        getSupplier();
        getUnit();
    }, []);

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
            icon: toastMsg ? "success" : "warning",
            title: toastMsg ? "Added Successfully." : "Can't added.",
        });
    };

    //Variation data fetching to form
    const getVariation = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewVariation/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getVariationData = res.data.data;
                setVariation(getVariationData);
            });
    };

    //Brand data fetching to form
    const getBrand = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewBrand/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getBrandData = res.data.data;
                setBrand(getBrandData);
            });
    };

    //Category data fetching to form
    const getCategory = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewCategory/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getCategoryData = res.data.data;
                setCategory(getCategoryData);
            });
    };

    //Supplier data fetching to form
    const getSupplier = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewSupplier/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getSupplierData = res.data.data;
                setSupplier(getSupplierData);
            });
    };

    //GET units
    const getUnit = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewUnits/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getData = res.data.data;
                setUnit(getData);
            });
    };

    //Form submition
    const handleSubmit = (e) => {
        e.preventDefault();

        const imgValidation = inputImgs?.current?.files[0];

        if (!imgValidation) {
            formSubmit();
            return false;
        }

        if (!imgValidation?.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
            setImageVal("*Image format isn't valid.");
            return false;
        }
        if (imgValidation.size > 1000000) {
            setImageVal("*Require less than 1MB size image.");
            return false;
        }
        formSubmit();
    };

    const formSubmit = () => {
        const image = inputImgs?.current?.files[0];
        let getRandomKey = Math.floor(Math.random() * 19999999);

        if (data.pVariation === "") {
            setImageVal("*Product variation requires");
            return false;
        }
        if (data.pBrand === "") {
            setImageVal("*Product brand requires");
            return false;
        }
        if (data.pCategory === "") {
            setImageVal("*Product category requires");
            return false;
        }
        if (data.pUnit === "") {
            setImageVal("*Product unit requires");
            return false;
        }
        if (data.pSupplier === "") {
            setImageVal("*Product supplier requires");
            return false;
        }

        //Insert data to table
        const formData = new FormData();
        formData.append("pImage", inputImgs.current.files[0]);
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append("pId", getRandomKey);
        formData.append("pIsActive", 1);
        formData.append("db", configUrl.SESSION_DB);
        //Post api
        axios
            .post(
                `${configUrl.SERVER_URL}products/product/addProduct`,
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
                console.log(res);
                toastShow();
                addStock(getRandomKey);
                modalClose();

                setTimeout(() => {
                    window.location.reload();
                }, 2010);
            })
            .catch((err) => {
                console.log(err);
                setToastMsg(!toastMsg);
            });
    };

    const addStock = async (getRandomKey) => {
        //Data insert to stock table
        let randomNum = Math.floor(Math.random() * 10000001);
        try {
            let result = await axios.post(
                `${configUrl.SERVER_URL}stocks/addStock`,

                {
                    stockId: randomNum,
                    productId: getRandomKey,
                    productQty: pQtyState,
                    created_at: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                },
                {
                    headers: { "Content-type": "application/json" },
                }
            ).then((consoleRes) => {
                console.log(consoleRes)
            });

        } catch (error) {
            console.log(error);
        }
    };

    //Form data handles
    const handleChange = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(newData)

    };

    return (
        <div>
            {/* /.modal ADD */}
            <Modal show={setOpenModal}>
                <Modal.Header>
                    <h5>Add Product</h5>
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
                        encType="multipart/form-data"
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insert Product Name"
                                        name="pName"
                                        value={data.pName}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Barcode
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insert Barcode"
                                        id="formrow-inputZip"
                                        name="pBarCode"
                                        value={data.pBarCode}
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
                                        Select Variation
                                    </label>
                                    <select
                                        type="text"
                                        className="form-select"
                                        name="pVariation"
                                        value={data.pVariation}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {variation?.map((data) => {
                                            return (
                                                <option key={data.varName} value={data.varId}>
                                                    {data.varName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Select Brand
                                    </label>
                                    <select
                                        type="text"
                                        className="form-select"
                                        name="pBrand"
                                        value={data.pBrand}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {brand?.map((data) => {
                                            return (
                                                <option key={data.brandName} value={data.brandId}>
                                                    {data.brandName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Select Category
                                    </label>
                                    <select
                                        id="formrow-inputCategoryId"
                                        className="form-select"
                                        name="pCategory"
                                        value={data.pCategory}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {category?.map((data) => {
                                            return (
                                                <option key={data.catName} value={data.catId}>
                                                    {data.catName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Select Unit
                                    </label>
                                    <select
                                        id="formrow-inputCategoryId"
                                        className="form-select"
                                        name="pUnit"
                                        value={data.pUnit}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {unit?.map((data) => {
                                            return (
                                                <option key={data.unitName} value={data.unitId}>
                                                    {data.unitName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Select Supplier
                                    </label>
                                    <select
                                        id="formrow-inputState"
                                        className="form-select"
                                        name="pSupplier"
                                        value={data.pSupplier}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {supplier?.map((data) => {
                                            return (
                                                <option key={data.supName} value={data.supId}>
                                                    {data.supName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Product Quantity
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insert Product Quantity"
                                        id="formrow-inputZip"
                                        name="pQtyState"
                                        value={pQtyState}
                                        onChange={(e) => {
                                            setPQtyState(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Buying Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insert Buying Price"
                                        id="formrow-inputZip"
                                        name="pBuyingPrice"
                                        value={data.pBuyingPrice}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Selling Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Insert Selling Price"
                                        id="formrow-inputZip"
                                        name="pSellingPrice"
                                        value={data.pSellingPrice}
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
                                        Discount
                                    </label>
                                    <select
                                        id="formrow-inputState"
                                        className="form-select"
                                        name="isDiscount"
                                        value={data.isDiscount}
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (e.target.value === '0') setShowDiscount(false);
                                            else setShowDiscount(true)

                                        }}
                                        required
                                    >
                                        <option value={"0"} selected>
                                            No
                                        </option>
                                        <option value={"1"}>Yes</option>
                                        <option value={"2"}>Fixed</option>
                                    </select>
                                </div>
                            </div>
                            {
                                showDiscount && <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">
                                            Discount Percentage(%)
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Insert  Discount Percentage"
                                            id="formrow-inputZip"
                                            name="pDiscountPercentage"
                                            value={data.pDiscountPercentage}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}

                                        />
                                    </div>
                                </div>
                            }

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">
                                        Choose Product Image
                                    </label>
                                    <input
                                        className="form-control"
                                        ref={inputImgs}
                                        type="file"
                                        id="formFile"
                                        name="pImage"
                                        accept="image/*"
                                    />{" "}
                                    <p className="text-danger">{imgVal}</p>
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
                        </div>
                    </form>
                    {/* End modal form */}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProductModals;
