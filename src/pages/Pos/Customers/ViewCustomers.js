import React ,{ useState } from "react";
import CustomerModals from 'components/Modals/Customer/CustomerModals';
import CustomerTable from "pages/Tables/Customers/CustomerTable";

const ViewCustomers = () => {

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
                                <h4 className="mb-sm-0 font-size-18">View  Customer</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);"></a>
                                        </li>
                                        <li className="breadcrumb-item active">View  Customer</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    {/* add Customer button row */}
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
                                Add Customer
                            </button>
                        </div>
                    </div>
                    <br />
                    {/* end add Customer button row */}


                    {/* Customer table */}
                    <CustomerTable/>
                    {/* Customer table */}

                    {/* Customer modal */}
                    { isModalOpen &&  <CustomerModals setOpenModal={setIsModalOpen}/>}
                    {/* Customer modal */}

                </div>
            </div>

        </body>
    )
}

export default ViewCustomers