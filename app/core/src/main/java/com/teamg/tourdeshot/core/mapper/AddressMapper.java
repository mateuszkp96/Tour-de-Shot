package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.AddressDTO;
import com.teamg.tourdeshot.core.model.Address;

public interface AddressMapper {

    AddressDTO toAddressDTO(Address address);

    Address toAddress(AddressDTO address);
}
