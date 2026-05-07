package com.example.demo.Controller.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Orders;
import com.example.demo.enums.PaymentStatusOrder;
import com.example.demo.repository.OrdersRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;


@RestController
public class StripeWeebhookEndpoint {
    
    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Autowired
    OrdersRepository ordersRepo;

    @PostMapping("/stripe/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload, 
            @RequestHeader("Stripe-Signature") String sigHeader
    ) {
     
        Event event;

        try {
            event = Webhook.constructEvent(
                payload,
                sigHeader,
                webhookSecret
            );
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode object = (ObjectNode) mapper.readTree(payload);

        ObjectNode data = (ObjectNode) mapper.readTree(object.get("data").get("object").toString());

        String paymentIntentId = data.get("id").asString();

        switch (event.getType()) {

            case "payment_intent.succeeded" -> markOrderAsPaid(paymentIntentId);

            case "payment_intent.payment_failed" -> System.out.println("PAYMENT FAILED");

            default -> System.out.println("EVENT: " + event.getType());
        }

        return ResponseEntity.ok("received");
    }

    private void markOrderAsPaid (String paymentIntentId) {
       
        List<Orders> orders = ordersRepo.findByPaymentIntentId(paymentIntentId);

        for (Orders o: orders) {
            o.setPaymentStatusOrder(PaymentStatusOrder.paid);
        }

        ordersRepo.saveAll(orders);

    }

}
