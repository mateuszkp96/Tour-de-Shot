package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ContactDTO;
import com.teamg.tourdeshot.core.model.Contact;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class ContactMapperImpl implements ContactMapper {

    @Override
    public ContactDTO toContactDTO(Contact contact) {
        if(Objects.isNull(contact))
            return null;
        return ContactDTO.builder()
                .email(contact.getEmail())
                .phoneNumber(contact.getPhoneNumber())
                .build();
    }
}
