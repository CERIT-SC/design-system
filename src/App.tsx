import "./globals.css";
import { useState } from "react";
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
} from "../lib";
import {
  Terminal,
  Info,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Home,
  Settings,
  User,
  FileText,
} from "lucide-react";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(33);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            e-INFRA Design System
          </h1>
          <p className="text-muted-foreground">
            Component showcase for the e-INFRA Design System built with
            shadcn/ui
          </p>
        </div>

        <Separator />

        {/* Typography Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
          <Card>
            <CardHeader>
              <CardTitle>Text Hierarchy</CardTitle>
              <CardDescription>
                Standardized typography styles for consistent design
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Main Heading
                </p>
                <h1 className="text-4xl font-bold tracking-tight">
                  The quick brown fox jumps
                </h1>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Section Heading (H2)
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  The quick brown fox jumps
                </h2>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Sub-heading (H3)
                </p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  The quick brown fox jumps
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Sub-section (H4)
                </p>
                <h4 className="text-xl font-semibold">
                  The quick brown fox jumps
                </h4>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Body Text
                </p>
                <p className="text-base leading-7">
                  The quick brown fox jumps over the lazy dog. This is standard
                  body text that should be used for most content. It provides
                  good readability and comfortable reading experience.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Bold Paragraph
                </p>
                <p className="text-base font-semibold leading-7">
                  The quick brown fox jumps over the lazy dog. This is
                  emphasized body text for important information that needs to
                  stand out.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Small Text
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  The quick brown fox jumps over the lazy dog. This is smaller
                  text used for captions, helper text, or secondary information.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Extra Small / Caption
                </p>
                <p className="text-xs text-muted-foreground leading-5">
                  The quick brown fox jumps over the lazy dog. Used for
                  timestamps, labels, and micro-copy.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Code / Monospace
                </p>
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  const greeting = "Hello World";
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Link
                </p>
                <a
                  href="#"
                  className="text-primary underline hover:no-underline"
                >
                  This is a standard link
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
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
          <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
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
          <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
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
                <CardDescription>You have 3 unread messages.</CardDescription>
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
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
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
          <h2 className="text-2xl font-semibold tracking-tight">
            Form Elements
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Example Form</CardTitle>
              <CardDescription>
                All form components in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  <Input id="password" type="password" placeholder="••••••••" />
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
                <Textarea id="message" placeholder="Type your message here." />
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
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </section>

        <Separator />

        {/* Badges & Avatars Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Badges & Avatars
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
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
          <h2 className="text-2xl font-semibold tracking-tight">Accordion</h2>
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
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Tabs</h2>
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Manage your settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Settings content goes here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Collapsible Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Collapsible</h2>
          <Collapsible>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>@peduarte starred 3 repositories</CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @radix-ui/primitives
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @stitches/react
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </section>

        <Separator />

        {/* Breadcrumb Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Breadcrumb</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
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
          <h2 className="text-2xl font-semibold tracking-tight">Calendar</h2>
          <Card className="w-fit">
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Carousel Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Carousel</h2>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
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
          <h2 className="text-2xl font-semibold tracking-tight">
            Toggle & Toggle Group
          </h2>
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
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </section>

        <Separator />

        {/* Tooltip Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Tooltip</h2>
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
          <h2 className="text-2xl font-semibold tracking-tight">Skeleton</h2>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        </section>

        <Separator />

        {/* Table Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Tables</h2>
          <Card>
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>
                Example of a table component with various data types
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      <Badge variant="destructive">Failed</Badge>
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
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Sidebar Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Sidebar</h2>
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Navigation</CardTitle>
              <CardDescription>
                Collapsible sidebar component for navigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SidebarProvider>
                <div className="flex min-h-[400px] w-full rounded-lg border">
                  <Sidebar>
                    <SidebarHeader>
                      <div className="flex items-center gap-2 px-4 py-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Terminal className="h-4 w-4" />
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
                              <SidebarMenuButton>
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <FileText className="h-4 w-4" />
                                <span>Documents</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
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
                  <div className="flex flex-1 flex-col">
                    <header className="flex h-14 items-center gap-4 border-b px-6">
                      <SidebarTrigger />
                      <h3 className="font-semibold">Main Content Area</h3>
                    </header>
                    <main className="flex-1 p-6">
                      <p className="text-muted-foreground">
                        This is the main content area. Click the hamburger menu
                        to toggle the sidebar.
                      </p>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Dialogs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Dialogs</h2>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Show Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
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
          <h2 className="text-2xl font-semibold tracking-tight">
            Aspect Ratio
          </h2>
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
  );
}

export default App;
