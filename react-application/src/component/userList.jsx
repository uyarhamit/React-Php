import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Row } from 'react-bootstrap';

const UserList = ({ users }) => {
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'Name',
                field: 'fullname',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'E-Mail',
                field: 'email',
                width: 270,
            },
            {
                label: 'Phone Number',
                field: 'phone',
                width: 200,
            },
            {
                label: 'Address',
                field: 'address',
                sort: 'asc',
                width: 100,
            },
        ],
        rows: users
    });
    useEffect(() => {
        setDatatable({
            columns: datatable.columns,
            rows: users
        })
    }, [users])
    return (
        <>
            <Row>
                <strong className='text-center'>Made by mdbreact</strong>
            </Row>
            <MDBDataTableV5 hover entriesOptions={[10, 20, 25]} entries={10} pagesAmount={4} data={datatable} />
        </>

    );
}

export default UserList;