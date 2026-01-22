package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.medicloud.medicalrecords.repository.PatientRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/doctor")
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {

    private final PatientRepository patientRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    public DoctorController(PatientRepository patientRepository,
                            MedicalRecordRepository medicalRecordRepository) {
        this.patientRepository = patientRepository;
        this.medicalRecordRepository = medicalRecordRepository;
    }

//    // List all patients for the dashboard
//    @GetMapping("/patients")
//    public List<Patient> getAllPatients() {
//        return patientRepository.findAll();
//    }
//
//    // Search for patients by name
//    @GetMapping("/search")
//    public List<Patient> searchPatients(@RequestParam String name) {
//        return patientRepository.findByNameContainingIgnoreCase(name);
//    }

    //uid


    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }


    @GetMapping("/patients/search")
    public List<Patient> searchPatients(@RequestParam String query) {
        return patientRepository
                .findByNameContainingIgnoreCaseOrHealthIdContainingIgnoreCase(query, query);
    }


    // View history of records uploaded by this doctor
    @GetMapping("/my-uploads")
    public List<MedicalRecord> getMyUploadHistory(Principal principal) {
        return medicalRecordRepository.findByUploadedBy(principal.getName());
    }
}