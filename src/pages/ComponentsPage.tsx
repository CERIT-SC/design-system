import "../globals.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  H1,
  H2,
  H3,
  H4,
  P,
  Strong,
  Small,
  Muted,
  Code,
  Link,
  Content,
  Header,
  Footer,
  PanelHeader,
  Panel,
  PanelTitle,
  PanelDescription,
  PanelContent,
  PanelFooter,
} from "../../lib";
import { toast } from "sonner";
import { Toaster } from "../../lib/components/ui/sonner";
import {
  Terminal,
  Info,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Home,
  CircleCheck,
  User,
  FileText,
  CircleAlert,
  CircleX,
} from "lucide-react";

// Component copy helper
const ComponentCopySelect = ({
  components,
}: {
  components: { name: string; description?: string; import: string }[];
}) => {
  const handleCopy = (importStatement: string, componentName: string) => {
    navigator.clipboard.writeText(importStatement);
    toast.success("Copied to clipboard!", {
      description: `Component ${componentName} import copied.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Copy Component
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px]">
        {components.map((comp) => (
          <DropdownMenuItem
            key={comp.name}
            onClick={() => handleCopy(comp.import, comp.name)}
            className="flex-col items-start p-4 cursor-pointer hover:bg-tertiary"
          >
            <div className="font-semibold text-sm mb-1">{comp.name}</div>
            {comp.description && (
              <div className="text-xs text-muted-foreground mb-2">
                {comp.description}
              </div>
            )}
            <code className="text-xs bg-muted px-2 py-1 rounded block w-full">
              {comp.import}
            </code>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function ComponentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(33);

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">e</span>
                </div>
                <span className="font-semibold">e-INFRA</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/">
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/layouts">
                          <FileText className="h-4 w-4" />
                          <span>Layouts</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-4 py-2 text-xs text-muted-foreground">
                © 2026 e-INFRA
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 min-h-screen bg-background">
            <Header showSidebarTrigger={true} />
            <div className="container mx-auto px-4 py-8 space-y-8">
              <Content>
                <Content.Heading>e-INFRA CZ Design System</Content.Heading>
                <Content.Body>
                  <p className="text-base leading-7 text-muted-foreground">
                    Component showcase for the e-INFRA CZ Design System built
                    with shadcn/ui
                  </p>
                </Content.Body>
              </Content>

              {/* Installation Instructions */}
              <Panel>
                <PanelHeader>
                  <PanelTitle className="text-lg">
                    Installation Instructions
                  </PanelTitle>
                </PanelHeader>
                <PanelContent className="space-y-2">
                  <P>Install the e-INFRA Design System package:</P>
                  <Code>npm install @e-infra/design-system</Code>
                  <Small className="block mt-2">
                    Then import components as shown in the "Copy Component"
                    dropdowns below each section.
                  </Small>
                </PanelContent>
              </Panel>

              <Separator />

              {/* Typography Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Typography
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "H1",
                        description: "Main page heading (4xl, bold)",
                        import: "import { H1 } from '@e-infra/design-system';",
                      },
                      {
                        name: "H2",
                        description: "Section heading (3xl, semibold)",
                        import: "import { H2 } from '@e-infra/design-system';",
                      },
                      {
                        name: "H3",
                        description: "Sub-heading (2xl, semibold)",
                        import: "import { H3 } from '@e-infra/design-system';",
                      },
                      {
                        name: "H4",
                        description: "Sub-section heading (xl, semibold)",
                        import: "import { H4 } from '@e-infra/design-system';",
                      },
                      {
                        name: "P",
                        description: "Standard body text paragraph",
                        import: "import { P } from '@e-infra/design-system';",
                      },
                      {
                        name: "Lead",
                        description: "Larger intro text for emphasis",
                        import:
                          "import { Lead } from '@e-infra/design-system';",
                      },
                      {
                        name: "Strong",
                        description: "Bold paragraph for emphasis",
                        import:
                          "import { Strong } from '@e-infra/design-system';",
                      },
                      {
                        name: "Small",
                        description: "Small text for captions",
                        import:
                          "import { Small } from '@e-infra/design-system';",
                      },
                      {
                        name: "Muted",
                        description: "Extra small muted text",
                        import:
                          "import { Muted } from '@e-infra/design-system';",
                      },
                      {
                        name: "Code",
                        description: "Inline code with monospace font",
                        import:
                          "import { Code } from '@e-infra/design-system';",
                      },
                      {
                        name: "Link",
                        description: "Standard link with underline",
                        import:
                          "import { Link } from '@e-infra/design-system';",
                      },
                      {
                        name: "Link",
                        import:
                          "import { Link } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>Text Hierarchy</PanelTitle>
                    <PanelDescription>
                      Standardized typography styles for consistent design
                    </PanelDescription>
                  </PanelHeader>
                  <PanelContent className="space-y-6">
                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Main Heading
                      </Muted>
                      <H1>The quick brown fox jumps</H1>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Section Heading (H2)
                      </Muted>
                      <H2>The quick brown fox jumps</H2>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Sub-heading (H3)
                      </Muted>
                      <H3>The quick brown fox jumps</H3>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Sub-section (H4)
                      </Muted>
                      <H4>The quick brown fox jumps</H4>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Body Text
                      </Muted>
                      <P>
                        The quick brown fox jumps over the lazy dog. This is
                        standard body text that should be used for most content.
                        It provides good readability and comfortable reading
                        experience.
                      </P>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Bold Paragraph
                      </Muted>
                      <Strong>
                        The quick brown fox jumps over the lazy dog. This is
                        emphasized body text for important information that
                        needs to stand out.
                      </Strong>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Small Text
                      </Muted>
                      <Small>
                        The quick brown fox jumps over the lazy dog. This is
                        smaller text used for captions, helper text, or
                        secondary information.
                      </Small>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Extra Small / Caption
                      </Muted>
                      <Muted>
                        The quick brown fox jumps over the lazy dog. Used for
                        timestamps, labels, and micro-copy.
                      </Muted>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">
                        Code / Monospace
                      </Muted>
                      <Code>const greeting = "Hello World";</Code>
                    </div>

                    <div className="space-y-2">
                      <Muted className="uppercase tracking-wider">Link</Muted>
                      <Link href="#">This is a standard link</Link>
                    </div>
                  </PanelContent>
                </Panel>
              </section>

              <Separator />

              {/* Alerts Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Alerts
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Alert",
                        import:
                          "import { Alert, AlertTitle, AlertDescription } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="success">
                    <CircleCheck className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your settings have been saved successfully.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <CircleAlert className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Your account will expire in 3 days. Please renew to
                      continue enjoying our services.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="error">
                    <CircleX className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              <Separator />

              {/* Buttons Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Buttons
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Button",
                        import:
                          "import { Button } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="error">Error</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </section>

              <Separator />

              {/* Cards Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Cards
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Card",
                        import:
                          "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content goes here.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Action</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        You have 3 unread messages.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">
                              2 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={progress} />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            setProgress(Math.min(100, progress + 10))
                          }
                        >
                          +10
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            setProgress(Math.max(0, progress - 10))
                          }
                        >
                          -10
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              {/* Form Elements Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Form Elements
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Input",
                        import:
                          "import { Input } from '@e-infra/design-system';",
                      },
                      {
                        name: "Label",
                        import:
                          "import { Label } from '@e-infra/design-system';",
                      },
                      {
                        name: "Textarea",
                        import:
                          "import { Textarea } from '@e-infra/design-system';",
                      },
                      {
                        name: "Select",
                        import:
                          "import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@e-infra/design-system';",
                      },
                      {
                        name: "Checkbox",
                        import:
                          "import { Checkbox } from '@e-infra/design-system';",
                      },
                      {
                        name: "RadioGroup",
                        import:
                          "import { RadioGroup, RadioGroupItem } from '@e-infra/design-system';",
                      },
                      {
                        name: "Switch",
                        import:
                          "import { Switch } from '@e-infra/design-system';",
                      },
                      {
                        name: "Slider",
                        import:
                          "import { Slider } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>Example Form</PanelTitle>
                    <PanelDescription>
                      All form components in one place
                    </PanelDescription>
                  </PanelHeader>
                  <PanelContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="text">Text Input</Label>
                        <Input id="text" type="text" placeholder="Enter text" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Input</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password Input</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="number">Number Input</Label>
                        <Input id="number" type="number" placeholder="0" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="disabled">Disabled Input</Label>
                        <Input id="disabled" disabled placeholder="Disabled" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="readonly">Readonly Input</Label>
                        <Input
                          id="readonly"
                          readOnly
                          defaultValue="Read only value"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Textarea</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message-large">Large Textarea</Label>
                      <Textarea
                        id="message-large"
                        placeholder="Type a longer message..."
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Select an option</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Notifications</Label>
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mentions" id="mentions" />
                          <Label htmlFor="mentions">Mentions only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" />
                          <Label htmlFor="none">None</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Volume</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </PanelContent>
                  <PanelFooter>
                    <Button>Submit</Button>
                  </PanelFooter>
                </Panel>
              </section>

              <Separator />

              {/* Badges & Avatars Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Badges & Avatars
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Badge",
                        import:
                          "import { Badge } from '@e-infra/design-system';",
                      },
                      {
                        name: "Avatar",
                        import:
                          "import { Avatar, AvatarImage, AvatarFallback } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Accordion Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Accordion
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Accordion",
                        import:
                          "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components' aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It's animated by default, but you can disable it if
                      you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <Separator />

              {/* Tabs Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Tabs
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Tabs",
                        import:
                          "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4">
                    <Panel>
                      <PanelHeader>
                        <PanelTitle>Account</PanelTitle>
                        <PanelDescription>
                          Make changes to your account here.
                        </PanelDescription>
                      </PanelHeader>
                      <PanelContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </PanelContent>
                    </Panel>
                  </TabsContent>
                  <TabsContent value="password">
                    <Panel>
                      <PanelHeader>
                        <PanelTitle>Password</PanelTitle>
                        <PanelDescription>
                          Change your password here.
                        </PanelDescription>
                      </PanelHeader>
                      <PanelContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="current">Current password</Label>
                          <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new">New password</Label>
                          <Input id="new" type="password" />
                        </div>
                      </PanelContent>
                    </Panel>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Panel>
                      <PanelHeader>
                        <PanelTitle>Settings</PanelTitle>
                        <PanelDescription>Manage your settings.</PanelDescription>
                      </PanelHeader>
                      <PanelContent>
                        <p className="text-sm text-muted-foreground">
                          Settings content goes here.
                        </p>
                      </PanelContent>
                    </Panel>
                  </TabsContent>
                </Tabs>
              </section>

              <Separator />

              {/* Collapsible Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Collapsible
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Collapsible",
                        import:
                          "import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Collapsible>
                  <Panel>
                    <PanelHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <PanelTitle>@peduarte starred 3 repositories</PanelTitle>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </PanelHeader>
                    <CollapsibleContent>
                      <PanelContent className="space-y-2">
                        <div className="rounded-md border px-4 py-2 font-mono text-sm">
                          @radix-ui/primitives
                        </div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm">
                          @radix-ui/colors
                        </div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm">
                          @stitches/react
                        </div>
                      </PanelContent>
                    </CollapsibleContent>
                  </Panel>
                </Collapsible>
              </section>

              <Separator />

              {/* Breadcrumb Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Breadcrumb
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Breadcrumb",
                        import:
                          "import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <NavLink to="/">
                        <BreadcrumbLink>Home</BreadcrumbLink>
                      </NavLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <NavLink to="/components">
                        <BreadcrumbLink>Components</BreadcrumbLink>
                      </NavLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </section>

              <Separator />

              {/* Calendar Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Calendar
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Calendar",
                        import:
                          "import { Calendar } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel className="w-fit">
                  <PanelContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </PanelContent>
                </Panel>
              </section>

              <Separator />

              {/* Carousel Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Carousel
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Carousel",
                        import:
                          "import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <Panel>
                          <PanelContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              {index + 1}
                            </span>
                          </PanelContent>
                        </Panel>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>

              <Separator />

              {/* Toggle & Toggle Group Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Toggle & Toggle Group
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Toggle",
                        import:
                          "import { Toggle } from '@e-infra/design-system';",
                      },
                      {
                        name: "ToggleGroup",
                        import:
                          "import { ToggleGroup, ToggleGroupItem } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Toggle aria-label="Toggle italic">
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </Toggle>
                  </div>
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                    >
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </section>

              <Separator />

              {/* Tooltip Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Tooltip
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Tooltip",
                        import:
                          "import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </section>

              <Separator />

              {/* Skeleton Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Skeleton
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Skeleton",
                        import:
                          "import { Skeleton } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-3/4" />
                </div>
              </section>

              <Separator />

              {/* Table Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Tables
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "Table",
                        import:
                          "import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <Panel>
                  <PanelHeader>
                    <PanelTitle>Data Table</PanelTitle>
                    <PanelDescription>
                      Example of a table component with various data types
                    </PanelDescription>
                  </PanelHeader>
                  <PanelContent>
                    <Table>
                      <TableCaption>A list of recent transactions</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>
                            <Badge>Paid</Badge>
                          </TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV002</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Pending</Badge>
                          </TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV003</TableCell>
                          <TableCell>
                            <Badge>Paid</Badge>
                          </TableCell>
                          <TableCell>Bank Transfer</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV004</TableCell>
                          <TableCell>
                            <Badge variant="error">Failed</Badge>
                          </TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV005</TableCell>
                          <TableCell>
                            <Badge>Paid</Badge>
                          </TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$550.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </PanelContent>
                </Panel>
              </section>

              <Separator />

              {/* Dialogs Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Dialogs
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "AlertDialog",
                        import:
                          "import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Show Alert Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </section>

              <Separator />

              {/* AspectRatio Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Aspect Ratio
                  </h2>
                  <ComponentCopySelect
                    components={[
                      {
                        name: "AspectRatio",
                        import:
                          "import { AspectRatio } from '@e-infra/design-system';",
                      },
                    ]}
                  />
                </div>
                <div className="w-full max-w-md">
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted rounded-md overflow-hidden"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                      alt="Photo by Drew Beamer"
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </section>

              <div className="pb-12" />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
