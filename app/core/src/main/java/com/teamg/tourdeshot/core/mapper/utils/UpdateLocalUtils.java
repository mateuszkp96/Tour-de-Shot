package com.teamg.tourdeshot.core.mapper.utils;

import com.teamg.tourdeshot.core.api.local.domain.LocalUpdateDTO;
import com.teamg.tourdeshot.core.mapper.AddressMapper;
import com.teamg.tourdeshot.core.mapper.ContactMapper;
import com.teamg.tourdeshot.core.mapper.CoordinatesMapper;
import com.teamg.tourdeshot.core.mapper.OpeningHoursMapper;
import com.teamg.tourdeshot.core.model.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UpdateLocalUtils {

    private final OpeningHoursMapper openingHoursMapper;
    private final ContactMapper contactMapper;
    private final AddressMapper addressMapper;
    private final CoordinatesMapper coordinatesMapper;

    @Autowired
    public UpdateLocalUtils(OpeningHoursMapper openingHoursMapper, ContactMapper contactMapper, AddressMapper addressMapper, CoordinatesMapper coordinatesMapper) {
        this.openingHoursMapper = openingHoursMapper;
        this.contactMapper = contactMapper;
        this.addressMapper = addressMapper;
        this.coordinatesMapper = coordinatesMapper;
    }

    public Local fillUpdatedLocal(LocalUpdateDTO newLocal, Local localToUpdate) {
        localToUpdate.setName(newLocal.getName());
        localToUpdate.setWebsite(newLocal.getWebsite());
        localToUpdate.setLocalCategories(newLocal.getLocalCategories());
        localToUpdate.setAddress(addressMapper.toAddress(newLocal.getAddress()));
        localToUpdate.setContact(contactMapper.toContact(newLocal.getContact()));
        localToUpdate.setCoordinates(coordinatesMapper.toCoordinates(newLocal.getCoordinates()));
        localToUpdate.setOpeningHours(openingHoursMapper.toOpeningHours(newLocal.getOpeningHours()));
        return localToUpdate;

    }
}
