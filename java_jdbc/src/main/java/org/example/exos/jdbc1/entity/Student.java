package org.example.exos.jdbc1.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Student {

    private int id;
    private String firstName;
    private String lastName;
    private int classeNb;
    private Date degreeDate;

    public Student() {}

    public Student(int id, String lastName, String firstName, int classeNb, Date degreeDate) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.classeNb = classeNb;
        this.degreeDate = degreeDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getClasseNb() {
        return classeNb;
    }

    public void setClasseNb(int classeNb) {
        this.classeNb = classeNb;
    }

    public Date getDegreeDate() {
        return degreeDate;
    }

    public void setDegreeDate(Date degreeDate) {
        this.degreeDate = degreeDate;
    }

    @Override
    public String toString() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        return "Etudiant " + id + " : " + firstName + " " + lastName + " - classe " + classeNb + " - Diplôme obtenu le " + simpleDateFormat.format(degreeDate);
    }
}
