package com.example.ReaderWorld.service;

import com.example.ReaderWorld.model.*;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
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
        bookSaved.setImageLink(bookDTO.getImageLink());
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

    public List<BookDTO> getBookByName(String bookname) throws InterruptedException, ExecutionException {


        Firestore dbFirestore = FirestoreClient.getFirestore();

        int strlength = bookname.length();
        String strFrontCode = bookname.substring(0, strlength-1);
        String strEndCode = bookname.substring(strlength-1, bookname.length());

        String startcode = bookname;
        String endcode= strFrontCode + (char)(strEndCode.charAt(0) + 1);

        System.out.println("start code" + startcode);
        System.out.println("end code" + endcode);
        System.out.println("bookname" + bookname);
        Query query = dbFirestore.collection(COL_NAME).whereGreaterThanOrEqualTo("bookname", startcode)
                .whereLessThan("bookname", endcode);

        QuerySnapshot queryDocumentSnapshots = query.get().get();
        return queryDocumentSnapshots.toObjects(BookDTO.class);
    }



    public List<BookDTO> getBooks(int nBooks) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference collection = dbFirestore.collection(COL_NAME);
        Query query = collection.limit(10);
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot document = future.get();

        return document.toObjects(BookDTO.class);
    }


    public List<BookDTO> getAllBooks() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference collection = dbFirestore.collection(COL_NAME);
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot document = future.get();

        return document.toObjects(BookDTO.class);
    }

    public List<CommentDTO> getCommentsISBN(String ISBN) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        Query query = dbFirestore.collection("CommentBooks").whereEqualTo("isbn", ISBN);

        QuerySnapshot queryDocumentSnapshots = query.get().get();
        return queryDocumentSnapshots.toObjects(CommentDTO.class);
    }

    public List<CommentDTO> getCommentsUser() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Query query = dbFirestore.collection("CommentBooks").whereEqualTo("commentAuthor", auth.getName());

        QuerySnapshot queryDocumentSnapshots = query.get().get();
        return queryDocumentSnapshots.toObjects(CommentDTO.class);
    }

    public boolean saveComment(CommentDTO commentDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        commentDTO.setCommentAuthor(auth.getName());
        commentDTO.setCommentTime(new Date());

        dbFirestore.collection("CommentBooks").add(commentDTO);
        return true;
    }

    public List<VoteDTO> getVotesISBN(String ISBN) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        Query query = dbFirestore.collection("VoteBooks").whereEqualTo("isbn", ISBN);

        QuerySnapshot queryDocumentSnapshots = query.get().get();
        return queryDocumentSnapshots.toObjects(VoteDTO.class);
    }

    public List<VoteDTO> getVotesUser() throws  ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Query query = dbFirestore.collection("VoteBooks").whereEqualTo("voter", auth.getName());

        QuerySnapshot queryDocumentSnapshots = query.get().get();
        return queryDocumentSnapshots.toObjects(VoteDTO.class);
    }

    public boolean saveVote(VoteDTO voteDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        voteDTO.setVoter(auth.getName());

        Query query = dbFirestore.collection("VoteBooks").whereEqualTo("voter", auth.getName()).whereEqualTo("isbn", voteDTO.getISBN());
        QuerySnapshot queryDocumentSnapshots = query.get().get();

        if (queryDocumentSnapshots.isEmpty()) {
            dbFirestore.collection("VoteBooks").add(voteDTO);
            return true;
        }
        //else{}
        return false;
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


    public List<ReadListDTO> getReadList() throws ExecutionException, InterruptedException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference readList = dbFirestore.collection("ReadList");
        Query query = readList.whereEqualTo("email",auth.getName());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<ReadListDTO> userReadList = new ArrayList<>();

        for(DocumentSnapshot document : querySnapshot.get().getDocuments()){

            CollectionReference books = dbFirestore.collection(COL_NAME);
            Query query1 = books.whereEqualTo("isbn", document.get("isbn"));

            List<BookDTO> bookDTOS = query1.get().get().toObjects(BookDTO.class);


            for(BookDTO book: bookDTOS){
                ReadListDTO rl = new ReadListDTO();
                rl.setISBN(book.getISBN());
                rl.setEmail(auth.getName());
                if(document.get("deadline") != null){
                    rl.setDeadline(document.getDate("deadline"));
                }
                if(rl.getDeadline() == null) {
                    rl.setDeadlineOver(false);
                }
                else if(rl.getDeadline().compareTo(new Date()) < 0){
                    rl.setDeadlineOver(true);
                }
                else{
                    rl.setDeadlineOver(false);
                }
                rl.setBookInformation(book);
                userReadList.add(rl);
            }
        }
        return userReadList;
    }


    public List<BookDTO> getBookByFilters(String authorName, Integer pageNumberMin, Integer pageNumberMax, Date minPublicationDate, Date maxPublicationDate) throws InterruptedException, ExecutionException {


        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<BookDTO> res = new ArrayList<>();
        List<BookDTO> tmpAuthor = new ArrayList<>();
        List<BookDTO> tmpPageNumber = new ArrayList<>();
        List<BookDTO> tmpPublicationDate = new ArrayList<>();

        boolean authorFlag = false;
        boolean numberFlag = false;
        boolean publicationFlag = false;
        if (authorName != null) {
            authorFlag = true;
            int strlength = authorName.length();
            String strFrontCode = authorName.substring(0, strlength - 1);
            String strEndCode = authorName.substring(strlength - 1, authorName.length());

            String startcode = authorName;
            String endcode = strFrontCode + (char) (strEndCode.charAt(0) + 1);

            Query query = dbFirestore.collection(COL_NAME).whereGreaterThanOrEqualTo("author", startcode)
                    .whereLessThan("author", endcode);
            QuerySnapshot queryDocumentSnapshots = query.get().get();
            tmpAuthor.addAll(queryDocumentSnapshots.toObjects(BookDTO.class));
        }

        if (pageNumberMin!=null && pageNumberMax != null){
            numberFlag = true;
            Query query = dbFirestore.collection(COL_NAME).whereGreaterThanOrEqualTo("pageNumber", pageNumberMin)
                    .whereLessThanOrEqualTo("pageNumber", pageNumberMax);
            tmpPageNumber.addAll(query.get().get().toObjects(BookDTO.class));
        }
        if(minPublicationDate != null && maxPublicationDate != null){
            publicationFlag = true;
            Query query = dbFirestore.collection(COL_NAME).whereGreaterThan("publicationDate", minPublicationDate)
                    .whereLessThan("publicationDate", maxPublicationDate);
            tmpPublicationDate.addAll(query.get().get().toObjects(BookDTO.class));
        }

        if(!authorFlag && !publicationFlag){
            res.addAll(tmpPageNumber);
        }
        else if(!numberFlag && !publicationFlag){
            res.addAll(tmpAuthor);
        }
        else if(!authorFlag && ! numberFlag){
            res.addAll(tmpPublicationDate);
        }
        else if(!publicationFlag){
            for(BookDTO book: tmpAuthor){
                if(Common.isIn(book.getISBN(), tmpPageNumber)){
                    res.add(book);
                }
            }
        }
        else if(!authorFlag){
            for(BookDTO book: tmpPageNumber){
                if(Common.isIn(book.getISBN(), tmpPublicationDate)){
                    res.add(book);
                }
            }
        }
        else if(!numberFlag){
            for(BookDTO book: tmpAuthor){
                if(Common.isIn(book.getISBN(), tmpPublicationDate)){
                    res.add(book);
                }
            }
        }
        else{
            for(BookDTO book: tmpAuthor){
                if(Common.isIn(book.getISBN(), tmpPageNumber) && Common.isIn(book.getISBN(), tmpPublicationDate)){
                    res.add(book);
                }
            }
        }

        return res;
    }



    public boolean updateBook(BookDTO bookDTO) throws ExecutionException, InterruptedException {
        //ISBN should be given
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            BookDTO book = getBook(bookDTO.getISBN());
            if (bookDTO.getBookname() != null) {
                book.setBookname(bookDTO.getBookname());
            }
            if (bookDTO.getAuthor() != null) {
                book.setAuthor(bookDTO.getAuthor());
            }
            if (bookDTO.getPageNumber() != 0) {
                book.setPageNumber(bookDTO.getPageNumber());
            }
            if (bookDTO.getPublicationDate() != null) {
                book.setPublicationDate(bookDTO.getPublicationDate());
            }
            if (bookDTO.getPublisher() != null) {
                book.setPublisher(bookDTO.getPublisher());
            }
            if(bookDTO.getImageLink() != null){book.setImageLink(bookDTO.getImageLink());}
            dbFirestore.collection(COL_NAME).document(book.getISBN()).set(book);
            return true;
        }
        catch (Exception e) {
            throw new IllegalArgumentException("Something is wrong in Book information");
        }
    }

    public boolean deleteBook(String ISBN) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            dbFirestore.collection(COL_NAME).document(ISBN).delete();
            return true;
        }
        catch (Exception e){
            throw new IllegalArgumentException("Something is wrong in Book information");
        }
    }




}
