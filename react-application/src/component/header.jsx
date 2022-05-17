import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const header = () => {
    return (
        <Navbar className='mb-5' bg="dark" variant="dark">
            <Container>
                <div className='p-2 m-auto'>
                    <Navbar.Brand>Hamit Uyar</Navbar.Brand>
                </div>
            </Container>
        </Navbar>
    )
}

export default header