package com.medicloud.medicalrecords.service;


import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

    public String upload(MultipartFile file) throws Exception {
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create(
                "reports/" + file.getOriginalFilename(),
                file.getBytes(),
                file.getContentType()
        );
        return blob.getMediaLink();
    }
}

