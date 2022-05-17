import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Form, Button, Col, Alert } from 'react-bootstrap';

const UserForm = ({ setUsers, selectedUser, setShowAlert, setAlert, setAlertText }) => {
    const [clear, setClear] = useState(true);
    const [id, setId] = useState(0);
    const [buttonText, setButtonText] = useState('Add');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [phoneCheck, setPhoneCheck] = useState(true);
    const [address, setAddress] = useState('');
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const clearInput = () => {
        setId(0);
        setFullname('');
        setEmail('');
        setPhone('');
        setAddress('');
        setClear(true);
        setButtonText('Add');
    }

    const onHandlePhone = (obj) => {
        let country = obj.country;
        let code = country.dialCode;
        let number = obj.number;
        if (dialCode != code) {
            setDialCode(code);
            setPhone(code);
        }
        else {
            setPhone(number);
        }
        
        country.format = country.format.replace(/([+,-,(,),\s,-])/g, '');
        let formats = country.format.length;
        if (phone.match(/12345/)) {
            setPhoneCheck(false);
            setAlert('danger');
            setAlertText('Invalid number');
            setShowAlert(true);
        } else if (phone.match(/1234/)) {
            setPhoneCheck(false);
            setAlert('danger');
            setAlertText('Invalid number');
            setShowAlert(true);
        } else if (phone.length < formats) {
            setPhoneCheck(false);
            setAlert('danger');
            setAlertText('Short number');
            setShowAlert(true);
        } else {
            setPhoneCheck(true);
            setShowAlert(false);
        }
    }

    const checkMail = (mail) => {
        return emailRegex.test(mail);
    }

    const sentForm = async () => {
        setShowAlert(false);
        if (fullname.trim() == '') {
            setAlert('danger');
            setAlertText('Please enter your name!');
            setShowAlert(true);
            return false;
        }
        if (!checkMail(email) || email.trim() == '') {
            setAlert('danger');
            setAlertText('E-Mail not valid!');
            setShowAlert(true);
            return false;
        }
        if (!phoneCheck || phone.trim() == '') {
            setAlert('danger');
            setAlertText('Please enter your phone number!');
            setShowAlert(true);
            setPhoneCheck(false);
            return false;
        }
        if (address.trim() == '') {
            setAlert('danger');
            setAlertText('Please enter your address!');
            setShowAlert(true);
            return false;
        }
        setShowAlert(false);
        let json = {
            id, fullname, email, phone, address
        }
        const formData = new FormData();
        (!id) ? formData.append('task', 'addUser') : formData.append('task', 'editUser')
        formData.append('data', JSON.stringify(json));
        let { data } = await axios.post(`${process.env.REACT_APP_URL}`, formData);
        setAlert(data['status']);
        setAlertText(data['text']);
        setShowAlert(true);
        if (data['status'] == 'success') {
            setUsers(data['data']);
            clearInput();
        }
    }

    useEffect(() => {
        if (selectedUser) {
            setId(selectedUser.id);
            setFullname(selectedUser.fullname);
            setEmail(selectedUser.email);
            setPhone(selectedUser.phone);
            setAddress(selectedUser.address);
            setClear(false);
            setButtonText('Update');
        }
    }, [selectedUser])

    return (
        <Col lg='12' className='m-auto'>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name Surname</Form.Label>
                    <Form.Control type="text" placeholder="Name Surname" maxLength={100} value={fullname} onChange={(val) => setFullname(val.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" maxLength={100} value={email} onChange={(val) => setEmail(val.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                        country={'us'}
                        value={phone}
                        onChange={(number, country) => onHandlePhone({ number, country })}
                        isValid={phoneCheck}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} type="email" placeholder="Your address" maxLength={200} value={address} onChange={(val) => setAddress(val.target.value)} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-between">
                    <Button disabled={clear} variant='danger' type='button' onClick={clearInput}>
                        Clear all
                    </Button>
                    <Button variant="primary" type="button" onClick={sentForm}>
                        {buttonText}
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    )
}

export default UserForm;