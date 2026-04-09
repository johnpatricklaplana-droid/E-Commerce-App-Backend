package com.example.demo.Service.product;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.productDTO.ProductCategoryDTO;
import com.example.demo.DTO.productDTO.ProductImagesDTO;
import com.example.demo.DTO.productDTO.ProductRatingDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.entity.ProductRating;
import com.example.demo.entity.ProductVariations;
import com.example.demo.repository.ProductImageRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.security.MyUserDetails;

import jakarta.persistence.EntityManager;

@Service
public class ProductService {

    @Autowired
    EntityManager entityManager;
    
    @Autowired
    ProductImageRepository productImageRepository;

    @Autowired
    ProductRepository productRepo;

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

    public List<ProductResponse> getProducts(Pageable pageable) {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        int sellerId = userDetails.getUserId();

        List<Product> product = productRepo.findBySellerId(sellerId);

        List<ProductResponse> productResponse = new ArrayList<>();

        for (Product prod: product) {
            List<ProductVariations> productVariations = prod.getVariations();

            List<Category> categories = prod.getCategories();

            List<ProductRating> rating = prod.getRatings();

            List<ProductImage> imagesUrl = prod.getImages();

            ProductResponse prodResponse = new ProductResponse();
            prodResponse.setProductName(prod.getProductName());
            prodResponse.setPrice(prod.getPrice());
            prodResponse.setProductDescription(prod.getProductDescription());

            List<ProductCategoryDTO> categoriesDto = new ArrayList<>();
            for (Category c : categories) {
                ProductCategoryDTO productCategory = new ProductCategoryDTO();
                productCategory.setCategoryName(c.getCategoryName());
                productCategory.setCategoryDescription(c.getDescription());
                categoriesDto.add(productCategory);
            }

            prodResponse.setCategories(categoriesDto);

            List<ProductVariationsDTO> productVariationsDTO = new ArrayList<>();
            for (ProductVariations pv : productVariations) {
                ProductVariationsDTO variations = new ProductVariationsDTO();
                variations.setVariationName(pv.getVariationName());
                variations.setColor(pv.getColor());
                variations.setSku(pv.getSku());
                productVariationsDTO.add(variations);
            }

            prodResponse.setVariations(productVariationsDTO);

            List<ProductRatingDTO> ratings = new ArrayList<>();
            for (ProductRating pr : rating) {
                ProductRatingDTO productRatingDTO = new ProductRatingDTO();
                productRatingDTO.setRating(pr.getRating());
                productRatingDTO.setReview(pr.getReview());
                productRatingDTO.setCreatedAt(pr.getCreatedAt());
                productRatingDTO.setUpdatedAt(pr.getUpdatedAt());
            }

            prodResponse.setRatings(ratings);

            List<ProductImagesDTO> images = new ArrayList<>();
            for (ProductImage pi : imagesUrl) {
                ProductImagesDTO productImagesDto = new ProductImagesDTO();
                productImagesDto.setImagesUrl(pi.getImageUrl());
                images.add(productImagesDto);
            }

            prodResponse.setImages(images);

            productResponse.add(prodResponse);
        }

        return productResponse;
    }

}
