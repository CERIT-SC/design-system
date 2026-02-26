import Link from "next/link";
import {
  Header,
  Content,
  Footer,
  Button,
  Separator,
  Panel,
  PanelHeader,
  PanelContent,
  PanelTitle,
  PanelDescription,
} from "../../lib";

function LayoutShowcase() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4">
          <Content>
            <Content.Heading>Layout Components Showcase</Content.Heading>

            <Content.Body>
              <p className="text-base leading-7">
                This page demonstrates the layout components: Header, Content,
                and Footer. These components help you build consistent page
                layouts across your application.
              </p>
            </Content.Body>

            <Content.Subheading>Header Component</Content.Subheading>
            <Content.Body>
              <p className="text-base leading-7">
                The Header component provides a modern, sticky navigation bar
                with glassmorphic backdrop blur effect. It supports two
                variants: sidebar layout with trigger button, or navigation
                layout with inline menu items.
              </p>
              <Panel className="mt-4">
                <PanelHeader>
                  <PanelTitle>Header Variants</PanelTitle>
                  <PanelDescription>Two layout options</PanelDescription>
                </PanelHeader>
                <PanelContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Sidebar variant</strong> - Shows SidebarTrigger
                      for collapsible sidebar navigation
                    </li>
                    <li>
                      <strong>Navigation variant</strong> - Shows inline
                      navigation menu with custom items
                    </li>
                    <li>Action buttons (Home, Logout) with ghost styling</li>
                    <li>Sticky positioning with backdrop blur</li>
                    <li>Full-width responsive design</li>
                  </ul>
                </PanelContent>
              </Panel>
            </Content.Body>

            <Content.Subheading>Content Component</Content.Subheading>
            <Content.Body>
              <p className="text-base leading-7">
                The Content component is a compound component that provides
                proper spacing and structure for your page content. It includes
                sub-components for headings, subheadings, and body content.
              </p>
              <Panel className="mt-4">
                <PanelHeader>
                  <PanelTitle>Content API</PanelTitle>
                  <PanelDescription>Available sub-components</PanelDescription>
                </PanelHeader>
                <PanelContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        Content.Heading
                      </code>{" "}
                      - Main page heading (H1)
                    </li>
                    <li>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        Content.Subheading
                      </code>{" "}
                      - Section heading (H2)
                    </li>
                    <li>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        Content.Body
                      </code>{" "}
                      - Body content wrapper with proper spacing
                    </li>
                  </ul>
                </PanelContent>
              </Panel>
            </Content.Body>

            <Content.Subheading>Footer Component</Content.Subheading>
            <Content.Body>
              <p className="text-base leading-7">
                The Footer component provides contact information, links, and
                branding for e-INFRA CZ. It includes support details, partner
                logos, and copyright information.
              </p>
              <Panel className="mt-4">
                <PanelHeader>
                  <PanelTitle>Footer Sections</PanelTitle>
                </PanelHeader>
                <PanelContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>e-INFRA CZ information</li>
                    <li>General information links</li>
                    <li>Support contact details</li>
                    <li>Partner logos</li>
                    <li>Copyright and version info</li>
                  </ul>
                </PanelContent>
              </Panel>
            </Content.Body>

            <Content.Subheading>Usage Example</Content.Subheading>
            <Content.Body>
              <Panel>
                <PanelHeader>
                  <PanelTitle>Basic Page Layout</PanelTitle>
                  <PanelDescription>
                    How to use these components together
                  </PanelDescription>
                </PanelHeader>
                <PanelContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm font-mono">{`import { 
  Header, 
  Content, 
  Footer,
  Sidebar,
  SidebarProvider 
} from '@e-infra/design-system';

// Sidebar layout variant
function MySidebarPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          {/* Sidebar content */}
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <Header variant="sidebar" />
          
          <main className="flex-1 container mx-auto px-4">
            <Content>
              <Content.Heading>Page Title</Content.Heading>
              <Content.Body>
                <p>Your content here...</p>
              </Content.Body>
            </Content>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}

// Navigation layout variant
function MyNavigationPage() {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'Settings', href: '/settings' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        variant="navigation" 
        navigationItems={navItems} 
      />
      
      <main className="flex-1 container mx-auto px-4">
        <Content>
          <Content.Heading>Page Title</Content.Heading>
          <Content.Body>
            <p>Your content here...</p>
          </Content.Body>
        </Content>
      </main>
      
      <Footer />
    </div>
  );
}`}</code>
                  </pre>
                </PanelContent>
              </Panel>
            </Content.Body>
          </Content>
        </main>
      </div>
    </div>
  );
}

export default LayoutShowcase;
