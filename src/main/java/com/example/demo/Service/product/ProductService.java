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
import com.example.demo.DTO.productDTO.ProductRatingDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.entity.ProductRating;
import com.example.demo.entity.ProductVariations;
import com.example.demo.enums.ImageType;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.repository.ProductImageRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductVariationRepository;
import com.example.demo.repository.UserRepository;
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

    @Autowired
    ProductVariationRepository variationRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ProductMapper  productMapper;

    public void saveProductImages (Integer variationId, List<MultipartFile> files) throws IOException {

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        int sellerId = userDetails.getUserId();

        ProductVariations variations = variationRepo.findById(variationId).orElse(null);

        Product product = variations.getProduct();

        if(product.getSeller().getId() != sellerId) {
            throw new ActionNotAllowedException("oops that's bad");
        }
        
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();

            ProductImage image = new ProductImage();
            image.setImageUrl(fileName);
            image.setProductVariations(entityManager.getReference(ProductVariations.class, variationId));
            image.setImageType(ImageType.PHOTOS);
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
    
        return productMapper.toProductResponse(product);
    }

    public List<ProductResponse> getProduct(int productId) {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        int sellerId = userDetails.getUserId();

        Product product = productRepo.getProduct(productId, sellerId);

        List<Product> products = new ArrayList<>();
        products.add(product);

        List<ProductResponse> productResponse = productMapper.toProductResponse(products);

        return productResponse;
    }

}
