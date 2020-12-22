package com.example.ReaderWorld.controller;

import com.example.ReaderWorld.model.BookDTO;
import com.example.ReaderWorld.model.CommentDTO;
import com.example.ReaderWorld.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/books")
public class BookController {
    //dependency injection
    @Autowired
    BookService bookService;


    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> getUser(@RequestParam(name="isbn") String ISBN) throws ExecutionException, InterruptedException {
        BookDTO book = bookService.getBook(ISBN);
        return ResponseEntity.ok(book);

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
}
