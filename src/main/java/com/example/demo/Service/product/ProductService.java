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
import com.example.demo.enums.ImageType;
import com.example.demo.repository.ProductImageRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.security.MyUserDetails;

import jakarta.persistence.EntityManager;
import lombok.NonNull;

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

            ProductImage thumbnailsUrl = productRepo.getThumbnail(prod.getId(), ImageType.THUMBNAIL);

            ProductResponse prodResponse = new ProductResponse();
            prodResponse.setId(prod.getId());
            prodResponse.setProductName(prod.getProductName());
            prodResponse.setPrice(prod.getPrice());
            prodResponse.setProductDescription(prod.getProductDescription());
            
            if(thumbnailsUrl != null) {
                prodResponse.setThumbNailUrl(thumbnailsUrl.getImageUrl());
            }

            List<ProductImagesDTO> images = new ArrayList<>();
            for (ProductImage pi : imagesUrl) {
                ProductImagesDTO productImagesDto = new ProductImagesDTO();
                productImagesDto.setImagesUrl(pi.getImageUrl());
                images.add(productImagesDto);
            }

            prodResponse.setImages(images);

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

            productResponse.add(prodResponse);
        }

        return productResponse;
    }

    // i might not need this one 
    // public ProductResponse getProduct(int productId) {
        
    //     MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
    //         .getContext()
    //         .getAuthentication()
    //         .getPrincipal();

    //     int sellerId = userDetails.getUserId();

    //     Product product = productRepo.getProduct(productId, sellerId);

    //     ProductResponse productResponse = new ProductResponse();
    //     productResponse.setId(product.getId());
    //     productResponse.setProductName(product.getProductName());
    //     productResponse.setPrice(product.getPrice());
    //     productResponse.setProductDescription(product.getProductDescription());
        
    //     List<ProductCategoryDTO> categories = new ArrayList<>();
    //     for (Category category : product.getCategories()) {
    //         ProductCategoryDTO dto = new ProductCategoryDTO();
    //         dto.setCategoryName(category.getCategoryName());
    //         dto.setCategoryDescription(category.getDescription());
    //         categories.add(dto);
    //     }

    //     productResponse.setCategories(categories);

    //     List<ProductImagesDTO> images = new ArrayList<>();
    //     for (ProductImage productImage : product.getImages()) {
    //         ProductImagesDTO dto = new ProductImagesDTO();
    //         dto.setImagesUrl(productImage.getImageUrl());
    //         images.add(dto);
    //     }

    //     productResponse.setImages(images);

    //     return null;
    // }

}
