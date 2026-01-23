package com.medicloud.medicalrecords.auth.dto;

public class HospitalSignupRequest {
    private String hospitalName;
    private String city;
    private String licenseCode;
    private String adminUsername;
    private String adminPassword;

    public String getHospitalName() { return hospitalName; }
    public String getCity() { return city; }
    public String getLicenseCode() { return licenseCode; }
    public String getAdminUsername() { return adminUsername; }
    public String getAdminPassword() { return adminPassword; }

    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    public void setCity(String city) { this.city = city; }
    public void setLicenseCode(String licenseCode) { this.licenseCode = licenseCode; }
    public void setAdminUsername(String adminUsername) { this.adminUsername = adminUsername; }
    public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }
}
