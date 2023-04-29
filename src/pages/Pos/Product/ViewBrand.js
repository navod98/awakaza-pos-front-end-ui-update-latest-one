import BrandModals from "components/Modals/Brand/BrandModals";
import BrandTable from "pages/Tables/Brand/BrandTable";
import React, { useState } from "react";

const ViewBrand = () => {
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
                                <h4 className="mb-sm-0 font-size-18">View  Brand</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Product</a>
                                        </li>
                                        <li className="breadcrumb-item active">View  Brand</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    {/* add brand button row */}
                    <div className="row">
                        <div className="col-xl-4">
                            <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            >
                                <i className="bx bx-box font-size-16 align-middle me-2"></i>{" "}
                                Add Brand
                            </button>
                        </div>

                        {/*    End row*/}
                    </div>
                    <br />
                    {/*end brand button row*/}


                    {/* brand table */}
                    <BrandTable/>
                    {/* brand table */}

                    {/* brand modal */}
                     { isModalOpen && <BrandModals setOpenModal={setIsModalOpen} />}
                    
                    {/* brand modal */}

                </div>
            </div>

        </body>
    )
}

export default ViewBrand