package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ContactDTO;
import com.teamg.tourdeshot.core.model.Contact;

public interface ContactMapper {

    ContactDTO toContactDTO(Contact contact);
}
