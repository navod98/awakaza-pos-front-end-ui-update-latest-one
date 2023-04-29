import GrnCartView from 'pages/Tables/GRN Management/GrnCartView'
import React from 'react'

const ViewGrnCart = () => {
  return (
    <body data-sidebar="dark">

            {/*Page Title*/}

            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">View GRN CARTS</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Grn</a>
                                        </li>
                                        <li className="breadcrumb-item active">View Grn</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <br/>

                    {/*Charts*/}
                    <GrnCartView/>
                  


                </div>
            </div>

        </body>
  )
}

export default ViewGrnCart