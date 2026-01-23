package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.Hospital;
import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.medicloud.medicalrecords.repository.PatientRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.medicloud.medicalrecords.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/doctor")
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {

    private final PatientRepository patientRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final UserRepository userRepository;

    public DoctorController(PatientRepository patientRepository,
                            MedicalRecordRepository medicalRecordRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.userRepository = userRepository;
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
    public List<Patient> getHospitalPatients(Authentication auth) {

        User doctor = userRepository.findByUsername(auth.getName()).orElseThrow();

        Hospital hospital = doctor.getHospital();

        return patientRepository.findAll()
                .stream()
                .filter(p -> p.getUser() != null &&
                        p.getUser().getHospital() != null &&
                        p.getUser().getHospital().getId().equals(hospital.getId()))
                .toList();
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