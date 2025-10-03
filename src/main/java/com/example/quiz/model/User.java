package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(unique=true)
  private String username;
  private String password; // stored BCrypted
  private String role; // "USER" or "ADMIN"

  // constructors, getters, setters
  public User() {}
  public User(String username, String password, String role){
    this.username = username;
    this.password = password;
    this.role = role;
  }
  // getters and setters...
}
