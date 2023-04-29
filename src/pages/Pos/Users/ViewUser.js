import AddUser from "components/Modals/User/AddUser";
import UserTable from "pages/Tables/User/UserTable";
import React, { useState } from "react";

const ViewUser = () => {

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
                                <h4 className="mb-sm-0 font-size-18">POS Users</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Admin/Users</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    {/* add user button row */}
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
                                Add User
                            </button>
                        </div>
                    </div>
                    <br />
                    {/* end add user button row */}

                    {/* user table */}
                    <UserTable/>
                    {/* user table */}

                    {/* user modal */}
                    {isModalOpen && <AddUser setOpenModal={setIsModalOpen} />}
                    {/* user modal */}

                </div>
            </div>
        </body>
    )
}

export default ViewUser