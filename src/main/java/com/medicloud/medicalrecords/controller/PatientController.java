package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.Doctor;
import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.DoctorRepository;
import com.medicloud.medicalrecords.repository.MedicalRecordRepository;
import com.medicloud.medicalrecords.repository.UserRepository;
import com.medicloud.medicalrecords.repository.PatientRepository;
import com.medicloud.medicalrecords.service.MedicalRecordService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordService medicalRecordService;
    private final DoctorRepository doctorRepository; // Added to view specialists

    public PatientController(PatientRepository patientRepository,
                             UserRepository userRepository,
                             MedicalRecordRepository medicalRecordRepository,
                             MedicalRecordService medicalRecordService,
                             DoctorRepository doctorRepository) { // Updated constructor
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.medicalRecordService = medicalRecordService;
        this.doctorRepository = doctorRepository;
    }

    /**
     * DASHBOARD: Patient can see all doctors and their specializations.
     */
    @GetMapping("/hospital-doctors")
    @PreAuthorize("hasRole('PATIENT')")
    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findAll();
    }

    /**
     * Fetches the profile of the currently logged-in patient.
     */
    @GetMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public Object getMyProfile(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getPatient();
    }

    /**
     * Retrieves all medical records linked to the logged-in patient's ID.
     */
    @GetMapping("/my-records")
    @PreAuthorize("hasRole('PATIENT')")
    public List<MedicalRecord> getMyRecords(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long myPatientId = user.getPatient().getId();
        return medicalRecordRepository.findByPatientId(myPatientId);
    }

    /**
     * Generates a secure Firebase Signed URL (15-min link) for a specific record.
     */
    @GetMapping("/download/{recordId}")
    @PreAuthorize("hasRole('PATIENT')")
    public String downloadRecord(@PathVariable Long recordId, Principal principal) {
        MedicalRecord record = medicalRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Security Check: Prevents patients from downloading other people's files
        if (!record.getPatientId().equals(user.getPatient().getId())) {
            throw new RuntimeException("Access Denied: You do not own this record!");
        }

        try {
            String url = record.getReportUrl();
            String fileName;

            if (url.contains("reports%2F")) {
                fileName = url.split("reports%2F")[1].split("\\?")[0];
            } else if (url.contains("/o/")) {
                fileName = url.split("/o/")[1].split("\\?")[0];
            } else {
                fileName = url.substring(url.lastIndexOf("/") + 1).split("\\?")[0];
            }

            // Decodes URL characters so Firebase can locate the file
            String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8);
            return medicalRecordService.generateDownloadUrl(decodedFileName);

        } catch (Exception e) {
            throw new RuntimeException("Error generating download link: " + e.getMessage());
        }
    }
    /**
     * SEARCH: Patients can find specialists by category (e.g., Cardiology).
     */
    @GetMapping("/doctors/search")
    @PreAuthorize("hasRole('PATIENT')")
    public List<Doctor> searchDoctorsBySpecialty(@RequestParam String specialty) {
        return doctorRepository.findBySpecializationContainingIgnoreCase(specialty);
    }
}