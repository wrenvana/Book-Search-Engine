import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutation';
import { QUERY_ME } from '../utils/queries';

const SavedBooks = () => {
  const { loading, data: userData } = useQuery(QUERY_ME);
  const [takeBookOut] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
  try {
    await takeBookOut ({
      variables: {bookId}
    });

    removeBookId(bookId);
  } catch (err) {
    console.err(err)
  };
  console.log(userData)
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : !userData ? (
        <h2>You must be logged in to view saved books</h2>
      ) : (
        <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
      )}
      </>

  );
};

export default SavedBooks;
