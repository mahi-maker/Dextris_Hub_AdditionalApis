package com.jobplatform.controller;

import com.jobplatform.model.Job;
import com.jobplatform.model.UserProfile;
import com.jobplatform.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@Tag(name = "Search", description = "Search APIs for jobs and candidates")
public class SearchController {
    private final SearchService searchService;
    
    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }
    
    @GetMapping("/jobs")
    @Operation(summary = "Search for jobs")
    public ResponseEntity<List<Job>> searchJobs(
            @RequestParam List<Long> skills,
            @RequestParam String location,
            @RequestParam String title) {
        return ResponseEntity.ok(searchService.searchJobs(skills, location, title));
    }
    
    @GetMapping("/candidates")
    @Operation(summary = "Search for candidates")
    public ResponseEntity<List<UserProfile>> searchCandidates(
            @RequestParam List<Long> skills,
            @RequestParam int experience,
            @RequestParam String title) {
        return ResponseEntity.ok(searchService.searchCandidates(skills, experience, title));
    }
}