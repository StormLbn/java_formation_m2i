package org.example.exos.jdbc1.hci;

import org.example.exos.jdbc1.database.StudentManager;
import org.example.exos.jdbc1.entity.Student;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

public class ConsoleHci {
    private static final Scanner scanner = new Scanner(System.in);

    public static void start() {
        try {
            menu();
        } catch (SQLException e) {
            System.out.println("Connexion BDD échouée");
            e.printStackTrace();
        }
    }

    private static void menu() throws SQLException {
        int choice;

        do {
            System.out.println();
            System.out.println("=== Menu principal ===");
            System.out.println("1. Afficher tous les étudiants");
            System.out.println("2. Afficher les étudiants d'une classe");
            System.out.println("3. Ajouter un étudiant");
            System.out.println("4. Effacer un étudiant");
            System.out.println("0. Quitter");
            choice = inputChoice();

            switch (choice) {
                case 0 -> System.out.println("\nA bientôt");
                case 1 -> displayAllStudents();
                case 2 -> displayStudentsByClass();
                case 3 -> addStudent();
                case 4 -> deleteStudent();
                default -> System.out.println("Veuillez saisir un nombre valide !");
            }

        } while (choice != 0);
    }

    private static int inputChoice() {
        System.out.print("Votre choix : ");
        int choice = -1;
        try {
            choice = scanner.nextInt();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erreur de saisie !");
        }
        scanner.nextLine();
        return choice;
    }

    private static Date checkDate() {
        Date date = null;
        do {
            String inputDate = scanner.nextLine();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
            try {
                date = simpleDateFormat.parse(inputDate);
            } catch (ParseException e) {
                e.printStackTrace();
                System.out.println("Erreur de saisie de la date ! Recommencez : ");
            }
        } while (date == null);
        return date;
    }

    private static void addStudent() throws SQLException {
        Student student = new Student();

        // Saisies utilisateur
        System.out.println("=== Ajout d'un étudiant ===");
        System.out.print("Nom : ");
        student.setLastName(scanner.nextLine());
        System.out.print("Prénom : ");
        student.setFirstName(scanner.nextLine());
        System.out.print("Numéro de classe : ");
        student.setClasseNb(scanner.nextInt());
        scanner.nextLine();
        System.out.println("Date de diplôme (JJ-MM-AAAA) : ");
        student.setDegreeDate(checkDate());

        int rows = StudentManager.addStudent(student);

        if (rows == 0) {
            System.out.println("Erreur : l'étudiant n'a pas pu être ajouté à la base de données");
        } else {
            System.out.println("Ajout de " + rows + " étudiant dans la base de données");
        }
    }

    private static void displayAllStudents() throws SQLException {
        ArrayList<Student> studentsList = StudentManager.getAllStudents();
        for (Student student : studentsList) {
            System.out.println(student);
        }
    }

    private static void displayStudentsByClass() throws SQLException {
        int classNb;
        System.out.println();
        System.out.print("Entrez le numéro de la classe : ");
        classNb = scanner.nextInt();
        scanner.nextLine();

        ArrayList<Student> studentsList = StudentManager.getStudentsByClass(classNb);
        for (Student student : studentsList) {
            System.out.println(student);
        }
    }

    private static void deleteStudent() throws SQLException {
        System.out.println();
        System.out.println("Quel étudiant voulez-vous effacer ?");
        displayAllStudents();
        int id = inputChoice();

        int rows = StudentManager.deleteStudentById(id);

        if (rows == 0) {
            System.out.println("Erreur : l'étudiant n'a pas pu être effacé de la base de données");
        } else {
            System.out.println("Suppression de " + rows + " étudiant de la base de données");
        }
    }

}
