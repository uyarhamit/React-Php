import React from 'react';
import { Alert } from 'react-bootstrap';

const alert = ({ showAlert, alertText, alert, setShowAlert }) => {
    return (
        <Alert className='text-center' show={showAlert} variant={alert} onClose={() => setShowAlert(false)} dismissible><h4>{alertText}</h4></Alert>
    )
}

export default alert