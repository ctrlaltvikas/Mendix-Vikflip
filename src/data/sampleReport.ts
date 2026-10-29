export interface DocumentAttachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'xlsx' | 'docx' | 'image' | 'link';
  url: string;
  description?: string;
}

export interface DocumentLink {
  label: string;
  targetPage?: number; // Internal jump (0-indexed)
  url?: string;        // External URL
}

export interface ReportPage {
  id: string;
  pageNumber: number;
  chapter: string;
  isCover?: boolean;
  density?: 'hard' | 'soft';
  type: 'front-cover' | 'letter' | 'contents' | 'feature' | 'infographic' | 'architecture' | 'sustainability' | 'benchmark' | 'global' | 'back-cover';
  title: string;
  subtitle?: string;
  accentBadge?: string;
  metrics?: Array<{ label: string; value: string; delta: string }>;
  body?: string[];
  quote?: { text: string; author: string; role: string };
  links?: DocumentLink[];
  attachments?: DocumentAttachment[];
}

export const SAMPLE_REPORT: ReportPage[] = [
  {
    id: 'page-1',
    pageNumber: 1,
    chapter: 'Cover',
    isCover: true,
    density: 'hard',
    type: 'front-cover',
    title: 'VIKFLIP ANNUAL REPORT',
    subtitle: 'The Horizon of Enterprise UI & Digital Reading Architecture',
    accentBadge: 'FISCAL YEAR 2026 • GLOBAL EDITION'
  },
  {
    id: 'page-2',
    pageNumber: 2,
    chapter: 'Executive Address',
    density: 'soft',
    type: 'letter',
    title: 'A New Era of Tactile Enterprise Experience',
    subtitle: 'Letter from the Chief Technology Officer & Principal Architect',
    body: [
      'In an age dominated by static flat dashboards and commoditized web interfaces, modern enterprise users yearn for tactile, visceral interaction that honors the craftsmanship of traditional print media while unlocking the limitless scalability of modern web standards.',
      'VikFlip represents the convergence of physics-driven spatial interaction, real-time procedural audio synthesis, and Mendix Pluggable Widget SDK v9/v10 compliance. Our goal has never been merely to turn a digital page—it is to restore intimacy, gravitas, and focus to executive reading.'
    ],
    quote: {
      text: 'Great software does not just deliver data—it honors the human senses and cultivates quiet clarity.',
      author: 'Vikas Yadav',
      role: 'Principal Architect, Digital Experience Platform'
    },
    links: [
      { label: 'View Executive Bio & Credentials', url: 'https://docs.mendix.com' }
    ]
  },
  {
    id: 'page-3',
    pageNumber: 3,
    chapter: '01. Executive Overview',
    density: 'soft',
    type: 'contents',
    title: 'Table of Contents & Core Milestones',
    subtitle: 'Key strategic pillars and operational benchmarks for FY26',
    metrics: [
      { label: 'Enterprise ARR', value: '$4.82B', delta: '+34.2% YoY' },
      { label: 'Active Readers', value: '2.85M', delta: '+88.1% YoY' },
      { label: 'Render Latency', value: '16.4ms', delta: '60 FPS Pure' },
      { label: 'Uptime SLA', value: '99.99%', delta: 'Tier-4 Active' }
    ],
    links: [
      { label: 'Section 01: Executive Address & Letter (p. 2)', targetPage: 1 },
      { label: 'Section 02: Pluggable Widget Revolution (p. 4)', targetPage: 3 },
      { label: 'Section 03: Global Adoption & Data Analytics (p. 5)', targetPage: 4 },
      { label: 'Section 04: Spatial Physics & 3D Lighting (p. 6)', targetPage: 5 },
      { label: 'Section 05: Sustainability & Carbon Neutrality (p. 7)', targetPage: 6 }
    ]
  },
  {
    id: 'page-4',
    pageNumber: 4,
    chapter: '02. Engineering Innovation',
    density: 'soft',
    type: 'feature',
    title: 'The Pluggable Widget Revolution',
    subtitle: 'Bridging low-code agility with ultra-high-fidelity native web standards',
    body: [
      'Historically, enterprise low-code platforms forced a compromise between rapid visual composition and deep, fluid interaction fidelity. Pluggable widgets have permanently dissolved that compromise.',
      'By decoupling data retrieval into declarative Mendix ListAttributes and delegating visual projection to specialized canvas-accelerated renderers, we enable complex vector rendering, dynamic corner folding, and Web Audio API acoustics without burdening the application core.',
      'The result is an executive-grade reading instrument tailored for policy documents, investor circulars, luxury catalogs, and technical patents.'
    ],
    links: [
      { label: 'Mendix Pluggable Widget SDK Documentation ↗', url: 'https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets/' }
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'Mendix-Pluggable-Widget-Specs.pdf',
        size: '4.2 MB',
        type: 'pdf',
        url: '#',
        description: 'Complete architecture specification for custom widget packaging and React 18 integration.'
      }
    ]
  },
  {
    id: 'page-5',
    pageNumber: 5,
    chapter: '03. Strategic Growth',
    density: 'soft',
    type: 'infographic',
    title: 'Global Adoption & Readership Analytics',
    subtitle: 'Quarterly trajectory across Americas, EMEA, and Asia-Pacific markets',
    metrics: [
      { label: 'North America', value: '44%', delta: 'Enterprise' },
      { label: 'Europe (EMEA)', value: '32%', delta: 'Gov & Finance' },
      { label: 'Asia-Pacific', value: '24%', delta: 'High Velocity' }
    ],
    attachments: [
      {
        id: 'att-2',
        name: 'FY26-Global-Financial-Model.xlsx',
        size: '2.8 MB',
        type: 'xlsx',
        url: '#',
        description: 'Detailed audited quarterly breakdown of ARR, recurring seat licenses, and regional projections.'
      }
    ]
  },
  {
    id: 'page-6',
    pageNumber: 6,
    chapter: '04. Deep-Tech Physics',
    density: 'soft',
    type: 'architecture',
    title: 'Spatial Physics & 3D Lighting Engine',
    subtitle: 'Deconstructing the Euler angle and bezier curl calculations',
    body: [
      'Every page turn in VikFlip is calculated in real time using a dynamic cloth-simulation mesh. When the user grabs any corner, the drag coordinate is projected against the spine axis, calculating exact geometric resistance, surface tension, and dynamic shadow penetration.',
      'Drop shadows are evaluated across discrete passes: contact shadow under the curled flap, ambient occlusion along the gutter, and progressive edge bevel reflecting incident reading light.',
      'If released midway, spring-back kinematics simulate authentic 120gsm bond paper damping.'
    ],
    attachments: [
      {
        id: 'att-3',
        name: 'Cloth-Simulation-Physics-Whitepaper.pdf',
        size: '6.1 MB',
        type: 'pdf',
        url: '#',
        description: 'Mathematical derivation of non-linear spring tensors and canvas rendering algorithms.'
      }
    ]
  },
  {
    id: 'page-7',
    pageNumber: 7,
    chapter: '05. ESG & Green Compute',
    density: 'soft',
    type: 'sustainability',
    title: 'Sustainability & Carbon Neutrality',
    subtitle: 'Transitioning multi-million page corporate print runs into zero-emission digital publications',
    metrics: [
      { label: 'Paper Saved', value: '42.8M', delta: 'Sheets' },
      { label: 'CO2 Abated', value: '1,420t', delta: 'Scope-3' },
      { label: 'Green Energy', value: '100%', delta: 'Clean Cloud' }
    ],
    body: [
      'Corporate publishing generates thousands of metric tons of avoidable carbon emissions each quarter through timber harvesting, offset printing, and transatlantic air freight.',
      'VikFlip provides Fortune 500 corporations with a digital reading experience that executives, board members, and shareholders actively prefer over physical printed volumes, achieving immediate ESG compliance.'
    ],
    attachments: [
      {
        id: 'att-4',
        name: 'ESG-Audit-Scope3-Certificate.pdf',
        size: '8.4 MB',
        type: 'pdf',
        url: '#',
        description: 'Verified independent auditor report on forest conservation and Scope-3 emissions reduction.'
      }
    ]
  },
  {
    id: 'page-8',
    pageNumber: 8,
    chapter: '06. Quality & Performance',
    density: 'soft',
    type: 'benchmark',
    title: 'Performance Benchmarks & Memory Profiles',
    subtitle: 'Zero memory leaks across 500+ consecutive page turn cycles',
    metrics: [
      { label: 'DOM Nodes', value: '< 140', delta: 'Optimized' },
      { label: 'Heap Memory', value: '18.4MB', delta: 'Flat profile' },
      { label: 'Touch Latency', value: '4.2ms', delta: 'ProMotion ready' }
    ],
    body: [
      'Comprehensive profiling in Chromium DevTools and WebKit Web Inspector validates zero cumulative layout shift (CLS: 0.000) and rock-solid 60 to 120Hz ProMotion screen synchronization.',
      'Audio synthesis allocates audio buffers lazily, producing zero background CPU overhead when the reader is idle.'
    ]
  },
  {
    id: 'page-9',
    pageNumber: 9,
    chapter: '07. Global Footprint',
    density: 'soft',
    type: 'global',
    title: 'Ecosystem Trust & Enterprise Deployments',
    subtitle: 'Deployed across leading sovereign wealth funds, banking groups, and energy conglomerates',
    quote: {
      text: 'VikFlip has elevated our annual shareholder reports from dry PDF downloads into an interactive luxury showcase. The tactile physics and paper rustle are astonishingly realistic.',
      author: 'Elena Rostova',
      role: 'Managing Director, Global Investor Relations'
    },
    links: [
      { label: 'Explore Customer Enterprise Case Studies ↗', url: 'https://www.mendix.com/customer-stories/' }
    ]
  },
  {
    id: 'page-10',
    pageNumber: 10,
    chapter: 'End Matter',
    isCover: true,
    density: 'hard',
    type: 'back-cover',
    title: 'VIKFLIP ENTERPRISE 2026',
    subtitle: 'Engineered with Precision for Mendix Pluggable Widgets SDK',
    accentBadge: 'ISO 27001 • SOC 2 TYPE II • WCAG 2.1 AA COMPLIANT'
  }
];
