package com.tp.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    private VoteType voteType;

    @Null
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @Null
    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Vote(VoteType voteType, User user) {
        this.voteType = voteType;
        this.user = user;
    }
}
