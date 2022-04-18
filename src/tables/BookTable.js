import React,{ useState, useEffect } from 'react'

import { Modal, Button, Form  } from "react-bootstrap";
const BookTable = props => {
  const formRef = React.useRef(null);
  const [showModal, setShow] = useState(false);
  const [val, setVal]= useState()
  const [modals,setModals]=useState({user_id:'', book_id:''})
  
	const handleClose = () => setShow(false);
	const handleShow = (d) => {
    setShow(true)
    setVal(d)
    setModals({ ...modals, book_id: d  })
  }
  const itemsData = []
  const [ items, setItems ] = useState(itemsData)

  const handleSubmit=(e)=>{
    e.preventDefault()
    fetch('http://127.0.0.1:8000/api/userassign', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(modals),
    })
      .then((res) => res.json())
      .then((result) =>  setShow(false), props.deleteBook(''))
      .catch((err) => console.log('error'))
  }
  
  const handlemodalChange = event => {
   const { name, value } = event.target
 
   setModals({ ...modals, [name]: value })
 }
 

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/users', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }
		})
		  .then((res) => res.json())
		  .then((result) => setItems(result[0]))
		  .catch((err) => console.log('error'))
  }

  const handleDelete = (id) => {
    //return confirm(' you want to delete?');
    fetch('http://127.0.0.1:8000/api/books/'+id, {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json',
		  }
		})
		  .then((res) => res.json())
		  .then((result) =>  props.deleteBook(id))
		  .catch((err) => console.log('error'))
  }

  useEffect(() => { 
		fetchData()
	  }, [] ) 
	
    
  return (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Vendor</th>
        <th>Description</th>
        <th>Assigned user</th>
        <th>Assign</th>
        <th></th> <th></th>
      </tr>
    </thead>
    <tbody>
      {props.books.length > 0 ? (
        props.books.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.vendor}</td>
            <td>{book.desc}</td>
            <td>{book.name}</td>
            <td> <button onClick={() => handleShow(book.id)} >
        Assign
      </button> </td><td><button class="edit-button" onClick={() => props.bookedit(book)} >
       Edit
      </button></td><td><button class="danger-button"  onClick={() => handleDelete(book.id)} >
       Delete
      </button></td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Books</td>
        </tr>
      )}
     
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header >
        <Modal.Title>Assign user</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} ref={formRef}>
        <Modal.Body>
        <Form.Group className="mb-3">
    
    <Form.Control placeholder="input" value={val} name="book_id" type="hidden" onChange={handlemodalChange} />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>select user</Form.Label>
    <Form.Select name="user_id" id="user_id" onChange={handlemodalChange} >
      <option value=""> Select user</option>
    {items.map(item => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        </Modal.Footer> 
        </form>
      </Modal>
   

    </tbody>
  </table>
  
)
}

export default BookTable
