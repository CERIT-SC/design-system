import { NavLink } from "react-router-dom";
import {
  Header,
  Content,
  Footer,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  SidebarProvider,
} from "../../lib";
import { Sidenav } from "../components/Sidenav";

export function Layouts() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidenav activePage="layouts" />

        <div className="flex-1 flex flex-col">
          <Header showSidebarTrigger={true} />

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
                  The Header component provides a consistent top navigation bar
                  with a sidebar trigger and action buttons. It uses the primary
                  color scheme and includes proper spacing and borders.
                </p>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Header Features</CardTitle>
                    <CardDescription>Built-in functionality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Sidebar trigger button (when used with Sidebar
                        component)
                      </li>
                      <li>Action buttons (Home, Logout)</li>
                      <li>Responsive design</li>
                      <li>Consistent branding colors</li>
                    </ul>
                  </CardContent>
                </Card>
              </Content.Body>

              <Content.Subheading>Content Component</Content.Subheading>
              <Content.Body>
                <p className="text-base leading-7">
                  The Content component is a compound component that provides
                  proper spacing and structure for your page content. It
                  includes sub-components for headings, subheadings, and body
                  content.
                </p>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Content API</CardTitle>
                    <CardDescription>Available sub-components</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Content.Body>

              <Content.Subheading>Footer Component</Content.Subheading>
              <Content.Body>
                <p className="text-base leading-7">
                  The Footer component provides contact information, links, and
                  branding for e-INFRA CZ. It includes support details, partner
                  logos, and copyright information.
                </p>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Footer Sections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      <li>e-INFRA CZ information</li>
                      <li>General information links</li>
                      <li>Support contact details</li>
                      <li>Partner logos</li>
                      <li>Copyright and version info</li>
                    </ul>
                  </CardContent>
                </Card>
              </Content.Body>

              <Content.Subheading>Usage Example</Content.Subheading>
              <Content.Body>
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Page Layout</CardTitle>
                    <CardDescription>
                      How to use these components together
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">{`import { Header, Content, Footer } from '@e-infra/design-system';

function MyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4">
        <Content>
          <Content.Heading>Page Title</Content.Heading>
          
          <Content.Subheading>Section</Content.Subheading>
          
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
                  </CardContent>
                </Card>
              </Content.Body>

              <Separator className="my-8" />

              <div className="flex gap-4">
                <Button asChild>
                  <NavLink to="/">← Back to Components</NavLink>
                </Button>
              </div>
            </Content>
          </main>

          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
