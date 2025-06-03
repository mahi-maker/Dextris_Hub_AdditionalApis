package com.jobplatform.repository;

import com.jobplatform.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT DISTINCT j FROM Job j JOIN j.requiredSkills s WHERE s.id IN :skillIds AND LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')) AND LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Job> searchJobs(List<Long> skillIds, String location, String title);
}