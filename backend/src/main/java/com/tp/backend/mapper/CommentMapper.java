package com.tp.backend.mapper;

import com.tp.backend.dto.CommentRequestDto;
import com.tp.backend.dto.CommentResponseDto;
import com.tp.backend.model.Comment;
import com.tp.backend.model.Post;
import com.tp.backend.model.User;
import com.tp.backend.model.VoteType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = "spring")
public abstract class CommentMapper {

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "id", source = "commentRequestDto.id")
    public abstract Comment mapToModel(CommentRequestDto commentRequestDto, Post post, User user);

    @Mapping(target = "postId", source = "post.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "userActualName", source = "user.name")
    @Mapping(target = "likes", expression = "java(getLikesCount(comment))")
    @Mapping(target = "dislikes", expression = "java(getDislikesCount(comment))")
    @Mapping(target = "hearts", expression = "java(getHeartCount(comment))")
    public abstract CommentResponseDto mapToDto(Comment comment);

    Long getLikesCount(Comment comment){
        return comment.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Like).count();
    }

    Long getDislikesCount(Comment comment){
        return comment.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Dislike).count();
    }

    Long getHeartCount(Comment comment){
        return comment.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Heart).count();
    }
}
