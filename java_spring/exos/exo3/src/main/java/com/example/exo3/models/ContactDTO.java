package com.example.exo3.models;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ContactDTO {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    // TODO si le temps ajouter date de naissance
}