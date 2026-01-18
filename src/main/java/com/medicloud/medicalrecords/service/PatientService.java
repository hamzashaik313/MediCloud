package com.medicloud.medicalrecords.service;

import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.auth.dto.PatientProfileUpdateRequest;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.medicloud.medicalrecords.repository.PatientRepository;
import com.medicloud.medicalrecords.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    public PatientService(
            PatientRepository patientRepository,
            UserRepository userRepository,
            MedicalRecordRepository medicalRecordRepository
    ) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public Patient getMyProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getPatient();
    }

    public List<MedicalRecord> getMyRecords(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return medicalRecordRepository.findByPatientId(user.getPatient().getId());
    }

    public Patient updateMyProfile(PatientProfileUpdateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Patient patient = patientRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setDisease(request.getDisease());

        return patientRepository.save(patient);
    }
    public MedicalRecord validateAndGetRecord(Long recordId, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MedicalRecord record = medicalRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (!record.getPatientId().equals(user.getPatient().getId())) {
            throw new RuntimeException("Access denied");
        }

        return record;
    }

}
