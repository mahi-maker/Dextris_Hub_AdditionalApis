package com.jobplatform.repository;

import com.jobplatform.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query("SELECT u FROM UserProfile u JOIN u.skills s WHERE s.id IN :skillIds AND u.experience >= :minExperience AND LOWER(u.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<UserProfile> searchCandidates(List<Long> skillIds, int minExperience, String title);
}