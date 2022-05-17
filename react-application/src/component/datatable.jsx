import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Row } from 'react-bootstrap';

const Datatable = ({ users, setSelectedUser, setUsers, setAlert, setAlertText, setShowAlert }) => {
    const columns = [
        {
            label: 'Name',
            field: 'fullname'
        },
        {
            label: 'E-Mail',
            field: 'email'
        },
        {
            label: 'Phone Number',
            field: 'phone'
        },
        {
            label: 'Address',
            field: 'address'
        },
        {
            label: 'Action',
            field: 'action'
        }];
    let [search, setSearch] = useState('');
    let [data, setData] = useState();

    useEffect(() => {
        setData(users);
    }, [users])

    const searchUser = (text) => {
        setSearch(text);
        let searchVal = users.filter(user => 
            user.fullname.toLowerCase().indexOf(text.toLowerCase()) > -1 || 
            user.email.toLowerCase().indexOf(text.toLowerCase()) > -1 || 
            user.phone.toLowerCase().indexOf(text.toLowerCase()) > -1 || 
            user.address.toLowerCase().indexOf(text.toLowerCase()) > -1
            );
        (searchVal.length) ? setData(searchVal) : setData();
    }
    const setUser = (user) => {
        setSelectedUser(user);
    }

    const deleteUser = async (userId) => {
        let json = { id: userId }
        const formData = new FormData();
        formData.append('task', 'deleteUser');
        formData.append('data', JSON.stringify(json));
        let { data } = await axios.post(`${process.env.REACT_APP_URL}`, formData);
        setAlert(data['status']);
        setAlertText(data['text']);
        setShowAlert(true);
        if (data['status'] == 'success') setUsers(data['data']);
    }

    return (
        <Container>
            <Row>
                <strong className='text-center'>Made by myself</strong>
            </Row>
            <Table className='table-striped'>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.field} scope="col">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                            data.length ?
                            data.map(user => (
                                <tr key={user.id}>
                                    {columns.map((column, index) => (
                                        (column.field != 'action') ?
                                            <td key={index}>{user[column.field]}</td>
                                            :
                                            <td className='d-flex justify-content-around' key={index}>
                                                <Button className='btn-sm' variant="primary" type="button" onClick={() => setUser(user)}>
                                                    <i className='fa fa-edit'></i>
                                                </Button>
                                                <Button className='btn-sm' variant="danger" type="button" onClick={() => deleteUser(user.id)}>
                                                    <i className='fa fa-trash'></i>
                                                </Button>
                                            </td>
                                    ))}
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={5}>
                                    No Item Found
                                </td>
                            </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} align="right">
                            <Form.Group className='col-lg-2 f-right'>
                                <Form.Control type="text" placeholder="Search" maxLength={100} value={search} onChange={(val) => searchUser(val.target.value)} />
                            </Form.Group>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    )
}

export default Datatable