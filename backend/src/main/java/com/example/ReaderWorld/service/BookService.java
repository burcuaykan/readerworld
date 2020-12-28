package com.example.ReaderWorld.service;

import com.example.ReaderWorld.model.BookDTO;
import com.example.ReaderWorld.model.CommentDTO;
import com.example.ReaderWorld.model.LikeDTO;
import com.example.ReaderWorld.model.ReadListDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
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
        bookSaved.setComments(Collections.emptyList());

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

    public List<BookDTO> getBooks(int nBooks) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference collection = dbFirestore.collection(COL_NAME);
        Query query = collection.limit(10);
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot document = future.get();

        return document.toObjects(BookDTO.class);
    }


    public boolean saveComment(CommentDTO commentDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        BookDTO book = getBook(commentDTO.getISBN());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        commentDTO.setCommentAuthor(auth.getName());
        commentDTO.setCommentTime(new Date());
        if (book != null){
            book.getComments().add(commentDTO);
            dbFirestore.collection(COL_NAME).document(book.getISBN()).set(book);
            return true;
        }
        else{
            System.out.println("Comment: +" + commentDTO + " and book with isbn: " + commentDTO.getISBN() + "is not saved ") ;
            return false;
        }
    }

    public boolean addLike(LikeDTO likeDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        likeDTO.setEmail(auth.getName());
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection("LikedBooks").add(likeDTO);
        return true;
    }

    public boolean addReadList(ReadListDTO readListDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        readListDTO.setEmail(auth.getName());
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection("ReadList").add(readListDTO);
        return true;
    }

    public List<BookDTO> getLikes() throws ExecutionException, InterruptedException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference likedBooks = dbFirestore.collection("LikedBooks");
        Query query = likedBooks.whereEqualTo("email",auth.getName());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<BookDTO> userLikedBooks = new ArrayList<>();

        for(DocumentSnapshot document : querySnapshot.get().getDocuments()){
            CollectionReference books = dbFirestore.collection(COL_NAME);
            Query query1 = books.whereEqualTo("isbn", document.get("isbn"));
            userLikedBooks.addAll(query1.get().get().toObjects(BookDTO.class));
        }
        return userLikedBooks;
    }


    public List<BookDTO> getReadList() throws ExecutionException, InterruptedException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference readList = dbFirestore.collection("ReadList");
        Query query = readList.whereEqualTo("email",auth.getName());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<BookDTO> userReadList = new ArrayList<>();

        for(DocumentSnapshot document : querySnapshot.get().getDocuments()){
            CollectionReference books = dbFirestore.collection(COL_NAME);
            Query query1 = books.whereEqualTo("isbn", document.get("isbn"));
            userReadList.addAll(query1.get().get().toObjects(BookDTO.class));
        }
        return userReadList;
    }

}
