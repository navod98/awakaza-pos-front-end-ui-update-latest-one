import InvoiceModals from "components/Modals/Invoice/InvoiceModals";
import InvoiceTable from "pages/Tables/Invoice/InvoiceTable";
import React, { useState } from "react";


const ViewInvoices = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <body data-sidebar="dark">
                <div className="page-content">
                    <div className="container-fluid">

                        {/* page title  */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">View Invoice</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Invoice</a>
                                            </li>
                                            <li className="breadcrumb-item active">View Invoice</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title  */}

                        {/* add Invoice button row */}
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
                                    Add Invoice
                                </button>
                            </div>
                        </div>
                        <br/>
                        {/* end add Invoice button row */}

                        {/* invoice table */}
                        <InvoiceTable/>
                        {/* invoice table */}

                        {/* invoice modal */}
                        {isModalOpen && <InvoiceModals setOpenModal={setIsModalOpen}/>}
                        {/* invoice modal */}

                    </div>
                </div>
        </body>
    )
}

export default ViewInvoices