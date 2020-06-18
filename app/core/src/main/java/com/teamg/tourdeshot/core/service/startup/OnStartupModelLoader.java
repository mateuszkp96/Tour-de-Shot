package com.teamg.tourdeshot.core.service.startup;

import com.teamg.tourdeshot.core.model.Address;
import com.teamg.tourdeshot.core.model.Contact;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.DaySchedule;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.MenuItem;
import com.teamg.tourdeshot.core.model.OpeningHours;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.ProductCategoryRepository;
import com.teamg.tourdeshot.core.service.LocalService;
import com.teamg.tourdeshot.core.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
@Profile("dev")
public class OnStartupModelLoader {

    private final LocalService localService;

    private final ProductCategoryService productCategoryService;

    private final ProductCategoryRepository productCategoryRepository;

    private final MongoOperations mongoOperations;

    @Autowired
    public OnStartupModelLoader(LocalService localService, ProductCategoryService productCategoryService, ProductCategoryRepository productCategoryRepository, MongoOperations mongoOperations) {
        this.localService = localService;
        this.productCategoryService = productCategoryService;
        this.productCategoryRepository = productCategoryRepository;
        this.mongoOperations = mongoOperations;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() throws IOException {

        if(productCategoryService.findAll().getBody().isEmpty()) {
            fillProductCategoryDatabase();
        }

        if (localService.findAllLocals().isEmpty()) {
            fillLocalsDatabase();
        }
    }

    private void fillLocalsDatabase() {
        Local setka = createDefault("Setka", 1L,
                new Coordinates(new BigDecimal("52.236663"), new BigDecimal("21.014656")));
        localService.addLocal(setka);

        Local pijalnia = createDefault("Pijalnia Wodki i Piwa", 2L,
                new Coordinates(new BigDecimal("52.232380"), new BigDecimal("21.019964")));
        localService.addLocal(pijalnia);

        Local piwpaw = createDefault("PiwPaw", 1L,
                new Coordinates(new BigDecimal("52.228337"), new BigDecimal("21.013993")));
        localService.addLocal(piwpaw);

        Local freta33 = createDefault("Freta33", 2L,
                new Coordinates(new BigDecimal("52.252686"), new BigDecimal("21.007523")));
        localService.addLocal(freta33);

        Local warsawpub = createDefault("WarSaw Pub", 1L,
                new Coordinates(new BigDecimal("52.249641"), new BigDecimal("21.010732")));
        warsawpub.setMenu(createDefaultMenu2());
        localService.addLocal(warsawpub);
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

    private Local createDefault(String name, Long ownerId, Coordinates coordinates) {
        Local local = new Local();
        Address address = new Address("Warszawa", "Zlota 33/31", "00-711");
        OpeningHours openingHours = createDefaultOpeningHours();
        Contact contact = new Contact("local@local.com", "666000111");
        local.setName(name);
        local.setOwnerId(ownerId);
        local.setCoordinates(new Double[]{coordinates.getLat().doubleValue(), coordinates.getLon().doubleValue()});
        local.setAddress(address);
        local.setContact(contact);
        local.setOpeningHours(openingHours);
        local.setPriceCategory(1);
        local.setImage("image");
        local.setWebsite("www.bar.com");
        local.setMenu(createDefaultMenu());
        local.setLocalCategories(Arrays.asList("bar", "pub"));
        return local;
    }

    private OpeningHours createDefaultOpeningHours() {
        OpeningHours openingHours =  new OpeningHours();
        DaySchedule mon = new DaySchedule(0, DayOfWeek.MONDAY, LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule tue = new DaySchedule(1, DayOfWeek.TUESDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule wed = new DaySchedule(2, DayOfWeek.WEDNESDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule thu = new DaySchedule(3, DayOfWeek.THURSDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule fri = new DaySchedule(4, DayOfWeek.FRIDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule sat = new DaySchedule(5, DayOfWeek.SATURDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        DaySchedule sun = new DaySchedule(6, DayOfWeek.SUNDAY,  LocalTime.of(9,0), LocalTime.of(23, 0));
        List<DaySchedule> schedule = Arrays.asList(mon, thu, wed, tue, fri, sat, sun);
        openingHours.setSchedule(schedule);
        return openingHours;
    }

    private Menu createDefaultMenu() {
        List <ProductCategory> productCategories = productCategoryRepository.findAll();
        Menu menu =  new Menu();
        MenuItem menuItem1 = new MenuItem();
        MenuItem menuItem2 = new MenuItem();
        Product product1 = createDefaultProduct(1L,
                "Bols",
                findByName(productCategories, "wodka"),
                "opis",
                BigDecimal.valueOf(15.00),
                Arrays.asList("wódka", "lód"));
        Product product2 = createDefaultProduct(2L,
                "Soplica",
                findByName(productCategories, "wodka"),
                "opis",
                BigDecimal.valueOf(15.00),
                Arrays.asList("wódka", "lód"));
        Product product3 = createDefaultProduct(3L,
                "Monte Santi",
                findByName(productCategories, "wino"),
                "opis",
                BigDecimal.valueOf(30.00),
                Arrays.asList("wino", "syrop brzoskwiniowy"));
        Product product4 = createDefaultProduct(4L,
                "Carlo Rossi",
                findByName(productCategories, "wino"),
                "opis",
                BigDecimal.valueOf(30.00),
                Arrays.asList("wino", "syrop brzoskwiniowy"));

        menuItem1.setCategoryHeader("Wódki");
        menuItem1.setOrderNumber(1);
        menuItem1.setProducts(Arrays.asList(product1, product2));

        menuItem2.setCategoryHeader("Wina");
        menuItem2.setOrderNumber(2);
        menuItem2.setProducts(Arrays.asList(product3, product4));

        menu.setMenuHeader("Menu");
        menu.setItems(Arrays.asList(menuItem1, menuItem2));

        return menu;
    }

    private Menu createDefaultMenu2() {
        List <ProductCategory> productCategories = productCategoryRepository.findAll();
        Menu menu =  new Menu();
        MenuItem menuItem1 = new MenuItem();
        MenuItem menuItem2 = new MenuItem();
        Product product1 = createDefaultProduct(1L,
                "Perła",
                findByName(productCategories, "piwo"),
                "opis",
                BigDecimal.valueOf(10.00),
                Arrays.asList("piwo", "sok"));
        Product product2 = createDefaultProduct(2L,
                "Harnaś",
                findByName(productCategories, "piwo"),
                "opis",
                BigDecimal.valueOf(12.00),
                Arrays.asList("piwo"));
        Product product3 = createDefaultProduct(3L,
                "Monte Santi",
                findByName(productCategories, "wino"),
                "opis",
                BigDecimal.valueOf(50.00),
                Arrays.asList("wino", "syrop brzoskwiniowy"));
        Product product4 = createDefaultProduct(4L,
                "Carlo Rossi",
                findByName(productCategories, "wino"),
                "opis",
                BigDecimal.valueOf(50.00),
                Arrays.asList("wino", "syrop brzoskwiniowy"));
        Product product5 = createDefaultProduct(5L,
                "Trybunalskie",
                findByName(productCategories, "piwo"),
                "opis",
                BigDecimal.valueOf(10.00),
                Arrays.asList("piwo", "miód"));

        menuItem1.setCategoryHeader("Piwa");
        menuItem1.setOrderNumber(1);
        menuItem1.setProducts(Arrays.asList(product1, product2, product5));

        menuItem2.setCategoryHeader("Wina");
        menuItem2.setOrderNumber(2);
        menuItem2.setProducts(Arrays.asList(product3, product4));

        menu.setMenuHeader("Menu");
        menu.setItems(Arrays.asList(menuItem1, menuItem2));

        return menu;
    }

    private Product createDefaultProduct(Long id, String name, ProductCategory productCategory, String desc, BigDecimal price, List<String> ingredients) {
        Product product = new Product();
        product.setProductId(id);
        product.setName(name);
        product.setProductCategory(productCategory);
        product.setIngredients(ingredients);
        product.setDescription(desc);
        product.setPrice(price);
        return product;
    }

    private ProductCategory findByName(List<ProductCategory> productCategories, String name) {
        return productCategories.stream()
                .filter(productCategory -> productCategory.getName().equals(name))
                .findAny().orElse(null);
    }
}
