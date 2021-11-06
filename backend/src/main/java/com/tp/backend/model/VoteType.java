package com.tp.backend.model;

public enum VoteType {
    Like("like"),
    Dislike("dislike"),
    Heart("heart");

    public String type;

    VoteType(String type) {
        this.type = type;
    }

    // getter method
    public String getType()
    {
        return this.type;
    }
}
