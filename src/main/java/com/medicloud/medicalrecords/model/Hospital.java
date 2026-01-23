package com.medicloud.medicalrecords.model;

import jakarta.persistence.*;

@Entity
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String licenseCode;

    public Hospital(Object o, String apolloHospital, String hyderabad, String s) {
    }

    public Hospital() {

    }

    // getters & setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCity() { return city; }
    public String getLicenseCode() { return licenseCode; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCity(String city) { this.city = city; }
    public void setLicenseCode(String licenseCode) { this.licenseCode = licenseCode; }
}
