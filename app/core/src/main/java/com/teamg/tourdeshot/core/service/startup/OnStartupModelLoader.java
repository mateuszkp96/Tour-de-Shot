package com.teamg.tourdeshot.core.service.startup;

import com.teamg.tourdeshot.core.api.local.domain.LocalPostDTO;
import com.teamg.tourdeshot.core.model.Address;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Details;
import com.teamg.tourdeshot.core.model.OpeningHours;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.service.LocalService;
import com.teamg.tourdeshot.core.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.util.Arrays;
import java.util.List;

@Component
@Profile("dev")
public class OnStartupModelLoader {

    private final LocalService localService;

    private final ProductCategoryService productCategoryService;

    @Autowired
    public OnStartupModelLoader(LocalService localService, ProductCategoryService productCategoryService) {
        this.localService = localService;
        this.productCategoryService = productCategoryService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {

        if(productCategoryService.findAll().getBody().isEmpty()) {
            fillProductCategoryDatabase();
        }

        if (localService.findAllLocals().isEmpty()) {
            fillLocalsDatabase();
        }
    }

    private void fillLocalsDatabase() {
        LocalPostDTO setka = createDefault("Setka", 1L,
                new Coordinates(new BigDecimal("52.236663"), new BigDecimal("21.014656")));
        localService.addLocal(setka);

        LocalPostDTO pijalnia = createDefault("Pijalnia Wodki i Piwa", 2L,
                new Coordinates(new BigDecimal("52.232380"), new BigDecimal("21.019964")));
        localService.addLocal(pijalnia);

        LocalPostDTO piwpaw = createDefault("PiwPaw", 1L,
                new Coordinates(new BigDecimal("52.228337"), new BigDecimal("21.013993")));
        localService.addLocal(piwpaw);
    }

    private void fillProductCategoryDatabase() {
        ProductCategory productCategory1 = new ProductCategory(1L, "Napoje alkoholowe", null);
        productCategoryService.addCategory(productCategory1);
        ProductCategory productCategory2 = new ProductCategory(2L, "wodka", productCategory1);
        productCategoryService.addCategory(productCategory2);
        ProductCategory productCategory3 = new ProductCategory(3L, "wino", productCategory1);
        productCategoryService.addCategory(productCategory3);
        ProductCategory productCategory4 = new ProductCategory(4L, "piwo", productCategory1);
        productCategoryService.addCategory(productCategory4);
        ProductCategory productCategory5 = new ProductCategory(5L, "Napoje bezalkoholowe", null);
        productCategoryService.addCategory(productCategory5);
        ProductCategory productCategory6 = new ProductCategory(6L, "kawa", productCategory5);
        productCategoryService.addCategory(productCategory6);
        ProductCategory productCategory7 = new ProductCategory(7L, "soki", productCategory5);
        productCategoryService.addCategory(productCategory7);
    }

    private LocalPostDTO createDefault(String name, Long ownerId, Coordinates coordinates) {
        LocalPostDTO localPostDTO = new LocalPostDTO();
        Address address = new Address("Warszawa", "Zlota", "33/31");
        List<OpeningHours> openingHours = createDefaultOpeningHours();
        Details details = new Details("local@local.com", "666000111", openingHours);
        localPostDTO.setName(name);
        localPostDTO.setOwnerId(ownerId);
        localPostDTO.setCoordinates(coordinates);
        localPostDTO.setAddress(address);
        localPostDTO.setDetails(details);

        return localPostDTO;
    }

    private List<OpeningHours> createDefaultOpeningHours() {
        OpeningHours mon = new OpeningHours(DayOfWeek.MONDAY, "9:00", "23:00");
        OpeningHours tue = new OpeningHours(DayOfWeek.TUESDAY, "9:00", "23:00");
        OpeningHours wed = new OpeningHours(DayOfWeek.WEDNESDAY, "9:00", "23:00");
        OpeningHours thu = new OpeningHours(DayOfWeek.THURSDAY, "9:00", "23:00");
        OpeningHours fri = new OpeningHours(DayOfWeek.FRIDAY, "9:00", "23:00");
        OpeningHours sat = new OpeningHours(DayOfWeek.SATURDAY, "9:00", "23:00");
        OpeningHours sun = new OpeningHours(DayOfWeek.SUNDAY, "9:00", "23:00");
        return Arrays.asList(mon, tue, wed, thu, fri, sat, sun);
    }

}
