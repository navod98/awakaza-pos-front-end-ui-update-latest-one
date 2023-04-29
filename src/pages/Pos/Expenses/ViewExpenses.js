import PurchaseChart from "components/Charts/Purchase/PurchaseChart";
import ExpensesModals from "components/Modals/Expenses/ExpensesModals";
import ExpensesTable from "pages/Tables/Expenses/ExpensesTable";
import React, { useState } from "react";

const ViewExpenses = () => {

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
                                <h4 className="mb-sm-0 font-size-18">view  Expenses</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Purchase</a>
                                        </li>
                                        <li className="breadcrumb-item active">View Expenses</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    {/* add expenses button row */}
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
                                Add Expenses
                            </button>
                        </div>

                        {/*    End row*/}
                    </div>
                    <br />
                    {/*end expenses button row*/}


                    {/* chart */}
                     <PurchaseChart/>
                    {/* chart */}


                    {/* Variation table */}
                    <ExpensesTable />
                    {/* Variation table */}

                    {/* Variation modal */}
                    {isModalOpen && <ExpensesModals setOpenModal={setIsModalOpen} />}
                    {/* Variation modal */}

                </div>
            </div>

        </body>
    )
}

export default ViewExpenses