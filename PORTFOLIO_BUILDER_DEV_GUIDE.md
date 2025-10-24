// Portfolio Builder - Developer Documentation & Code Examples

## API & Integration Guide

### PortfolioData Interface

```typescript
interface PortfolioData {
  // Personal Information
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;

  // Social Links
  socialLinks: SocialLink[];

  // Content Sections
  about: string;
  projects: ProjectItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications?: string[];

  // Settings
  theme: 'modern' | 'minimal' | 'creative' | 'professional' | 'dark' | 'vibrant' | 'retro' | 'glassmorphism';
  accentColor?: string;
  showCertifications?: boolean;
  showEducation?: boolean;
}
```

### Component Usage Examples

#### 1. Using PortfolioBuilder Component

```tsx
import PortfolioBuilder from './pages/dashboards/skill-development/PortfolioBuilder';

// In your router/app
<Route path="/portfolio" element={<PortfolioBuilder />} />
```

#### 2. Generating HTML from Portfolio Data

```tsx
import { PortfolioHTMLGenerator } from '@/services/portfolioService';

const portfolioData: PortfolioData = {
  fullName: "John Doe",
  headline: "Full Stack Developer",
  // ... rest of data
};

const htmlContent = PortfolioHTMLGenerator.generateHTML(portfolioData);

// Download as file
const element = document.createElement("a");
element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent));
element.setAttribute("download", "portfolio.html");
element.click();
```

#### 3. Using Form Component Standalone

```tsx
import { PortfolioForm } from '@/components/PortfolioForm';

function MyComponent() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <PortfolioForm
      data={portfolioData}
      onChange={setPortfolioData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
```

#### 4. Using Preview Component

```tsx
import { PortfolioPreview } from '@/components/PortfolioPreview';

function PreviewComponent() {
  const [html, setHtml] = useState<string>('');

  return (
    <PortfolioPreview
      data={portfolioData}
      html={html}
    />
  );
}
```

### Service Usage

#### PortfolioHTMLGenerator Methods

```typescript
// Generate complete HTML document
const html = PortfolioHTMLGenerator.generateHTML(portfolioData);

// Private methods (internal use)
// - getThemeStyles(theme, accentColor): Returns CSS for theme
// - getSocialIcon(platform): Returns emoji icon for platform
// - darkenColor(color, percent): Darkens a color for hover states
```

### Template Usage

```tsx
import { getTemplateByType } from '@/services/portfolioTemplates';

const developerTemplate = getTemplateByType('developer');
const designerTemplate = getTemplateByType('designer');
const entrepreneurTemplate = getTemplateByType('entrepreneur');
const photographerTemplate = getTemplateByType('photographer');

// Use template as starting point
setPortfolioData(developerTemplate);
```

### State Management Examples

#### Managing Multiple Portfolios

```tsx
const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);

// Add new portfolio
const addPortfolio = () => {
  const newPortfolio = {
    id: Date.now().toString(),
    name: `Portfolio ${portfolios.length + 1}`,
    data: defaultData,
    status: 'draft',
    views: 0,
    createdAt: new Date().toISOString()
  };
  setPortfolios([...portfolios, newPortfolio]);
};

// Update portfolio
const updatePortfolio = (id: string, data: PortfolioData) => {
  setPortfolios(portfolios.map(p =>
    p.id === id ? { ...p, data } : p
  ));
};

// Delete portfolio
const deletePortfolio = (id: string) => {
  setPortfolios(portfolios.filter(p => p.id !== id));
};
```

#### Adding/Removing Projects

```tsx
// Add project
const addProject = (portfolioId: string) => {
  const newProject: ProjectItem = {
    id: Date.now().toString(),
    title: 'New Project',
    description: '',
    technologies: [],
    featured: false
  };
  
  updatePortfolio(portfolioId, {
    ...currentData,
    projects: [...currentData.projects, newProject]
  });
};

// Update project
const updateProject = (id: string, updates: Partial<ProjectItem>) => {
  updatePortfolio(portfolioId, {
    ...currentData,
    projects: currentData.projects.map(p =>
      p.id === id ? { ...p, ...updates } : p
    )
  });
};

// Remove project
const removeProject = (id: string) => {
  updatePortfolio(portfolioId, {
    ...currentData,
    projects: currentData.projects.filter(p => p.id !== id)
  });
};
```

### Form Input Handling

```tsx
// Text input
<Input
  value={data.fullName}
  onChange={(e) => updateData({ fullName: e.target.value })}
/>

// Textarea
<Textarea
  value={data.about}
  onChange={(e) => updateData({ about: e.target.value })}
  rows={4}
/>

// Select/Dropdown
<select
  value={data.theme}
  onChange={(e) => updateData({ theme: e.target.value as any })}
>
  <option value="modern">Modern</option>
  <option value="minimal">Minimal</option>
</select>

// Color picker
<Input
  type="color"
  value={data.accentColor || '#6366f1'}
  onChange={(e) => updateData({ accentColor: e.target.value })}
/>

// Checkbox
<input
  type="checkbox"
  checked={project.featured}
  onChange={(e) => updateProject(project.id, { featured: e.target.checked })}
/>

// Array fields (comma-separated)
<Input
  value={project.technologies.join(', ')}
  onChange={(e) => updateProject(project.id, {
    technologies: e.target.value.split(',').map(t => t.trim())
  })}
/>
```

### Styling & Theme Customization

```tsx
// Using Tailwind classes in components
<div className="bg-slate-950 text-white rounded-lg p-6">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-slate-400 mt-1">Subtitle</p>
</div>

// Theme color application in generated HTML
// CSS variables in generated portfolio:
// - Accent color applied to buttons, headings, links
// - Theme-specific background colors
// - Responsive design with media queries

// Custom colors for portfolios
const accentColors = {
  purple: '#6366f1',    // Modern
  pink: '#ec4899',      // Creative
  blue: '#0891b2',      // Professional
  teal: '#14b8a6',      // Fresh
  indigo: '#4f46e5'     // Premium
};
```

### Export & Download Functions

```tsx
// Download as HTML
const downloadHTML = (portfolioData: PortfolioData) => {
  const html = PortfolioHTMLGenerator.generateHTML(portfolioData);
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(html));
  element.setAttribute("download", `${portfolioData.fullName.replace(/\s+/g, '-')}-portfolio.html`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Download as ZIP (future enhancement)
const downloadAsZip = async (portfolioData: PortfolioData) => {
  // Would create zip with HTML, CSS, images, etc.
  // Requires additional library like jszip
};

// Save to localStorage
const saveToLocalStorage = (id: string, data: PortfolioData) => {
  localStorage.setItem(`portfolio_${id}`, JSON.stringify(data));
};

// Load from localStorage
const loadFromLocalStorage = (id: string): PortfolioData | null => {
  const data = localStorage.getItem(`portfolio_${id}`);
  return data ? JSON.parse(data) : null;
};
```

### Advanced Features Implementation

#### 1. Live Preview with useMemo

```tsx
const generatedHTML = useMemo(() => {
  return PortfolioHTMLGenerator.generateHTML(currentData);
}, [currentData]);

// Re-generates only when currentData changes
```

#### 2. Tab Management

```tsx
const tabs = ['personal', 'projects', 'skills', 'experience', 'education', 'social'];

{tabs.map(tab => (
  <Button
    key={tab}
    variant={activeTab === tab ? 'default' : 'outline'}
    onClick={() => setActiveTab(tab)}
  >
    {tab === 'personal' && '👤 Personal'}
    {tab === 'projects' && '🎯 Projects'}
    {tab === 'skills' && '🛠️ Skills'}
    {/* ... etc */}
  </Button>
))}
```

#### 3. Dynamic Project Adding

```tsx
const [projects, setProjects] = useState<ProjectItem[]>([]);

const addProject = () => {
  const newProject: ProjectItem = {
    id: Date.now().toString(),
    title: 'New Project',
    description: 'Project description',
    technologies: ['Tech 1', 'Tech 2'],
    featured: false
  };
  setProjects([...projects, newProject]);
};

const removeProject = (id: string) => {
  setProjects(projects.filter(p => p.id !== id));
};

const updateProject = (id: string, updates: Partial<ProjectItem>) => {
  setProjects(projects.map(p =>
    p.id === id ? { ...p, ...updates } : p
  ));
};
```

### Integration with Backend (Future)

```tsx
// Save portfolio to database
const savePortfolioToServer = async (portfolioData: PortfolioData) => {
  const response = await fetch('/api/portfolios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolioData)
  });
  return response.json();
};

// Load portfolio from server
const loadPortfolioFromServer = async (id: string) => {
  const response = await fetch(`/api/portfolios/${id}`);
  return response.json();
};

// Publish portfolio
const publishPortfolio = async (id: string) => {
  const response = await fetch(`/api/portfolios/${id}/publish`, {
    method: 'PUT'
  });
  return response.json();
};

// Share portfolio
const sharePortfolio = async (id: string) => {
  const response = await fetch(`/api/portfolios/${id}/share`, {
    method: 'POST'
  });
  const { shareUrl } = await response.json();
  return shareUrl;
};
```

### Error Handling

```tsx
try {
  const html = PortfolioHTMLGenerator.generateHTML(portfolioData);
  downloadHTML(html);
} catch (error) {
  console.error('Failed to generate portfolio:', error);
  toast.error('Failed to generate portfolio. Please try again.');
}
```

### Performance Considerations

```tsx
// Use useMemo for expensive computations
const generatedHTML = useMemo(() => {
  return PortfolioHTMLGenerator.generateHTML(currentData);
}, [currentData]);

// Use useCallback for event handlers
const handleAddProject = useCallback(() => {
  addProject();
}, []);

// Debounce preview updates (if needed)
const debouncedPreview = useMemo(
  () => debounce((data: PortfolioData) => {
    setGeneratedHTML(PortfolioHTMLGenerator.generateHTML(data));
  }, 500),
  []
);
```

---

## Migration & Data Import

### Importing from JSON

```tsx
const importPortfolio = (jsonData: string) => {
  try {
    const data = JSON.parse(jsonData);
    setCurrentData(data as PortfolioData);
    toast.success('Portfolio imported successfully');
  } catch (error) {
    toast.error('Invalid JSON format');
  }
};
```

### Exporting Portfolio Data as JSON

```tsx
const exportAsJSON = (portfolioData: PortfolioData) => {
  const json = JSON.stringify(portfolioData, null, 2);
  const element = document.createElement("a");
  element.setAttribute("href", "data:application/json," + encodeURIComponent(json));
  element.setAttribute("download", "portfolio-data.json");
  element.click();
};
```

---

## Testing Examples

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

// Test portfolio creation
test('should create new portfolio', () => {
  render(<PortfolioBuilder />);
  fireEvent.click(screen.getByText('Create New Portfolio'));
  expect(screen.getByText(/editing/i)).toBeInTheDocument();
});

// Test form input
test('should update portfolio name', () => {
  const { setPortfolioData } = render(<PortfolioForm />);
  const input = screen.getByPlaceholderText('Your Full Name');
  fireEvent.change(input, { target: { value: 'John Doe' } });
  expect(input.value).toBe('John Doe');
});

// Test HTML generation
test('should generate valid HTML', () => {
  const html = PortfolioHTMLGenerator.generateHTML(mockData);
  expect(html).toContain('<html');
  expect(html).toContain('</html>');
  expect(html).toContain(mockData.fullName);
});
```

---

*This documentation provides complete developer reference for the Portfolio Builder system.*
