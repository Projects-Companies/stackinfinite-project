import React, { useState } from 'react'
import BooksHandler from '../BooksHandler'
import AuthorHandler from '../AuthorHandler'

export default function Index() {
  const [tabValue, setTabValue] = useState<string>('books')

  const tabHandler = (tabName: string) => {
    setTabValue(tabName)
  }

  return (
    <div className="vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid text-center">
          <div className="d-flex justify-content-center w-100">
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={() => {
                tabHandler('books')
              }}
            >
              Books
            </button>
            <button
              type="button"
              className="btn btn-success ms-2"
              onClick={() => {
                tabHandler('authors')
              }}
            >
              Authors
            </button>
          </div>
        </div>
      </nav>
      {tabValue === 'books' && <BooksHandler />}
      {tabValue === 'authors' && <AuthorHandler />}
    </div>
  )
}
