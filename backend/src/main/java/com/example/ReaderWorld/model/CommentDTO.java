package com.example.ReaderWorld.model;

import java.util.Date;

public class CommentDTO {
    private String ISBN;
    private Date commentTime;
    private int likeCount;
    private String commentAuthor;
    private String commentBody;

    public String getISBN() {
        return ISBN;
    }

    public String getCommentAuthor() {
        return commentAuthor;
    }

    public void setCommentAuthor(String commentAuthor) {
        this.commentAuthor = commentAuthor;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public Date getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }
}
