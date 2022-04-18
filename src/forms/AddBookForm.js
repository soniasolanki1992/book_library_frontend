import React, { useState, useEffect } from 'react'

const AddBookForm = props => {
	const initialFormState = { id: null, title: '', author: '', vendor:'', desc:'' }
	const [ book, setBook ] = useState( initialFormState)
	const [status, setStatus] = useState(undefined);

	useEffect(() => { 
		getinputchange()
	  }, [props.data] ) ;
	const handleInputChange = event => {
		const { name, value } = event.target

		setBook({ ...book, [name]: value })
	}
	 
	const getinputchange=()=>{
		if(props.data){
		setBook(props.data)
		}
		else{
			return ;
		}
	}
	const saveData = () => {
		fetch('http://127.0.0.1:8000/api/books', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(book),
		})
		  .then((res) => res.json())
		  .then((result) =>  setStatus({ type: 'success' }))
		  .catch((err) => setStatus({ type: 'error', err }))
	  }

	  const updateData = () => {
		fetch('http://127.0.0.1:8000/api/books/'+book.id+'?title='+book.title+'&author='+book.author+'&vendor='+book.vendor+'&desc='+book.desc, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json',
		  }
		})
		  .then((res) => res.json())
		  .then((result) =>  setStatus({ type: 'success' }))
		  .catch((err) => setStatus({ type: 'error', err }))
	  }

	  
	const handleSubmit=(event)=>{
	console.log(book.id);
			event.preventDefault()
			if(book.id!=null){
				updateData()
			}else{
				if (!book.title || !book.author || !book.author || !book.desc) return
				saveData()
			}
			
			props.editBook(book)
			setBook(initialFormState)
	}
	return (
		
		<form onSubmit={handleSubmit} >
			<>
		{status?.type === 'success' && <p >Successfully updated!</p>}
		{status?.type === 'error' && (
		  <p>Something went wrong.</p>
		)}
	  </>
			<input type="hidden" name="id" value={book.id} onChange={handleInputChange} />
			<label>Title</label>
			<input type="text" name="title" value={book.title} onChange={handleInputChange} />
			<label>Author</label>
			<input type="text" name="author" value={book.author} onChange={handleInputChange} />
			<label>Vendor</label>
			<input type="text" name="vendor" value={book.vendor} onChange={handleInputChange} />
			<label>Description</label>
			<input type="text" name="desc" value={book.desc} onChange={handleInputChange} />
			<button>Save </button>
		</form>
	)
}

export default AddBookForm
