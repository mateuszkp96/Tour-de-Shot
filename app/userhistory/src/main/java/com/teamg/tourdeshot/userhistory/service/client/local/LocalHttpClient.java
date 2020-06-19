package com.teamg.tourdeshot.userhistory.service.client.local;

import com.teamg.tourdeshot.userhistory.service.client.local.dto.Local;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LocalHttpClient {
    private static final Logger logger = LoggerFactory.getLogger(LocalHttpClient.class);

    private final String localBaseUrl;
    private final WebClient webClient;

    @Autowired
    public LocalHttpClient(@Value("${app.url.local}") String localBaseUrl) {
        this.localBaseUrl = localBaseUrl;
        this.webClient = WebClient.builder()
                .baseUrl(this.localBaseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .filter(logRequest())
                .filter(logResponse())
                .build();
    }

    public ResponseEntity<Local> getLocal(Long localId, List<Long> products) {
        String productsParam =
                products.stream()
                        .map(String::valueOf)
                        .collect(Collectors.joining(","));
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/localproducts/" + localId)
                        .queryParam("ids", productsParam)
                        .build())
                .retrieve()
                .toEntity(Local.class)
                .block();
    }

    private ExchangeFilterFunction logRequest() {
        return (clientRequest, next) -> {
            logger.info("Request: {} {}, Headers: {}", clientRequest.method(), clientRequest.url(), clientRequest.headers());
            clientRequest.headers()
                    .forEach((name, values) -> values.forEach(value -> logger.info("{}={}", name, value)));
            return next.exchange(clientRequest);
        };
    }

    private ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            logger.info("StatusCode: {}, ResponseHeaders: {}",
                    clientResponse.statusCode().value(),
                    clientResponse.headers().asHttpHeaders()
                    );
            return Mono.just(clientResponse);
        });
    }
}
