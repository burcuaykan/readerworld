package com.example.ReaderWorld.controllerTest;


import com.example.ReaderWorld.controller.BookController;
import com.example.ReaderWorld.model.BookDTO;
import com.example.ReaderWorld.model.CommentDTO;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;


@RunWith(SpringRunner.class)
@SpringBootTest
public class BookControllerTest {

    @Autowired
    private BookController bookController;

    @Test
    public void getBookTest() throws ExecutionException, InterruptedException {
        ResponseEntity<?> res = bookController.getBook("9780060255084");
        Object body = res.getBody();
        Assert.assertTrue("Returned type should be BookDTO",body instanceof BookDTO);
        BookDTO book = (BookDTO) body;
        Assert.assertEquals("Author check", "Ephraim Sevela/Antonina W. Bouis", book.getAuthor());
        Assert.assertEquals("pageNumber check", 216, book.getPageNumber());
        Assert.assertEquals("imageLink check", "http://covers.openlibrary.org/b/isbn/9780060255084-L.jpg?default=false", book.getImageLink());
        Assert.assertEquals("bookName check", "We Were Not Like Other People", book.getBookname());
    }

    @Test
    public void getBookByNameTest() throws ExecutionException, InterruptedException {
        String searchFor = "We Were Not Like Other People";

        Object body = bookController.getBookByName(searchFor).getBody();
        Assert.assertTrue("Returned type should be List<>",body instanceof List<?>);

        List<BookDTO> listOfBooks = (List<BookDTO>) body;
        for (BookDTO book : listOfBooks) {
            Assert.assertEquals("searched name should be same", searchFor, book.getBookname());
        }

    }

    @Test
    public void getBooksTest() throws ExecutionException, InterruptedException {
        Object body = bookController.getBooks().getBody();
        Assert.assertTrue("Returned type should be List<>",body instanceof List<?>);
        List<?> books = (List<?>) body;
        Assert.assertEquals("Should return 10 elements", 10, books.size());
        Assert.assertTrue("type should be BookDTO", books.get(0) instanceof BookDTO);
    }

    @Test
    public void getCommentsISBNTest() throws ExecutionException, InterruptedException {
        String searchISBN = "9780060255084";
        //With ISBN
        Object body = bookController.getCommentsISBN(searchISBN).getBody();

        Assert.assertTrue("Returned type should be List<>",body instanceof List<?>);
        List<?> comments = (List<?>) body;
        if(comments.size() != 0){
            Assert.assertTrue("type should be CommentDTO", comments.get(0) instanceof CommentDTO);
        }


    }

    @Test
    public void deleteSaveBookTest() throws ExecutionException, InterruptedException {
        BookDTO newBook = new BookDTO();
        String testISBN = "010101010101";
        newBook.setISBN(testISBN);
        newBook.setPublisher("TestPublish");
        newBook.setPageNumber(1);
        newBook.setAuthor("TestAuthor");
        newBook.setBookname("TestName");

        bookController.post(newBook);

        TimeUnit.SECONDS.sleep(1);

        Object body = bookController.getBook(testISBN).getBody();
        Assert.assertTrue(body instanceof BookDTO);
        Assert.assertEquals("TestAuthor", ((BookDTO) body).getAuthor());

        bookController.deleteBook(testISBN);

        TimeUnit.SECONDS.sleep(1);

        Object result = bookController.getBook(testISBN).getBody();
        Assert.assertNull(result);

    }


}
