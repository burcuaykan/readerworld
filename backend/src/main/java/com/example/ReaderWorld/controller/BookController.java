package com.example.ReaderWorld.controller;

import com.example.ReaderWorld.model.BookDTO;
import com.example.ReaderWorld.model.CommentDTO;
import com.example.ReaderWorld.model.LikeDTO;
import com.example.ReaderWorld.model.ReadListDTO;
import com.example.ReaderWorld.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/random")
    @ResponseBody
    public ResponseEntity<?> getBooks() throws ExecutionException, InterruptedException {
        int nBooks = 10;
        List<BookDTO> books = bookService.getBooks(nBooks);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/like")
    @ResponseBody
    public ResponseEntity<?> getLikes() throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(bookService.getLikes());
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
}
