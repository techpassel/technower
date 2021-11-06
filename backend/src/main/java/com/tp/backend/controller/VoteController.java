package com.tp.backend.controller;

import com.tp.backend.dto.CommentVoteDto;
import com.tp.backend.dto.PostVoteDto;
import com.tp.backend.service.VoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vote")
@AllArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @PostMapping("/on-post")
    public ResponseEntity<Void> votePost(@RequestBody PostVoteDto postVoteDto){
        voteService.votePost(postVoteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/on-comment")
    public ResponseEntity<Void> voteComment(@RequestBody CommentVoteDto commentVoteDto){
        voteService.voteComment(commentVoteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
