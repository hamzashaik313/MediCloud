package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.service.MedicalRecordService;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/records")
public class MedicalRecordController {

    private final MedicalRecordService recordService;

    public MedicalRecordController(MedicalRecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping("/upload/{patientId}")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public MedicalRecord uploadFile(@PathVariable Long patientId,
                                    @RequestParam("file") MultipartFile file,
                                    Principal principal) throws Exception {

        // 1. Generate unique filename to avoid overwrites
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // 2. Upload to Firebase Storage
        Bucket bucket = StorageClient.getInstance().bucket();
        bucket.create("reports/" + fileName, file.getBytes(), file.getContentType());

        // 3. Create the direct Firebase URL
        String firebaseUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/reports%%2F%s?alt=media",
                bucket.getName(), fileName);

        // 4. Save metadata to MySQL
        return recordService.saveRecord(patientId, firebaseUrl, principal.getName());
    }
}