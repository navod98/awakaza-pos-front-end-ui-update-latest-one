import PurchaseTable from "pages/Tables/Purchase/PurchaseTable";
import React, { useState } from "react";

const ViewPurchase = () => {
    return (
        <body data-sidebar="dark">

            {/*Page Title*/}

            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">View Confirm Purchase Orders</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Product</a>
                                        </li>
                                        <li className="breadcrumb-item active">View Confirm Purchase Orders</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    {/* purchase orders table*/}
                    <PurchaseTable />
                    {/* purchase orders table*/}


                </div>
            </div>

        </body>
    )
}

export default ViewPurchase