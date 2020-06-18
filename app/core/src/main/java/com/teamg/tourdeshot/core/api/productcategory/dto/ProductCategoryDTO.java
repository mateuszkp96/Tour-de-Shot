package com.teamg.tourdeshot.core.api.productcategory.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductCategoryDTO {

    private Long id;

    private String name;

    private Boolean hasChild;

    private Long parentId;
}
