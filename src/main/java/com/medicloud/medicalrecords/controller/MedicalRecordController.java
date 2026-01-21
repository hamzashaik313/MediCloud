package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.medicloud.medicalrecords.service.MedicalRecordService;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/records")
public class MedicalRecordController {

    private final MedicalRecordService recordService;
    private final MedicalRecordRepository recordRepository;

    // ✅ CONSTRUCTOR INJECTION (IMPORTANT)
    public MedicalRecordController(
            MedicalRecordService recordService,
            MedicalRecordRepository recordRepository
    ) {
        this.recordService = recordService;
        this.recordRepository = recordRepository;
    }

    // ================= UPLOAD RECORD =================
    @PostMapping(
            value = "/upload/{patientId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasAnyRole('ROLE_DOCTOR','ROLE_ADMIN')")
    public MedicalRecord uploadFile(
            @PathVariable Long patientId,
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) throws Exception {

        String fileName =
                UUID.randomUUID() + "-" + file.getOriginalFilename();

        Bucket bucket = StorageClient.getInstance().bucket();
        bucket.create(
                "reports/" + fileName,
                file.getBytes(),
                file.getContentType()
        );

        String firebaseUrl = String.format(
                "https://firebasestorage.googleapis.com/v0/b/%s/o/reports%%2F%s?alt=media",
                bucket.getName(),
                fileName
        );

        return recordService.saveRecord(
                patientId,
                firebaseUrl,
                principal.getName()
        );
    }

    // ================= GET RECORDS FOR ONE PATIENT =================
    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    public List<MedicalRecord> getRecordsForPatient(
            @PathVariable Long patientId
    ) {
        return recordRepository.findByPatientId(patientId);
    }
}
