import React, { useState, useEffect } from "react";
import "../Components/BookList.css";

export default function BooksListPage() {
  const url = "https://t3t4-dfe-pb-grl-m1-default-rtdb.firebaseio.com/";
  const resource = "/books.json";
  const uri = url + resource;

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    fetch(uri)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedBooks = converter(data);
        setBooks(convertedBooks);
        setFilteredBooks(convertedBooks);
      });
  }, [uri]);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const titleMatch = book.title
        .toLowerCase()
        .includes(filterTerm.toLowerCase());
      const authorMatch = book.author
        .toLowerCase()
        .includes(filterTerm.toLowerCase());
      const genreMatch = book.genre
        .toLowerCase()
        .includes(filterTerm.toLowerCase());
      return titleMatch || authorMatch || genreMatch;
    });
    setFilteredBooks(filtered);
  }, [books, filterTerm]);

  function converter(data) {
    const ids = Object.keys(data);
    const objs = Object.values(data);

    return objs.map((obj, i) => {
      return { id: ids[i], ...obj };
    });
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Pesquisar por título, autor ou categoria"
          size="30"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        />
      </div>

      <div>
        <ul data-cy="bookListContainer" className="books-container">
          {filteredBooks.map((book) => (
            <li data-cy="bookListItem" key={book.id} className="book-item">
              <div>Título: {book.title}</div>
              <div>Autor: {book.author}</div>
              <div>Categoria: {book.genre}</div>
              <div>
                Capa:{" "}
                <img src={book.cover} alt={book.title} className="book-cover" />
              </div>
              <div>Rating: {book.rating}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
