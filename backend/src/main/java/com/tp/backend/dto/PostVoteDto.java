package com.tp.backend.dto;

import com.tp.backend.model.VoteType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostVoteDto {
    private Long postId;
    private VoteType voteType;
}
