package com.example.ReaderWorld.model;

import java.util.Date;

public class ReadListDTO {
    private String ISBN;
    private String email;
    private Date deadline;
    private boolean isDeadlineOver;
    BookDTO bookInformation;

    public BookDTO getBookInformation() {
        return bookInformation;
    }

    public void setBookInformation(BookDTO bookInformation) {
        this.bookInformation = bookInformation;
    }

    public boolean isDeadlineOver() {
        return isDeadlineOver;
    }

    public void setDeadlineOver(boolean deadlineOver) {
        isDeadlineOver = deadlineOver;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }
}
