package com.medicloud.medicalrecords.service;

import com.medicloud.medicalrecords.activity.ActivityLogService;
import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository recordRepository;
    private final ActivityLogService activityLogService;

    public MedicalRecordService(
            MedicalRecordRepository recordRepository,
            ActivityLogService activityLogService
    ) {
        this.recordRepository = recordRepository;
        this.activityLogService = activityLogService;
    }

    /**
     * Save medical record metadata in DB after upload
     * Logged as UPLOAD_RECORD (Doctor)
     */
    public MedicalRecord saveRecord(Long patientId, String reportUrl, String uploadedBy) {

        MedicalRecord record = new MedicalRecord();
        record.setPatientId(patientId);
        record.setReportUrl(reportUrl);
        record.setUploadedBy(uploadedBy);
        record.setUploadedAt(LocalDateTime.now());

        MedicalRecord savedRecord = recordRepository.save(record);

        System.out.println("UPLOAD_RECORD logging triggered");


        // ACTIVITY LOG: Doctor uploads record
        activityLogService.log("UPLOAD_RECORD", savedRecord.getId());

        return savedRecord;
    }

    /**
     * Generate time-limited signed download URL from Firebase
     * Logged as DOWNLOAD_RECORD (Patient)
     */
    public String generateDownloadUrl(String fileName) {

        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.get("reports/" + fileName);

        if (blob == null) {
            throw new RuntimeException("File not found in Firebase");
        }

        URL signedUrl = blob.signUrl(15, TimeUnit.MINUTES);

        //  ACTIVITY LOG: Patient downloads record
        // If you later map fileName -> recordId, replace null with recordId
        // inside generateDownloadUrl(...)
        System.out.println("DOWNLOAD_RECORD logging triggered");
        activityLogService.log("DOWNLOAD_RECORD", null);

        return signedUrl.toString();
    }
}
