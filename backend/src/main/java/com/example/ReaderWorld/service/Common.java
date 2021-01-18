package com.example.ReaderWorld.service;

import com.example.ReaderWorld.model.BookDTO;

import java.util.List;

public class Common {
    public static boolean isIn(String ISBN, List<BookDTO> bookDTOList){
        for (BookDTO book : bookDTOList) {
            if(book.getISBN().equals(ISBN)){
                return true;
            }
        }
        return false;
    }
}
