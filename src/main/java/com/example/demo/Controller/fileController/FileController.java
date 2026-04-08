package com.example.demo.Controller.fileController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.exceptions.ResourceNotFoundException;


@Controller
public class FileController {
    
    @GetMapping("/api/admin/business-registration-file/{fileName}")
    public ResponseEntity<UrlResource> getMethodName(@PathVariable String fileName) throws IOException {
        
        Path filePath = Paths.get("./uploads", fileName);
        UrlResource resource = new UrlResource(filePath.toUri());
    
        if(!resource.exists() && !resource.isReadable()) {
            throw new ResourceNotFoundException("File not found");
        }
    
        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Content-Type", "image/png")
            .body(resource);

    }
    
}
