package com.jobplatform.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;
    
    @Column(nullable = false)
    private String message;
    
    @Column(nullable = false)
    private boolean read;
    
    @Column(nullable = false)
    private LocalDate date;
}