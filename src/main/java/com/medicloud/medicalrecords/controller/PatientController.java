

package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.auth.dto.PatientProfileUpdateRequest;
import com.medicloud.medicalrecords.model.Doctor;
import com.medicloud.medicalrecords.model.MedicalRecord;
import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.service.MedicalRecordService;
import com.medicloud.medicalrecords.service.PatientService;
import com.medicloud.medicalrecords.repository.DoctorRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/patient")
@PreAuthorize("hasRole('PATIENT')")
public class PatientController {

    private final PatientService patientService;
    private final MedicalRecordService medicalRecordService;
    private final DoctorRepository doctorRepository;

    public PatientController(
            PatientService patientService,
            MedicalRecordService medicalRecordService,
            DoctorRepository doctorRepository
    ) {
        this.patientService = patientService;
        this.medicalRecordService = medicalRecordService;
        this.doctorRepository = doctorRepository;
    }

    /**
     * DASHBOARD: Patient can see all doctors and their specializations.
     */
    @GetMapping("/hospital-doctors")
    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findAll();
    }

    /**
     * Fetch logged-in patient's profile.
     */
    @GetMapping("/me")
    public Patient getMyProfile(Principal principal) {
        return patientService.getMyProfile(principal.getName());
    }

    /**
     * Fetch logged-in patient's medical records.
     */
    @GetMapping("/my-records")
    public List<MedicalRecord> getMyRecords(Principal principal) {
        return patientService.getMyRecords(principal.getName());
    }

    /**
     * Generate secure Firebase download URL (15 min).
     */
    @GetMapping("/download/{recordId}")
    public String downloadRecord(@PathVariable Long recordId, Principal principal) {

        MedicalRecord record = patientService.validateAndGetRecord(
                recordId,
                principal.getName()
        );

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

            String decodedFileName =
                    URLDecoder.decode(fileName, StandardCharsets.UTF_8);

            return medicalRecordService.generateDownloadUrl(decodedFileName);

        } catch (Exception e) {
            throw new RuntimeException("Error generating download link");
        }
    }

    /**
     * Update patient profile (age, gender, disease).
     */
    @PutMapping("/profile")
    public Patient updateProfile(
            @RequestBody PatientProfileUpdateRequest request
    ) {
        return patientService.updateMyProfile(request);
    }

    /**
     * Search doctors by specialty.
     */
    @GetMapping("/doctors/search")
    public List<Doctor> searchDoctorsBySpecialty(
            @RequestParam String specialty
    ) {
        return doctorRepository
                .findBySpecializationContainingIgnoreCase(specialty);
    }
}
