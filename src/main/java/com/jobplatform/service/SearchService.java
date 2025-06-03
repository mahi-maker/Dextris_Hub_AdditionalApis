package com.jobplatform.service;

import com.jobplatform.model.Job;
import com.jobplatform.model.UserProfile;
import com.jobplatform.repository.JobRepository;
import com.jobplatform.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchService {
    private final JobRepository jobRepository;
    private final UserProfileRepository userProfileRepository;
    
    @Autowired
    public SearchService(JobRepository jobRepository, UserProfileRepository userProfileRepository) {
        this.jobRepository = jobRepository;
        this.userProfileRepository = userProfileRepository;
    }
    
    public List<Job> searchJobs(List<Long> skillIds, String location, String title) {
        return jobRepository.searchJobs(skillIds, location, title);
    }
    
    public List<UserProfile> searchCandidates(List<Long> skillIds, int minExperience, String title) {
        return userProfileRepository.searchCandidates(skillIds, minExperience, title);
    }
}