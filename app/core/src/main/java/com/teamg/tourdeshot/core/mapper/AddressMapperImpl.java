package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.AddressDTO;
import com.teamg.tourdeshot.core.model.Address;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public AddressDTO toAddressDTO(Address address) {
        if(Objects.isNull(address))
            return null;
        return AddressDTO.builder()
                .city(address.getCity())
                .street(address.getStreet())
                .postCode(address.getPostCode())
                .build();
    }
}
