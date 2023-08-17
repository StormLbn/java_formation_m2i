package org.example.exos.jdbc1.database;

import org.example.exos.jdbc1.entity.Student;
import org.example.exos.util.ConnectDB;

import java.sql.*;
import java.util.ArrayList;

public class StudentManager {
    private static Connection connection;

    public static int addStudent(Student student) throws SQLException {
        connection = ConnectDB.getPostgreConnection();

        String query = "INSERT INTO exo1.student (last_name, first_name, class_number, degree_date) VALUES (?,?,?,?)";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setString(1, student.getLastName());
        statement.setString(2, student.getFirstName());
        statement.setInt(3, student.getClasseNb());
        statement.setDate(4, new java.sql.Date(student.getDegreeDate().getTime()));

        int rows = statement.executeUpdate();
        ConnectDB.closeConnection(connection);

        return rows;
    }

    public static ArrayList<Student> getAllStudents() throws SQLException {
        connection = ConnectDB.getPostgreConnection();

        ArrayList<Student> studentsList = new ArrayList<>();
        System.out.println();
        String query = "SELECT * FROM exo1.student";
        Statement statement = connection.createStatement();
        ResultSet results = statement.executeQuery(query);
        ConnectDB.closeConnection(connection);

        while (results.next()) {
            Student student = new Student(
                    results.getInt("id"),
                    results.getString("last_name"),
                    results.getString("first_name"),
                    results.getInt("class_number"),
                    results.getDate("degree_date")
            );
            studentsList.add(student);
        }
        return studentsList;
    }

    public static ArrayList<Student> getStudentsByClass(int classNb) throws SQLException {
        connection = ConnectDB.getPostgreConnection();
        ArrayList<Student> studentsList = new ArrayList<>();

        String query = "SELECT * FROM exo1.student WHERE class_number = ?";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setInt(1, classNb);
        ResultSet results = statement.executeQuery();
        ConnectDB.closeConnection(connection);

        while (results.next()) {
            Student student = new Student(
                    results.getInt("id"),
                    results.getString("last_name"),
                    results.getString("first_name"),
                    results.getInt("class_number"),
                    results.getDate("degree_date")
            );
            studentsList.add(student);
        }
        return studentsList;
    }

    public static int deleteStudentById(int id) throws SQLException {
        connection = ConnectDB.getPostgreConnection();

        String query = "DELETE FROM exo1.student WHERE id = ?";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.setInt(1, id);

        int rows = statement.executeUpdate();
        ConnectDB.closeConnection(connection);

        return rows;

    }

}
