import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import UserForm from './component/userForm';
import UserList from './component/userList';
import Datatable from './component/datatable';
import Alert from './component/alert';
import Header from './component/header';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState('');
  const [alertText, setAlertText] = useState('');

  const fetchUsers = async () => {
    const formData = new FormData();
    formData.append('task', 'allUsers');
    let { data } = await axios.post(`${process.env.REACT_APP_URL}`, formData);
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Alert showAlert={showAlert} alert={alert} alertText={alertText} setShowAlert={setShowAlert} />
        </Row>
      </Container>
      <Container>
        <Row>
          <UserForm selectedUser={selectedUser} setUsers={setUsers} setShowAlert={setShowAlert} setAlert={setAlert} setAlertText={setAlertText} />
        </Row>
      </Container>
      <Container className='mt-5'>
        <Row>
          {(users.length) ? <Datatable users={users} setSelectedUser={setSelectedUser} setUsers={setUsers} setShowAlert={setShowAlert} setAlert={setAlert} setAlertText={setAlertText} /> : ''}
        </Row>
      </Container>
      <Container className='mt-5'>
        <Row>
          {(users.length) ? < UserList users={users} /> : ''}
        </Row>
      </Container>
    </>
  );
}

export default App;
