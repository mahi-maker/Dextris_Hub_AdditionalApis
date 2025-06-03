package com.jobplatform.controller;

import com.jobplatform.model.Skill;
import com.jobplatform.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Skills", description = "Skills management APIs")
public class SkillController {
    private final SkillService skillService;
    
    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    
    @GetMapping("/skills")
    @Operation(summary = "Get all skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }
}