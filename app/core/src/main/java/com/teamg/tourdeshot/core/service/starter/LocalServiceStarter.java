package com.teamg.tourdeshot.core.service.starter;

import com.teamg.tourdeshot.core.api.local.LocalPostDTO;
import com.teamg.tourdeshot.core.model.Address;
import com.teamg.tourdeshot.core.model.Category;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Details;
import com.teamg.tourdeshot.core.model.Ingredient;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.OpeningHours;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.model.Weekday;
import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@Profile("dev")
public class LocalServiceStarter {

    private final LocalService localService;

    @Autowired
    public LocalServiceStarter(LocalService localService) {
        this.localService = localService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {

        if (localService.findAllLocals().size() == 0) {
            fillDatabase();
        }
    }

    private void fillDatabase() {
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

    private LocalPostDTO createDefault(String name, Long ownerId, Coordinates coordinates) {
        LocalPostDTO localPostDTO = new LocalPostDTO();
        Address address = new Address("Warszawa", "Zlota", "33/31");
        List<OpeningHours> openingHours = createDefaultOpeningHours();
        Details details = new Details("local@local.com", "666000111", openingHours);
        List<Product> products = createDefaultMenu();
        Menu menu = new Menu(products);
        localPostDTO.setName(name);
        localPostDTO.setOwnerId(ownerId);
        localPostDTO.setCoordinates(coordinates);
        localPostDTO.setAddress(address);
        localPostDTO.setDetails(details);
        localPostDTO.setMenu(menu);

        return localPostDTO;
    }

    private List<OpeningHours> createDefaultOpeningHours() {
        OpeningHours mon = new OpeningHours(Weekday.MONDAY, "9:00", "23:00");
        OpeningHours tue = new OpeningHours(Weekday.TUESDAY, "9:00", "23:00");
        OpeningHours wed = new OpeningHours(Weekday.WEDNESDAY, "9:00", "23:00");
        OpeningHours thu = new OpeningHours(Weekday.THURSDAY, "9:00", "23:00");
        OpeningHours fri = new OpeningHours(Weekday.FRIDAY, "9:00", "23:00");
        OpeningHours sat = new OpeningHours(Weekday.SATURDAY, "9:00", "23:00");
        OpeningHours sun = new OpeningHours(Weekday.SUNDAY, "9:00", "23:00");
        return Arrays.asList(mon, tue, wed, thu, fri, sat, sun);
    }

    private List<Product> createDefaultMenu() {
        Category category1 = new Category(1L, "Napoje alkoholowe");
        Category category2 = new Category(2L, "Napoje bezalkoholowe");
        Product product1 = new Product(category1, "wodka", BigDecimal.valueOf(40.00),
                Arrays.asList(new Ingredient("wodka")));
        Product product2 = new Product(category1, "wino", BigDecimal.valueOf(30.00),
                Arrays.asList(new Ingredient("wino")));
        Product product3 = new Product(category1, "piwo z sokiem malinowym", BigDecimal.valueOf(15.00),
                Arrays.asList(new Ingredient("piwo"), new Ingredient("sok malinowy")));
        Product product4 = new Product(category2, "woda", BigDecimal.valueOf(4.00),
                Arrays.asList(new Ingredient("woda")));
        Product product5 = new Product(category2, "sok porzeczkowy", BigDecimal.valueOf(4.00),
                Arrays.asList(new Ingredient("sok porzeczkowy")));
        Product product6 = new Product(category2, "kawa z mlekiem", BigDecimal.valueOf(10.00),
                Arrays.asList(new Ingredient("kawa"), new Ingredient("mleko")));
        return Arrays.asList(product1, product2, product3, product4, product5, product6);
    }

}
