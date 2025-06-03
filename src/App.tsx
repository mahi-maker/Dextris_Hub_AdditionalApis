import React, { useState, useEffect } from 'react';
import { Code, Search, Bell, Briefcase, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('documentation');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState('/api/skills');
  const [userId, setUserId] = useState(1);
  const [skillIds, setSkillIds] = useState([1, 2]);
  const [searchParams, setSearchParams] = useState({
    skills: "1,3",
    location: "New York",
    title: "Developer"
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3000${endpoint}`;
      let options = {};
      
      if (endpoint === '/api/skills') {
        // GET request, no params needed
      } else if (endpoint === '/api/profile/skills') {
        // POST request
        options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, skillIds })
        };
      } else if (endpoint === '/api/search/jobs') {
        // GET with query params
        url += `?skills=${searchParams.skills}&location=${encodeURIComponent(searchParams.location)}&title=${encodeURIComponent(searchParams.title)}`;
      } else if (endpoint === '/api/search/candidates') {
        // GET with query params
        url += `?skills=${searchParams.skills}&experience=3&title=${encodeURIComponent(searchParams.title)}`;
      } else if (endpoint === '/api/notifications') {
        // GET with userId
        url += `?userId=${userId}`;
      }
      
      const response = await fetch(url, options);
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse({ error: 'Failed to fetch data. Make sure the server is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Briefcase className="mr-2" /> Job Platform API
            </h1>
            <div className="flex space-x-4">
              <a 
                href="http://localhost:3000/api-docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Open Swagger UI
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('documentation')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'documentation'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Code className="inline mr-2" size={16} />
                API Documentation
              </button>
              <button
                onClick={() => setActiveTab('tester')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'tester'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Search className="inline mr-2" size={16} />
                API Tester
              </button>
            </nav>
          </div>

          {activeTab === 'documentation' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Job Platform API Documentation</h2>
              <p className="mb-6">
                This is a mock API server that simulates the endpoints for a job platform. 
                The actual implementation would be done in Java with Spring Boot.
              </p>

              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Code className="mr-2" /> Skills API
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                      <div>
                        <code className="text-sm font-mono">/api/skills</code>
                        <p className="text-sm text-gray-600">List all available skills</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">POST</span>
                      <div>
                        <code className="text-sm font-mono">/api/profile/skills</code>
                        <p className="text-sm text-gray-600">Add skills to a user profile</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Search className="mr-2" /> Search API
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                      <div>
                        <code className="text-sm font-mono">/api/search/jobs</code>
                        <p className="text-sm text-gray-600">Advanced job search with filters</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                      <div>
                        <code className="text-sm font-mono">/api/search/candidates</code>
                        <p className="text-sm text-gray-600">Search for candidates (for employers)</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Bell className="mr-2" /> Notifications API
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                      <div>
                        <code className="text-sm font-mono">/api/notifications</code>
                        <p className="text-sm text-gray-600">Get user notifications</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Spring Boot Implementation</h3>
                <p className="text-sm">
                  In a real Spring Boot application, these endpoints would be implemented using:
                </p>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  <li>Controller classes with appropriate annotations (@RestController, @GetMapping, @PostMapping)</li>
                  <li>Service layer for business logic</li>
                  <li>Repository layer for data access</li>
                  <li>Entity classes for database models</li>
                  <li>SpringDoc/OpenAPI for Swagger documentation</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">API Tester</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Endpoint
                </label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                >
                  <option value="/api/skills">GET /api/skills</option>
                  <option value="/api/profile/skills">POST /api/profile/skills</option>
                  <option value="/api/search/jobs">GET /api/search/jobs</option>
                  <option value="/api/search/candidates">GET /api/search/candidates</option>
                  <option value="/api/notifications">GET /api/notifications</option>
                </select>
              </div>

              {(endpoint === '/api/profile/skills' || endpoint === '/api/notifications') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={userId}
                    onChange={(e) => setUserId(parseInt(e.target.value))}
                  />
                </div>
              )}

              {endpoint === '/api/profile/skills' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={skillIds.join(',')}
                    onChange={(e) => setSkillIds(e.target.value.split(',').map(id => parseInt(id.trim())))}
                  />
                </div>
              )}

              {(endpoint === '/api/search/jobs' || endpoint === '/api/search/candidates') && (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma-separated IDs)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={searchParams.skills}
                      onChange={(e) => setSearchParams({...searchParams, skills: e.target.value})}
                    />
                  </div>
                  
                  {endpoint === '/api/search/jobs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={searchParams.location}
                        onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={searchParams.title}
                      onChange={(e) => setSearchParams({...searchParams, title: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={fetchData}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mb-4"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Send Request'}
              </button>

              {apiResponse && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Response:</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Users className="mr-2" /> Spring Boot Implementation Guide
          </h2>
          
          <div className="prose max-w-none">
            <p>
              To implement these APIs in Spring Boot, you would need to create the following components:
            </p>
            
            <h3>1. Entity Classes</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// Skill.java
@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    // Getters, setters, constructors
}`}
            </pre>
            
            <h3>2. Repository Interfaces</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// SkillRepository.java
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findByName(String name);
}`}
            </pre>
            
            <h3>3. Service Classes</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// SkillService.java
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
    
    // Other methods
}`}
            </pre>
            
            <h3>4. Controller Classes</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// SkillController.java
@RestController
@RequestMapping("/api")
public class SkillController {
    private final SkillService skillService;
    
    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    
    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(new ApiResponse<>(true, skills));
    }
    
    @PostMapping("/profile/skills")
    public ResponseEntity<ApiResponse<UserSkillsDto>> addSkillsToProfile(
            @RequestBody AddSkillsRequest request) {
        // Implementation
    }
}`}
            </pre>
            
            <h3>5. Swagger Configuration</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// OpenApiConfig.java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Job Platform API")
                        .description("API documentation for a job platform application")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Your Name")
                                .email("your.email@example.com")));
    }
}`}
            </pre>
            
            <h3>6. Response Models</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`// ApiResponse.java
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    
    // Constructors, getters, setters
}`}
            </pre>
            
            <h3>7. Maven Dependencies (pom.xml)</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Database (e.g., PostgreSQL) -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- SpringDoc OpenAPI UI -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.1.0</version>
    </dependency>
    
    <!-- Lombok for reducing boilerplate code -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;