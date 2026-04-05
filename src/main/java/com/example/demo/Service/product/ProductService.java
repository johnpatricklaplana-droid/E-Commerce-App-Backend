package com.example.demo.Service.product;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.repository.ProductImageRepository;

import jakarta.persistence.EntityManager;

@Service
public class ProductService {

    @Autowired
    EntityManager entityManager;
    
    @Autowired
    ProductImageRepository productImageRepository;

    public void saveProductImages (Integer productId, List<MultipartFile> files) throws IOException {

            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();

                ProductImage image = new ProductImage();
                image.setImageUrl(fileName);
                image.setProduct(entityManager.getReference(Product.class, productId));

                productImageRepository.save(image);

                Path path = Paths.get("product_images/", fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());
            }

    }

}
