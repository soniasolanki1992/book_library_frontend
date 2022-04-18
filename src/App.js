import React, { useState, Fragment, useEffect  } from 'react'
import AddBookForm from './forms/AddBookForm'

import BookTable from './tables/BookTable'


const App = () => {
	const booksData = []
	const [ books, setBooks ] = useState(booksData)
	const [ data, setdata ] = useState()
	const getData = () => {
		fetch('http://127.0.0.1:8000/api/books', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }
		})
		  .then((res) => res.json())
		  .then((result) => setBooks(result[0]) )
		  .catch((err) => console.log('error'))
	  }
	 
	  useEffect(() => { 
		getData()
	  }, [] ) 
	const editHandle =(data)=>{
		setdata(data)
		
	}
	const addBook = book => {
		book.id = books.length + 1
		//const newList = books.push(book); 
		setBooks([ ...books, book ])
	}
	const editBook = book => {
		getData()
	}
	const deleteBook = book => {
		getData()
	}

	
	return (
		<div className="container">
			<div className="flex-row">
				<div className="flex-large">
						<Fragment>
							<h2>Add Book</h2>
							<AddBookForm addBook={addBook} editBook={editBook} data={data}/>
						</Fragment>
				</div>
			</div>
			<div className="flex-large">
				<h2>View Books</h2>
				<BookTable books={books} bookedit={editHandle} deleteBook={deleteBook}  />
			</div>
		</div>
		
	)
}

export default App
