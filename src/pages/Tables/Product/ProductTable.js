import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';
import configUrl from "../../../ConfigURL";
import dateFormat, { masks } from "dateformat";



const ProductTable = () => {


    //all states
    const [data, setData] = useState([]);

    const [dataVariationState, setDataVariationState] = useState([]);
    const [dataBrandState, setDataBrandState] = useState([]);
    const [dataCateState, setDataCateState] = useState([]);
    const [dataUnitState, setDataUnitState] = useState([]);
    const [dataSupState, setDataSupState] = useState([]);

    const [idState, setIdState] = useState({});
    const [nameState, setNameState] = useState({});
    const [barcodeState, setBarcodeState] = useState({});
    const [variationState, setVariationState] = useState({});
    const [brandState, setBrandState] = useState({});
    const [cateState, setCateState] = useState({});
    const [unitState, setUnitState] = useState({});
    const [supplierState, setSupplierState] = useState({});
    const [buyingState, setBuyingState] = useState({});
    const [sellingState, setSellingState] = useState({});
    const [isDiscountState, setDiscountState] = useState({});
    const [imageState, setImageState] = useState({});
    const [createState, setCreateState] = useState({});

    const [isUpdate, setIsUpdate] = useState({
        varId: "",
        brandId: "",
        categoryId: "",
        unitId: "",
        supplierId: "",
    });

    const [loading, setLoadding] = useState(true);


    //Function call when application rendering
    useEffect(() => {
        console.log("use effect")
        callFunction()
    }, []);


   async  function callFunction () {
    console.log("call function 1")
    setLoadding(true);
    await fetchData();
    await getVariation();
    await  getBrand();
    await  getCategory();
    await  getUnit();
    await  getSupplier();
    setLoadding(false);
    console.log("call function 2")
    }

   
    //Fetch all product data
    const fetchData = async () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewAllProduct/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                // console.log(res.data.data)
                // const getData = res.data.data;
                setData(res.data.data);
                console.log(data)
            });
    };


    //Get method for variation
    const getVariation = async () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewVariation/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getVariatioData = res.data.data;
                setDataVariationState(getVariatioData);

            });
    };

    //GET method for brand
    const getBrand = async () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewBrand/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getBrandData = res.data.data;
                setDataBrandState(getBrandData);
            });
    };

    //GET category
    const getCategory = async () => {
        axios
            .get(
                `${configUrl.SERVER_URL}products/product/viewCategory/${configUrl.SESSION_DB}`
            )
            .then((res) => {
                const getCateData = res.data.data;
                setDataCateState(getCateData);
            });
    };

      //GET units
  const getUnit = async () => {
    axios
      .get(
        `${configUrl.SERVER_URL}products/product/viewUnits/${configUrl.SESSION_DB}`
      )
      .then((res) => {
        const getData = res.data.data;
       
        setDataUnitState(getData);
      });
  };

   //GET supplier
   const getSupplier = async() => {
    axios
      .get(
        `${configUrl.SERVER_URL}products/product/viewSupplier/${configUrl.SESSION_DB}`
      )
      .then((res) => {
        const getSupData = res.data.data;
        setDataSupState(getSupData);
      });
  };


    const [showModal, setShow] = useState(false);

    //Data show modal
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    };

    //ShowData in Modal
    const showInRow = (
        id,
        name,
        barcode,
        variation,
        brand,
        cate,
        unit,
        sup,
        buyingPrice,
        sellingPrice,
        discount,
        img,
        createDate
    ) => {
        handleShow();
        setIdState(id);
        setNameState(name);
        setBarcodeState(barcode);
        setVariationState(variation);
        setBrandState(brand);
        setCateState(cate);
        setUnitState(unit);
        setSupplierState(sup);
        setBuyingState(buyingPrice);
        setSellingState(sellingPrice);
        setDiscountState(discount);
        setImageState(img);
        setCreateState(createDate);
    };

    //##Edit data modal
    const [showModal2, setShow2] = useState(false);


    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow2(true);
    };

    //edit form in Modal
    const editData = (
        id,
        name,
        barcode,
        variation,
        brand,
        cate,
        unit,
        sup,
        buyingPrice,
        sellingPrice,
        discount

    ) => {
        handleShow2();
        setIdState(id);
        setNameState(name);
        setBarcodeState(barcode);
        setVariationState(variation);
        setBrandState(brand);
        setCateState(cate);
        setUnitState(unit);
        setSupplierState(sup);
        setBuyingState(buyingPrice);
        setSellingState(sellingPrice);
        setDiscountState(discount);
    };

    //##Edit data modal

    //toast for dataUpdate
  const updateToast = async () => {
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
      title: `${nameState} Changed successfully.`,
    });
  };

  //update data form button click
  const updateData = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${configUrl.SERVER_URL}products/product/updateProduct/${idState}/${configUrl.SESSION_DB}`,

        {
          pId: idState,
          pName: nameState,
          pBarCode: barcodeState,
          pVariation: isUpdate.varId,
          pBrand: isUpdate.brandId,
          pCategory: isUpdate.categoryId,
          pUnit: isUpdate.unitId,
          pSupplier: isUpdate.supplierId,
          pBuyingPrice: buyingState,
          pSellingPrice: sellingState,
          isDiscount: isDiscountState,
          created_at: dateFormat(new Date(), "isoDateTime"),
          db: configUrl.SESSION_DB,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        fetchData();
        setShow2();
        updateToast();
      })
      .catch((err) => {
        console.log(err);
        console.log("An error occurred:", err.message);
        console.log("Stack trace:", err.stack);
      });
  };


    //Product delete
    const deleteProduct = (pId) => {
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
                    `${configUrl.SERVER_URL}products/product/deleteProduct/${pId}/${configUrl.SESSION_DB}`
                  )
                  .then((response) => {
                    fetchData();
                  });
              }
        });
    };

  
    const columns = [
            {
                Header: '#',
                Cell: () => {
                    return <input type="checkbox" className="form-check-input" />;
                }
            },
            {
                Header: 'Products Name',
                accessor: 'pName',
            },
            {
                Header: 'Brand',
                accessor: 'brandName'
            },
            {
                Header: 'Category',
                accessor: 'catName'
            },
            {
                Header: 'Unit',
                accessor: 'unitName'
            },
            {
                Header: 'Supplier',
                accessor: 'supName'
            },
            {
                Header: 'Buying Price',
                accessor: 'pCostPrice'
            },
            {
                Header: 'Selling Price',
                accessor: 'pSellingPrice'
            },
            {
                Header: 'Discount Percentage',
                accessor: 'pMaxDiscountPercentage'
            },
            {
                Header: 'Image',
                accessor: 'pImage'
            },
            {
                Header: 'View',
                Cell: ({ row }) => {
                    var items = data[row.id];
                    return <button
                        type="button"
                        className="btn nav-btn"
                        onClick={() => {
                                    showInRow(
                                        items.pid,
                                        items.pName,
                                        items.pBarcode,
                                        items.varName,
                                        items.brandName,
                                        items.catName,
                                        items.unitName,
                                        items.supName,
                                        items.pCostPrice,
                                        items.pSellingPrice,
                                        items.pIsDiscount,
                                        items.pMaxDiscountPercentage,
                                        items.pImage,
                                        items.created_at
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
                    return <button
                        onClick={() => {
                            editData(
                                items.pId,
                                items.pName,
                                items.pBarcode,
                                items.varName,
                                items.brandName,
                                items.catName,
                                items.unitName,
                                items.supName,
                                items.pCostPrice,
                                items.pSellingPrice,
                                items.pIsDiscount
                            );
                        }}
                        type="button"
                        className="btn nav-btn"
                    >
                        <i className="mdi mdi-pencil font-size-16 text-success me-1"></i>{" "}
                    </button>;
                }
            },
            {
                Header: 'Delete',
                Cell: ({ row }) => {
                    const items = data[row.id];
                    return <button className="btn nav-btn"
                        onClick={() => {
                            deleteProduct(items.pId);
                        }}
                    >
                        <i className="mdi mdi-trash-can font-size-16 text-danger me-1"></i>
                    </button>;
                }
            },



        ]

    var pdata = [];

    {
        data?.map((items, index) => {
            console.log("map")
            console.log(items);
            pdata.push({
                pId: items.pId,
                pName: items.pName,
                brandName: items.brandName,
                catName: items.catName,
                unitName: items.unitName,
                supName: items.supName,
                pCostPrice: items.pCostPrice,
                pSellingPrice: items.pSellingPrice,
                pMaxDiscountPercentage: items.pMaxDiscountPercentage,
                pImage: items.pImage,
            })
        })

    }

    const handleChange = (e) => {
        //before update validation field null or not
        if (isUpdate.varId === "") {
            isUpdate.varId = dataVariationState
                .filter((data) => data.varName === variationState)
                .map((item) => item.varId);
        }

        if (isUpdate.brandId === "") {
            isUpdate.brandId = dataBrandState
                .filter((brand) => brand.brandName === brandState)
                .map((list) => list.brandId);
        }

        if (isUpdate.categoryId === "") {
            isUpdate.categoryId = dataCateState
                .filter((cate) => cate.catName === cateState)
                .map((cat) => cat.catId);
        }

        if (isUpdate.unitId === "") {
            isUpdate.unitId = dataUnitState
              .filter((units) => units.unitName === unitState)
              .map((unit) => unit.unitId);
          }

          if (isUpdate.supplierId === "") {
            isUpdate.supplierId = dataSupState
              .filter((sup) => sup.supName === supplierState)
              .map((supplier) => supplier.supId);
          }


        const getState = { ...isUpdate };
        getState[e.target.name] = e.target.value;
        setIsUpdate(getState);
        console.log(getState);
    };



    return (
        <div>
            <div className='row'>
                <div className='card'>
                    <div className='card-body'>

                        {/* <h5>DATATABLE</h5> */}
                        {/* using this component we can send our component title  */}
                        {/* <Breadcrumb title="Tables" breadcrumbItem="Data Tables" /> */}

                        {/* Main data table */}
                        {console.log(loading)}
                        {loading ? <div>Loading</div>: <TableContainer columns={columns}
                            data={pdata}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css" />}
                        
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
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{nameState}</td>
                                        </tr>
                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Product Barcode</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{barcodeState}</td>
                                        </tr>
                                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '1px solid #ddd', padding: '8px' }}>Product Variation</th>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{variationState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Product Brand</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{brandState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Product Category</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{cateState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Product Unit</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{unitState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Product Supplier</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{supplierState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Buying Price</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{buyingState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Selling Price</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{sellingState}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Discount</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}> {isDiscountState == 0 ? "No" : "Yes"}</td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Image</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>
                                                {imageState == null ? (
                                                    "No"
                                                ) : (
                                                    <img
                                                        src={`${configUrl.IMAGE_PATH}image/productImage/${imageState}`}
                                                        height="50px"
                                                        width={"50px"}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                        <tr style={{ border: '2px solid #ddd', padding: '8px' }}>
                                            <th style={{ backgroundColor: '#e3f1fa', border: '2px solid #ddd', padding: '8px' }}>Create Date</th>
                                            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{new Date(createState).toLocaleString()}</td>
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
                    <form onSubmit={(e) => updateData(e)}>
                        <div className="container">
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
                                            name="nameState"
                                            value={nameState}
                                            onChange={(e) => {
                                                setNameState(e.target.value);
                                            }}
                                            required />
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
                                            placeholder="Insert barcode"
                                            name="barcodeState"
                                            value={barcodeState}
                                            onChange={(e) => {
                                                setBarcodeState(e.target.value);
                                            }}
                                            required />
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
                                            name="varId"
                                            value={isUpdate.varId}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        >
                                            <option value={dataVariationState.filter((data) => data.varName === variationState).map((item) => item.varId)} selected>
                                                {variationState}
                                            </option>
                                            {dataVariationState?.map((data) => {
                                                return (
                                                    <option key={data.varId} value={data.varId}>
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
                                            name="brandId"
                                            value={isUpdate.brandId}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        >
                                            <option selected>{brandState}</option>
                                            {dataBrandState.map((data) => {
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
                                            name="categoryId"
                                            value={isUpdate.categoryId}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        >
                                            <option selected>{cateState}</option>
                                            {dataCateState.map((data) => {
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
                                        type="text"
                                        className="form-select"
                                        name="unitId"
                                        value={isUpdate.unitId}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        >
                                        <option
                                            value={dataUnitState
                                            .filter((data) => data.unitId === unitState)
                                            .map((units) => units.unitId)}
                                            selected
                                        >
                                            {unitState}
                                        </option>

                                        {dataUnitState?.map((data) => {
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
                                        name="supplierId"
                                        value={isUpdate.supplierId}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        >
                                        <option
                                            value={dataSupState
                                            .filter((data) => data.supName === supplierState)
                                            .map((suppliers) => suppliers.supId)}
                                            selected
                                        >
                                            {supplierState}
                                        </option>

                                        {dataSupState.map((data) => {
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
                                        Buying Price
                                        </label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        id="formrow-inputZip"
                                        name="buyingState"
                                        value={buyingState}
                                        onChange={(e) => {
                                            setBuyingState(e.target.value);
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
                                        name="sellingState"
                                        value={sellingState}
                                        onChange={(e) => {
                                            setSellingState(e.target.value);
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
                                    className="form-select"
                                    name="isDiscountState"
                                    value={isDiscountState}
                                    onChange={(e) => {
                                        setDiscountState(e.target.value);
                                    }}
                                    required
                                    >
                                    <option value={"1"}>Yes</option>
                                    <option value={"0"}>No</option>
                                    </select>
                                </div>
                                </div>
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

export default ProductTable