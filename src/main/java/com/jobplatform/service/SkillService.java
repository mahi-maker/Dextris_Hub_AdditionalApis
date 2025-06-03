package com.jobplatform.service;

import com.jobplatform.model.Skill;
import com.jobplatform.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {
    private final SkillRepository skillRepository;
    
    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }
    
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }
}