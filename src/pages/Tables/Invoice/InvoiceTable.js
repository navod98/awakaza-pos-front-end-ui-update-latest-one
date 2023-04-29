import React, { useMemo, useEffect, useState } from 'react'
import axios from "axios";
import configUrl from "../../../ConfigURL";
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import PropTypes from 'prop-types';

const InvoiceTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${configUrl.SERVER_URL}invoices/viewAllInvoice/${configUrl.SESSION_DB}`)
            .then((res) => {
                const getData = res.data.data;
                setData(getData);
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
            Header: 'Invoice No',
            accessor: 'inId',
        },
        {
            Header: 'Cart No',
            accessor: 'inCartId'
        },
        {
            Header: 'Customer No',
            accessor: 'inCustomer'
        },
        {
            Header: 'Value',
            accessor: 'inValue'
        },
        {
            Header: 'Payment Method',
            accessor: 'inPaymentMethod'
        },
        {
            Header: 'Issued By',
            accessor: 'issuedby'
        },
        {
            Header: 'Issued Date',
            accessor: 'inSyncDate'
        },
        // {
        //     Header: 'View',
        //     Cell: () => {
        //         return  <i className="mdi mdi-eye font-size-16 text-primary me-1" id="edittooltip"></i>;
        //       }
        // },
        // {
        //     Header: 'Edit',
        //     Cell: () => {
        //         return  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>;
        //       }
        // },
        // {
        //     Header: 'Delete',
        //     Cell: () => {
        //         return  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="edittooltip"></i>;
        //       }
        // },
    ]

    //Data convert to LKR format
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2,
    });



    const idata = [];


    {
        data?.map((items, index) => {
            // console.log('kkkkkkkk', items);

            const dateString = new Date(items.inSyncDate).toDateString();
            const invalue = formatter.format(items.inValue);

            idata.push({
                inId: items.inId,
                inCartId: items.inCartId,
                inCustomer: items.inCustomer,
                inValue: invalue,
                inPaymentMethod: items.inPaymentMethod,
                issuedby: items.issuedby,
                inSyncDate: dateString,
            })
        })
    }

    return (
        <div>
            <div className='row'>
                <div className='card'>
                    <div className='card-body'>

                        {/* <h5>DATATABLE</h5> */}
                        {/* using this component we can send our component title  */}
                        {/* <Breadcrumb title="Tables" breadcrumbItem="Data Tables" /> */}

                        {/* Main data table */}
                        <TableContainer columns={columns}
                            data={idata}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css" />
                        {/* End main data table */}

                    </div>
                </div>
            </div>
        </div>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default InvoiceTable