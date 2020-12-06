package com.example.ReaderWorld.service;

import com.example.ReaderWorld.model.BookDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class BookService{

    public static final String COL_NAME="Book";


    public String saveBook(BookDTO bookDTO) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        BookDTO bookSaved = new BookDTO();

        bookSaved.setBookname(bookDTO.getBookname());
        bookSaved.setAuthor(bookDTO.getAuthor());
        bookSaved.setPageNumber(bookDTO.getPageNumber());
        bookSaved.setISBN(bookDTO.getISBN());
        bookSaved.setPublicationDate(bookDTO.getPublicationDate());
        bookSaved.setPublisher(bookDTO.getPublisher());

        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(bookSaved.getISBN()).set(bookSaved);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public BookDTO getBook(String ISBN) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(ISBN);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        BookDTO book = null;
        if(document.exists()) {
            book = document.toObject(BookDTO.class);
            System.out.println("Book with ISBN  " + ISBN);
            return book;
        }else {
            System.out.println("No Book with ISBN :" + ISBN);
            return null;
        }
    }
}
