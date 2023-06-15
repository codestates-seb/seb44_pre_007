package com.seb_pre_007.Server.user.mapper;


import com.seb_pre_007.Server.user.dto.UserPostDto;
import com.seb_pre_007.Server.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
     User userPostDtoToUser(UserPostDto userPostDto) ;

}
