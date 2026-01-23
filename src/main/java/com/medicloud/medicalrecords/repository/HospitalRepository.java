package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}
