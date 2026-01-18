//package com.medicloud.medicalrecords.service;
//
//import com.medicloud.medicalrecords.model.MedicalRecord;
//import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
//import org.springframework.stereotype.Service;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//public class MedicalRecordService {
//
//    private final MedicalRecordRepository recordRepository;
//
//    public MedicalRecordService(MedicalRecordRepository recordRepository) {
//        this.recordRepository = recordRepository;
//    }
//
//    public MedicalRecord saveRecord(Long patientId, String url, String doctorUsername) {
//        MedicalRecord record = new MedicalRecord();
//        record.setPatientId(patientId);
//        record.setReportUrl(url);
//        record.setUploadedBy(doctorUsername);
//        record.setUploadedAt(LocalDateTime.now());
//        return recordRepository.save(record);
//    }
//
//    public List<MedicalRecord> getRecordsByPatient(Long patientId) {
//        return recordRepository.findByPatientId(patientId);
//    }
//}


package com.medicloud.medicalrecords.service;

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

    public MedicalRecordService(MedicalRecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    // This is the missing method causing your error
    public MedicalRecord saveRecord(Long patientId, String reportUrl, String uploadedBy) {
        MedicalRecord record = new MedicalRecord();
        record.setPatientId(patientId);
        record.setReportUrl(reportUrl);
        record.setUploadedBy(uploadedBy);
        record.setUploadedAt(LocalDateTime.now()); // Automatically set the timestamp
        return recordRepository.save(record);
    }

    public String generateDownloadUrl(String fileName) {
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.get("reports/" + fileName);
        if (blob == null) {
            throw new RuntimeException("File not found in Firebase");
        }
        URL signedUrl = blob.signUrl(15, TimeUnit.MINUTES);
        return signedUrl.toString();
    }
}