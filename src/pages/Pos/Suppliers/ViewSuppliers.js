import SupplierModals from "components/Modals/Supplier/SupplierModals";
import SupplierTable from "pages/Tables/Supplier/SupplierTable";
import React, { useState } from "react";

const ViewSuppliers = () => {

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
                                <h4 className="mb-sm-0 font-size-18">View Suppliers</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Supplier</a>
                                        </li>
                                        <li className="breadcrumb-item active">View Supplier</li>
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
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            >
                                <i className="bx bx-box font-size-16 align-middle me-2"></i>{" "}
                                Add Supplier
                            </button>
                        </div>

                        {/*    End row*/}
                    </div>
                    <br />
                    {/*end buttons*/}


                    {/* Supplier table */}
                    <SupplierTable/>
                    {/* Supplier table */}

                    {/* Supplier modal */}
                    { isModalOpen &&  <SupplierModals setOpenModal={setIsModalOpen}/>}
                    
                    {/* Supplier modal */}

                </div>
            </div>

        </body>
    )
}

export default ViewSuppliers