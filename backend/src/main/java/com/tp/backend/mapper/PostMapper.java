package com.tp.backend.mapper;

import com.tp.backend.dto.PostRequestDto;
import com.tp.backend.dto.PostResponseDto;
import com.tp.backend.model.*;
import com.tp.backend.repository.CommentRepository;
import com.tp.backend.repository.VoteRepository;
import com.tp.backend.service.AuthService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = "spring")
public abstract class PostMapper {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private AuthService authService;

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "description", source = "postRequestDto.description")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "id", source = "postRequestDto.id")
    public abstract Post mapToModel(PostRequestDto postRequestDto, Category category, User user);

    @Mapping(target = "category", source = "category.name")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "commentCount", expression = "java(getCommentsCount(post))")
    @Mapping(target = "likes", expression = "java(getLikesCount(post))")
    @Mapping(target = "dislikes", expression = "java(getDislikesCount(post))")
    @Mapping(target = "hearts", expression = "java(getHeartCount(post))")
    public abstract PostResponseDto mapToDto(Post post);

    Long getCommentsCount(Post post) {
        return Long.valueOf(post.getComments().size());
    }

    Long getLikesCount(Post post){
        return post.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Like).count();
    }

    Long getDislikesCount(Post post){
        return post.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Dislike).count();
    }

    Long getHeartCount(Post post){
        return post.getVotes().stream().filter(i -> i.getVoteType() == VoteType.Heart).count();
    }
}
