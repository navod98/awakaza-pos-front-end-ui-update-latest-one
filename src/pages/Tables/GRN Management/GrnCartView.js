import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Card, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import dateFormat, { masks } from "dateformat";


const GrnCartView = () => {

    const [search, setSearch] = useState([]);
    const [display, setDisplay] = useState(false);
    const [productDetails, setproductDetails] = useState([]);
    const [unit, setUnit] = useState([]);
    const [data, setData] = useState({
        GpId: "",
        GgrnId: "",
        GpName: "",
        GpBarCode: "",
        Gqty: "",
        Gunit: "",
        GexpDate: "",
        GcostPrice: "",
        GsellingPrice: "",
        Gdiscount: "",
        discountedCostPrice: "",
        Ggp: "",
        GisActive: "",
    });
    const [fetchs, setFetchs] = useState([]);
    const [validateState, setValidateState] = useState();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    let totalCal = 0;
    let discountCal = 0;

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2,
    });


    useEffect(() => {
        fetchChartData();
    }, []);

    //grn modal control
    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {

        data.Gqty = "";
        data.Gunit = "";
        data.GexpDate = "";
        data.GcostPrice = "";
        data.GsellingPrice = "";
        data.Gdiscount = "";
        data.Ggp = ""

        setShowModal(true);
    };

    const handleChanges = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    };

    const handleChange = (event) => {

        const sId = localStorage.getItem('supId')

        const { value } = event.target;
        const dbName = localStorage.getItem("userDb")
        if (value === "") return setSearch([]);
        axios
            .get(`${configUrl.SERVER_URL}products/grn/filterProduct/'${value}'/${dbName}/${sId}`)
            .then((json) => {
                json.data.success === 0
                    ? setSearch("Record Not Found")
                    : setSearch(json.data.data);
            });
    };

    useEffect(() => {
        const dbName = localStorage.getItem("userDb")
        const getUnit = () => {
            axios
                .get(
                    `${configUrl.SERVER_URL}products/unit/viewAllUnit/${dbName}`
                )
                .then((res) => {
                    const data = res.data.data;
                    setUnit(data);
                });
        };
        getUnit();
    }, []);

    const fetchProData = (c) => {
        const IdInput = c;
        const dbName = localStorage.getItem("userDb")
        axios
            .get(`${configUrl.SERVER_URL}products/grn/viewProductById/'${IdInput}'/${dbName}`)
            .then((res) => {
                const data = res.data.data;
                setproductDetails(data);
            });
    };

    const submitData = (e) => {
        e.preventDefault();
        if (data.Gunit === "") {
            setValidateState("*Please select GRN unit.");
            return false;
        }
        axios
            .post(
                `${configUrl.SERVER_URL}products/grn/addGrnCart`,
                {
                    db: localStorage.getItem("userDb"),
                    GpId: data.GpId,
                    GgrnId: localStorage.getItem("IdNumber"),
                    GpName: data.GpName,
                    GpBarCode: data.GpBarCode,
                    Gqty: data.Gqty,
                    Gunit: data.Gunit,
                    GexpDate: data.GexpDate,
                    GcostPrice: data.GcostPrice,
                    GsellingPrice: data.GsellingPrice,
                    Gdiscount: data.Gdiscount,
                    discountedCostPrice: data.discountedCostPrice,
                    Ggp: data.Ggp.toFixed(2),
                    GisActive: 1,
                    created_at: dateFormat(new Date(), "isoDateTime"),
                },

                {
                    headers: { "Content-type": "application/json" },
                }
            )
            .then((res) => {
                handleClose();
                fetchChartData();

            })
            .catch((err) => {
                console.log(err);
            });
    };

    // chart Data fetch
    const fetchChartData = () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/grn/fetchCart/'${localStorage.getItem(
                    "IdNumber"
                )}'/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const fetchData = res.data.data;
                setFetchs(fetchData);
                return fetchData;
            });
    };

    const onDelete = (id, grn) => {
        console.log(id);
        console.log(grn);
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
                        `${configUrl.SERVER_URL}products/grn/deleteGrn/${id}/${grn}/${configUrl.SESSION_DB}`
                    )
                    .then((res) => {
                        console.log(res);
                        fetchChartData();
                    });
            }
        });
    };

    //qty increment
    const updateProduct = () => {
        axios
            .patch(
                `${configUrl.SERVER_URL}products/grn/updateGrn/'${localStorage.getItem(
                    "IdNumber"
                )}'`,
                {
                    id: localStorage.getItem("IdNumber"),
                    updated_at: dateFormat(new Date(), "isoDateTime"),
                    db: configUrl.SESSION_DB,
                }, {
                headers: { "Content-type": "application/json" },
            }
            )
            .then((res) => {
                navigate({
                    pathname: "/ViewGrn"
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Table start
    const columns = useMemo(
        () => [
            {
                Header: '#',
                Cell: () => {
                    return <input type="checkbox" className="form-check-input" />;
                }
            },
            {
                Header: 'Product Name',
                accessor: 'GrnCPName',
            },
            {
                Header: 'Expiring Date',
                accessor: 'grnCExpDate'
            },
            {
                Header: 'Cost Price',
                accessor: 'grnCCostPrice'
            },
            {
                Header: 'Selling Price',
                accessor: 'grnCSellingPrice'
            },
            {
                Header: 'Unit',
                accessor: 'unitName'
            },
            {
                Header: 'Qty',
                accessor: 'grnCQty'
            },
            {
                Header: 'Discount',
                accessor: 'grnCDiscountPercentage'
            },
            {
                Header: 'Gap',
                accessor: 'grnCGap'
            },
            {
                Header: 'Delete',
                Cell: ({ row }) => {
                    const items = fetchs[row.id];
                    console.log('oooooooooooooooooooooooooooooooooo', items);
                    return <button
                    onClick={() => {
                        onDelete(
                          items.grnCProductId,
                          localStorage.getItem("IdNumber")
                        );
                      }}
                        type="button"
                        className="btn nav-btn"
                    >
                       <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>{" "}
                    </button>;
                }
            },
        ],
        []
    );


    const gdata = [];

    {
        fetchs?.map((items, index) => {

            const costprice = formatter.format(items.grnCCostPrice);
            const sellingprice = formatter.format(items.grnCSellingPrice);
            const gap = formatter.format(items.grnCGap);

            gdata.push({
                GrnCPName: items.GrnCPName,
                grnCExpDate: items.grnCExpDate,
                grnCCostPrice: costprice,
                grnCSellingPrice: sellingprice,
                unitName: items.unitName,
                grnCQty: items.grnCQty,
                grnCDiscountPercentage: items.grnCDiscountPercentage,
                grnCGap: gap,
            })
        })
    }

    // Table End




    return (
        <div className="flex-container flex-column pos-rel" style={{ position: "relative" }}>
            {" "}
            <div className="row">
                <div className="col-8">
                    {/* search bar */}
                    <Card>
                        <Card.Body>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Large"
                                autoComplete="off"
                                placeholder="Search...."
                                onClick={() => setDisplay(!display)}
                                onChange={handleChange}
                                aria-describedby="inputGroup-sizing-sm"
                                style={{
                                    fontSize: "1rem",
                                }}
                            />
                        </Card.Body>
                    </Card>

                    {/* search items */}
                    <Card>
                        {typeof search === "string" ? (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-44px",
                                    zIndex: 1,
                                    color: "#FF0000",
                                }}
                            >
                                {search}
                            </div>
                        ) : (
                            search.length >= 0 && (
                                <div
                                    className="dropdown-content "
                                    style={{
                                        borderRadius: "6",
                                        overflow: "hidden",
                                        overflowY: "scroll",
                                        zIndex: 1,
                                        maxHeight: "210px",
                                    }}
                                >
                                    {search?.map((el, i) => (
                                        <div
                                            key={i}
                                            className="exampleModal  hover"
                                            style={{
                                                borderBottom: "1px solid #e6e6e6",
                                                padding: "18px 5px",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <span>
                                                <button
                                                    //   variant="outline-info
                                                    title='To choose an item, just click its name.'
                                                    size="lg"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        width: "100%",
                                                        textAlign: "left",
                                                    }}
                                                    value={el.pId}
                                                    onClick={(e) => {
                                                        let c = e.target.value;
                                                        fetchProData(c);
                                                        handleShow();
                                                    }}
                                                >
                                                    {el.pName}
                                                </button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </Card>
                    {/* search items */}

                </div>
                {/* right side process */}
                <div className="col-4">
                    <Card>
                        <Card body>
                            <div className="col">
                                <div className="row justify-content-between">
                                    <div className="col-6">
                                        <p className="mb-1">
                                            <b>Discount</b>
                                        </p>
                                    </div>
                                    <div className="flex-sm-col col-auto">
                                        <b>
                                            <p className="mb-1" id="discount-id">
                                                {fetchs?.map((items, index) => {
                                                    return (
                                                        <span key={items.id} hidden>
                                                            {(discountCal = items.grnCDiscountPercentage) /
                                                                (index + 1)}
                                                        </span>
                                                    );
                                                })}
                                                {`${discountCal}%`}
                                            </p>
                                        </b>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        <p>
                                            <b>Total</b>
                                        </p>
                                    </div>
                                    <div className="flex-sm-col col-auto">
                                        <b>
                                            <p className="mb-1" id="total-amount-cart">
                                                {/* LKR 0.00 */}
                                                {fetchs?.map((items) => {
                                                    return (
                                                        <span key={items.id} hidden>
                                                            {(totalCal += items.grnCSellingPrice)}
                                                        </span>
                                                    );
                                                })}
                                                {formatter.format(totalCal)}
                                            </p>
                                        </b>
                                    </div>
                                </div>
                                <hr className="my-0 mb-1" />
                                <button
                                    type="button"
                                    className="btn btn-primary float-right"
                                    onClick={updateProduct}
                                >
                                    Process
                                </button>
                            </div>
                        </Card>
                    </Card>
                </div>
                {/* right side process */}
            </div>


            <div className="row"></div>
            <br />

            {/* DATA Table */}
            <TableContainer
                columns={columns}
                data={gdata}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={10}
                className="custom-header-css"
            />
            {/* DATA Table */}


            {/* fetch modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h5 className="modal-title">Add Details</h5>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            submitData(e);
                        }}
                    >
                        <div className="row">
                            <input
                                hidden
                                type="text"
                                name="pId"
                                value={
                                    (data.GpId = productDetails.map((data) => {
                                        return data.pId;
                                    }))
                                }
                                onChange={(e) => {
                                    handleChanges(e);
                                }}
                            />
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="pName"
                                        value={
                                            (data.GpName = productDetails.map((data) => {
                                                return data.pName;
                                            }))
                                        }
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        readOnly
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
                                        id="formrow-inputZip"
                                        name="pBarCode"
                                        value={
                                            (data.GpBarCode = productDetails.map((data) => {
                                                return data.pBarcode;
                                            }))
                                        }
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Qty
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="formrow-inputZip"
                                        name="Gqty"
                                        value={data.Gqty}
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Unit
                                    </label>
                                    <select
                                        type="text"
                                        className="form-select"
                                        name="Gunit"
                                        value={data.Gunit}
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                    >
                                        <option value="" selected disabled="disabled">
                                            Choose...
                                        </option>
                                        {unit.map((data) => {
                                            return (
                                                <option key={data.unitId} value={data.unitId}>
                                                    {data.unitName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Expire Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="GexpDate"
                                            value={data.GexpDate}
                                            placeholder="Date of Birth"
                                            onChange={(e) => {
                                                handleChanges(e);
                                            }}
                                            min={new Date().toISOString().slice(0, 10)}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-inputState" className="form-label">
                                        Cost Price
                                    </label>
                                    <input
                                        type="number"
                                        id="formrow-costPrice"
                                        className="form-control"
                                        name="GcostPrice"
                                        value={data.GcostPrice}
                                        onChange={(e) => {
                                            handleChanges(e);
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
                                        id="formrow-inputZip"
                                        name="GsellingPrice"
                                        value={data.GsellingPrice}
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Discount %
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="formrow-inputZip"
                                        name="Gdiscount"
                                        value={data.Gdiscount}
                                        max={100}
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Discounted Cost Price
                                    </label>
                                    <input
                                        type="number"
                                        maxLength={6}
                                        className="form-control"
                                        id="formrow-inputZip"
                                        name="discountedCostPrice"
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        value={(data.discountedCostPrice =
                                            data.GcostPrice - (data.GcostPrice * data.Gdiscount / 100)).toFixed(2)}
                                        readOnly
                                    />
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="formrow-email-input" className="form-label">
                                        Gp
                                    </label>
                                    <input
                                        type="number"
                                        maxLength={6}
                                        className="form-control"
                                        id="formrow-inputZip"
                                        name="Ggp"
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        value={(data.Ggp =
                                            ((data.GsellingPrice - data.GcostPrice) /
                                                data.GsellingPrice) *
                                            100).toFixed(2)}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mt-4">
                                <div className="mb-3 ">
                                    <p className="text-danger">{validateState}</p>
                                </div>
                            </div>
                            {/* Model Footer */}
                            <div className="modal-footer">
                                <button className="btn btn-secondary " data-dismiss="modal"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}> Close
                                </button>
                                <button type="submit" className="btn btn-primary ">
                                    Submit
                                </button>
                                {/* Model Footer */}
                            </div>

                            {/*   End col*/}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )


}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default GrnCartView