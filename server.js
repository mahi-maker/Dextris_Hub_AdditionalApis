import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load Swagger document
const swaggerDocument = YAML.load(join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sample data
const skills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Java' },
  { id: 3, name: 'Spring Boot' },
  { id: 4, name: 'React' },
  { id: 5, name: 'Node.js' }
];

const userProfiles = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com',
    skills: [1, 2, 3],
    title: 'Full Stack Developer',
    experience: 5
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    skills: [3, 4],
    title: 'Frontend Developer',
    experience: 3
  }
];

const jobs = [
  {
    id: 1,
    title: 'Senior Java Developer',
    company: 'Tech Corp',
    location: 'New York',
    description: 'Looking for an experienced Java developer',
    requiredSkills: [2, 3],
    salary: '120,000 - 150,000'
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Web Solutions',
    location: 'Remote',
    description: 'Frontend position with React focus',
    requiredSkills: [1, 4],
    salary: '90,000 - 110,000'
  }
];

const notifications = [
  { id: 1, userId: 1, message: 'Your application was viewed', read: false, date: '2023-05-15' },
  { id: 2, userId: 1, message: 'New job matching your skills', read: true, date: '2023-05-14' },
  { id: 3, userId: 2, message: 'Interview scheduled for tomorrow', read: false, date: '2023-05-16' }
];

// Skills API
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    data: skills
  });
});

app.post('/api/profile/skills', (req, res) => {
  const { userId, skillIds } = req.body;
  
  if (!userId || !skillIds || !Array.isArray(skillIds)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request. userId and skillIds array are required.'
    });
  }
  
  const user = userProfiles.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Add skills to user profile
  user.skills = [...new Set([...user.skills, ...skillIds])];
  
  res.status(201).json({
    success: true,
    data: {
      userId,
      skills: user.skills.map(skillId => skills.find(s => s.id === skillId))
    }
  });
});

// Search API
app.get('/api/search/jobs', (req, res) => {
  const { skills, location, title } = req.query;
  
  let filteredJobs = [...jobs];
  
  if (skills) {
    const skillsArray = skills.split(',').map(s => parseInt(s.trim()));
    filteredJobs = filteredJobs.filter(job => 
      job.requiredSkills.some(skill => skillsArray.includes(skill))
    );
  }
  
  if (location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (title) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    data: filteredJobs
  });
});

app.get('/api/search/candidates', (req, res) => {
  const { skills, experience, title } = req.query;
  
  let filteredCandidates = [...userProfiles];
  
  if (skills) {
    const skillsArray = skills.split(',').map(s => parseInt(s.trim()));
    filteredCandidates = filteredCandidates.filter(candidate => 
      candidate.skills.some(skill => skillsArray.includes(skill))
    );
  }
  
  if (experience) {
    const minExperience = parseInt(experience);
    filteredCandidates = filteredCandidates.filter(candidate => 
      candidate.experience >= minExperience
    );
  }
  
  if (title) {
    filteredCandidates = filteredCandidates.filter(candidate => 
      candidate.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    data: filteredCandidates
  });
});

// Notifications API
app.get('/api/notifications', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId is required'
    });
  }
  
  const userNotifications = notifications.filter(n => n.userId === parseInt(userId));
  
  res.json({
    success: true,
    data: userNotifications
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});