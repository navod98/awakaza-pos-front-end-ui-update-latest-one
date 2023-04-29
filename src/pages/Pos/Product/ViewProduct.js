import ProductModals from "components/Modals/Product/ProductModals";
import ProductTable from "pages/Tables/Product/ProductTable";
import React ,{ useState } from "react";


const ViewProduct = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <body data-sidebar="dark">
            {/*Page Title*/}
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">View Products</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Product</a>
                                        </li>
                                        <li className="breadcrumb-item active">View Product</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    {/*Button Row*/}
                    <div className="row">
                        <div className="col-xl-4">
                            <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                // data-bs-toggle="modal"
                                // data-bs-target=".bs-example-modal-lg"
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            >
                                <i className="bx bx-box font-size-16 align-middle me-2"></i>{" "}
                                Add Product
                            </button>
                        </div>

                        {/*End row*/}
                    </div>
                    <br />
                    {/*end buttons*/}


                    {/* product table */}
                    <ProductTable/>
                    {/* product table */}

                    {/* product modal */}
                    { isModalOpen &&  <ProductModals setOpenModal={setIsModalOpen}/>}
                    
                    {/* product modal */}

                </div>
            </div>

        </body>
    )
}

export default ViewProduct