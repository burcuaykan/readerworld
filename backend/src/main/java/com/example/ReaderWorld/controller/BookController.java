package com.example.ReaderWorld.controller;

import com.example.ReaderWorld.model.BookDTO;
import com.example.ReaderWorld.model.CommentDTO;
import com.example.ReaderWorld.model.VoteDTO;
import com.example.ReaderWorld.model.LikeDTO;
import com.example.ReaderWorld.model.ReadListDTO;
import com.example.ReaderWorld.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/books")
public class BookController {
    //dependency injection
    @Autowired
    BookService bookService;


    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> getBook(@RequestParam(name="isbn") String ISBN) throws ExecutionException, InterruptedException {
        BookDTO book = bookService.getBook(ISBN);
        return ResponseEntity.ok(book);
    }


    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<?> getBookByName(@RequestParam(name="bookname") String ISBN) throws ExecutionException, InterruptedException {
        List<BookDTO> book = bookService.getBookByName(ISBN);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/filter")
    @ResponseBody
    public ResponseEntity<?> getBookByAuthor(@RequestParam(name="author", required = false) String authorName,
                                             @RequestParam(name="pageMin", required = false) Integer pageNumberMin,
                                             @RequestParam(name="pageMax", required = false) Integer pageNumberMax,
                                             @RequestParam(name="yearMin", required = false) String yearMin,
                                             @RequestParam(name="yearMax", required = false) String yearMax
                                             ) throws ExecutionException, InterruptedException {
        /** Example url usage

         http://localhost:8080/api/books/filter?yearMin=1500&yearMax=2500&author=Leo&pageMin=250&pageMax=800

         you can give any of the parameters in any order; however, it is required to give min and max for pageNumber
         and also for year. One of the parameters is not enough. Both of them are inclusive.

         **/

        if((pageNumberMax==null || pageNumberMin == null) && authorName == null && (yearMin==null || yearMax == null)){
            return ResponseEntity.ok(Collections.emptyList());
        }
        if((pageNumberMin == null && pageNumberMax != null) || (pageNumberMin!=null && pageNumberMax==null) ){
            throw new IllegalArgumentException("You didnt give both pageNumbers");
        }
        if((yearMin == null && yearMax != null) || (yearMin!=null && yearMax==null) ){
            throw new IllegalArgumentException("You didnt give both yearNumbers");
        }
        Date dateStart = null;
        Date dateEnd = null;
        if(yearMin != null && yearMax != null){
            int year = Integer.parseInt(yearMin);
            System.out.println(year);
            dateStart = new Date(Integer.parseInt(yearMin)-1900-1, Calendar.DECEMBER,31);
            dateEnd = new Date(Integer.parseInt(yearMax)+1-1900, Calendar.JANUARY,1);
        }


        List<BookDTO> book = bookService.getBookByFilters(authorName, pageNumberMin, pageNumberMax,dateStart, dateEnd);
        return ResponseEntity.ok(book);
    }


    @GetMapping("/random")
    @ResponseBody
    public ResponseEntity<?> getBooks() throws ExecutionException, InterruptedException {
        int nBooks = 10;
        List<BookDTO> books = bookService.getBooks(nBooks);
        return ResponseEntity.ok(books);
    }


    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<?> getAllBooks() throws ExecutionException, InterruptedException{
        List<BookDTO> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }


    @GetMapping("/like")
    @ResponseBody
    public ResponseEntity<?> getLikes() throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.getLikes());
    }

    @GetMapping("/comment")
    @ResponseBody
    public ResponseEntity<?> getCommentsISBN(@RequestParam(name="isbn", required = false) String ISBN) throws ExecutionException, InterruptedException {
        if(ISBN != null){
            return ResponseEntity.ok(bookService.getCommentsISBN(ISBN));
        }
        else{
            return ResponseEntity.ok(bookService.getCommentsUser());
        }
    }

    @GetMapping("/vote")
    @ResponseBody
    public ResponseEntity<?> getVotesISBN(@RequestParam(name="isbn", required = false) String ISBN) throws ExecutionException, InterruptedException {
        if(ISBN != null){
            return ResponseEntity.ok(bookService.getVotesISBN(ISBN));
        }
        else{
            return ResponseEntity.ok(bookService.getVotesUser());
        }
    }

    @GetMapping("/readlist")
    @ResponseBody
    public ResponseEntity<?> getReadList() throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.getReadList());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@RequestBody BookDTO book) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.saveBook(book));
    }

    @PostMapping("/comment")
    @ResponseBody
    public ResponseEntity<?> addComment(@RequestBody CommentDTO commentDTO) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.saveComment(commentDTO));
    }

    @PostMapping("/vote")
    @ResponseBody
    public ResponseEntity<?> addVote(@RequestBody VoteDTO voteDTO) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.saveVote(voteDTO));
    }

    @PostMapping("/like")
    @ResponseBody
    public ResponseEntity<?> addLike(@RequestBody LikeDTO likeDTO){
        return ResponseEntity.ok(bookService.addLike(likeDTO));
    }

    @PostMapping("/readlist")
    @ResponseBody
    public ResponseEntity<?> addReadList(@RequestBody ReadListDTO readListDTO){
        return ResponseEntity.ok(bookService.addReadList(readListDTO));
    }

    @PutMapping("")
    @ResponseBody
    public ResponseEntity<?> updateBook(@RequestBody BookDTO bookDTO) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.updateBook(bookDTO));
    }

    @DeleteMapping("")
    @ResponseBody
    public ResponseEntity<?> deleteBook(@RequestParam(name="isbn") String ISBN) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.deleteBook(ISBN));
    }


}
