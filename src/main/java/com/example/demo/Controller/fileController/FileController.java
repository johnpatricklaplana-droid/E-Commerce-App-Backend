package com.example.demo.Controller.fileController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.exceptions.ResourceNotFoundException;


@Controller
public class FileController {
    // TODO: understand this one
    @GetMapping("/business-registration-file/{fileName}")
    public ResponseEntity<UrlResource> getMethodName(@PathVariable String fileName) throws IOException {
        
    Path filePath = Paths.get("uploads").resolve(fileName).normalize();
    UrlResource resource = new UrlResource(filePath.toUri());

    if (!resource.exists() || !resource.isReadable()) {
        throw new ResourceNotFoundException("File not found");
    }

    String contentType = Files.probeContentType(filePath);

    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(
                    contentType != null ? contentType : "application/octet-stream"))
            .body(resource);
    }
    
}
