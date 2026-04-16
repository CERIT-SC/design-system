"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Alert,
    AlertDescription,
    AlertTitle,
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
    CardHeader,
    CardTitle,
    Checkbox,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Content,
    CookiesBanner,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Footer,
    Header,
    HeaderCenter,
    HeaderContent,
    HeaderLeft,
    HeaderRight,
    H1,
    H2,
    Input,
    Label,
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
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
    SidebarHeader,
    Skeleton,
    Slider,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    P,
    Small,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../lib/components/index";
import { Info } from "lucide-react";
import type { NavSection } from "../../lib/docs-nav";
import { ComponentOverviewCard } from "./ComponentOverviewCard";

interface ComponentsOverviewGridProps {
    sections: NavSection[];
}

const SECTION_COPY: Record<string, string> = {
    primitives: "Base building blocks used throughout the design system.",
    compounds: "Higher-level composed components ready for product flows.",
    layout: "Page structure components for consistent application layouts.",
};

const ITEM_DESCRIPTIONS: Record<string, string> = {
    accordion: "Expandable content blocks for grouped information.",
    alert: "Status and contextual messaging.",
    avatar: "User profile image and initials.",
    badge: "Compact status and category labels.",
    breadcrumb: "Hierarchical navigation paths.",
    button: "Primary and secondary action controls.",
    calendar: "Date selection and calendar display.",
    card: "Structured content containers.",
    checkbox: "Binary and multi-select controls.",
    collapsible: "Toggle visibility of optional details.",
    dialog: "Modal overlays and focused workflows.",
    dropdown: "Compact menus for grouped actions.",
    form: "Validated input and submission scaffolding.",
    input: "Single-line text entry.",
    label: "Semantic labels for form fields.",
    menubar: "Desktop-style top command menus.",
    "navigation-menu": "Multi-level site/application navigation.",
    pagination: "Paged content navigation controls.",
    progress: "Task and operation progress indication.",
    "radio-group": "Exclusive single-choice selection.",
    select: "Combobox-style selection control.",
    separator: "Visual dividers for related content.",
    skeleton: "Loading placeholders for async content.",
    slider: "Range input for numeric values.",
    switch: "On/off state toggles.",
    table: "Tabular data presentation.",
    tabs: "Segmented content switching.",
    textarea: "Multi-line text input.",
    tooltip: "Contextual helper text overlays.",
    "cookies-banner": "Cookie consent messaging and actions.",
    "feedback-form": "Floating feedback collection workflow.",
    content: "Main docs/body content composition.",
    footer: "Structured page footer with links and contacts.",
    header: "Top app bar and global navigation area.",
    sidebar: "Vertical navigation and grouped links.",
};

const ZOOM_BY_SLUG: Record<string, number> = {
    avatar: 0.9,
    badge: 0.9,
    breadcrumb: 0.88,
    button: 0.92,
    checkbox: 0.9,
    calendar: 0.7,
    input: 0.9,
    label: 0.9,
    pagination: 0.86,
    progress: 0.9,
    "radio-group": 0.9,
    select: 0.9,
    separator: 0.9,
    slider: 0.92,
    switch: 0.92,
    tooltip: 0.9,
    "cookies-banner": 0.5,
    footer: 0.45,
};

function renderPreviewBySlug(slug: string): React.ReactNode {
    switch (slug) {
        case "accordion":
            return (
                <Accordion type="single" collapsible className="w-full max-w-xl">
                    <AccordionItem value="a">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It follows WAI-ARIA authoring practices.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        case "alert":
            return (
                <Alert className="max-w-xl">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                        This preview demonstrates alert structure and spacing.
                    </AlertDescription>
                </Alert>
            );
        case "avatar":
            return (
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            );
        case "badge":
            return (
                <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            );
        case "breadcrumb":
            return (
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Primitives</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Button</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            );
        case "button":
            return (
                <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            );
        case "calendar":
            return <Calendar mode="single" selected={new Date()} className="rounded-md border" />;
        case "card":
            return (
                <Card variant={"secondary"} className="max-w-sm">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Short supporting description.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <P className="text-sm">Card content preview</P>
                    </CardContent>
                </Card>
            );
        case "checkbox":
            return (
                <div className="flex items-center gap-2">
                    <Checkbox id="terms-preview" defaultChecked />
                    <Label htmlFor="terms-preview">Accept terms and conditions</Label>
                </div>
            );
        case "collapsible":
            return (
                <Collapsible defaultOpen className="w-full max-w-xl rounded-md border border-border p-3">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                            Toggle details
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 text-sm text-text">
                        Additional context can be expanded or collapsed.
                    </CollapsibleContent>
                </Collapsible>
            );
        case "dialog":
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>Update your information here.</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
        case "dropdown":
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        case "form":
            return (
                <form className="w-full max-w-sm space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="form-email-preview">Email</Label>
                        <Input id="form-email-preview" placeholder="name@example.com" />
                    </div>
                    <Button size="sm">Submit</Button>
                </form>
            );
        case "input":
            return <Input className="max-w-sm" placeholder="Type your input here" />;
        case "label":
            return (
                <div className="space-y-1.5">
                    <Label htmlFor="label-preview">Project name</Label>
                    <Input id="label-preview" className="max-w-sm" defaultValue="Design System" />
                </div>
            );
        case "menubar":
            return (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New Tab</MenubarItem>
                            <MenubarItem>Open</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Undo</MenubarItem>
                            <MenubarItem>Redo</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            );
        case "navigation-menu":
            return (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className="block p-3 text-sm">
                                    Browse all primitives and compounds.
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            );
        case "pagination":
            return (
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background p-2">
                    <Button size="sm" variant="ghost">
                        Prev
                    </Button>
                    <Button size="sm">1</Button>
                    <Button size="sm" variant="secondary">
                        2
                    </Button>
                    <Small className="px-1 text-sm text-text">...</Small>
                    <Button size="sm" variant="ghost">
                        Next
                    </Button>
                </div>
            );
        case "progress":
            return <Progress value={66} className="max-w-sm" />;
        case "radio-group":
            return (
                <RadioGroup defaultValue="comfortable" className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r-default" />
                        <Label htmlFor="r-default">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r-comfortable" />
                        <Label htmlFor="r-comfortable">Comfortable</Label>
                    </div>
                </RadioGroup>
            );
        case "select":
            return (
                <Select defaultValue="system">
                    <SelectTrigger className="w-55">
                        <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            );
        case "separator":
            return (
                <div className="w-full max-w-md space-y-2">
                    <div className="text-sm font-medium text-text-heading">Section A</div>
                    <Separator />
                    <div className="text-sm text-text">Section B</div>
                </div>
            );
        case "skeleton":
            return (
                <div className="w-full max-w-sm space-y-2">
                    <Skeleton className="h-4 w-45" />
                    <Skeleton className="h-4 w-60" />
                    <Skeleton className="h-24 w-full" />
                </div>
            );
        case "slider":
            return <Slider defaultValue={[55]} max={100} step={1} className="w-55" />;
        case "switch":
            return (
                <div className="flex items-center gap-2">
                    <Switch id="switch-preview" defaultChecked />
                    <Label htmlFor="switch-preview">Enable notifications</Label>
                </div>
            );
        case "table":
            return (
                <Table className="w-full max-w-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Design Tokens</TableCell>
                            <TableCell>Ready</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Documentation</TableCell>
                            <TableCell>In Review</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        case "tabs":
            return (
                <Tabs defaultValue="account" className="w-full max-w-md">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="text-sm text-text">
                        Manage account settings.
                    </TabsContent>
                    <TabsContent value="password" className="text-sm text-text">
                        Update your password.
                    </TabsContent>
                </Tabs>
            );
        case "textarea":
            return <Textarea className="max-w-md" placeholder="Write your feedback..." />;
        case "tooltip":
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <Small className="text-sm">Tooltip preview</Small>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        case "cookies-banner":
            return (
                <div
                    className="overflow-hidden rounded-md border border-border"
                    style={{ width: "960px" }}
                >
                    <CookiesBanner
                        className="static inset-auto z-0 border-0 shadow-none"
                        message={
                            <>
                                <strong>We use cookies</strong> to improve your experience.
                            </>
                        }
                        learnMoreLink={null}
                    />
                </div>
            );
        case "feedback-form":
            return (
                <div className="w-full max-w-md space-y-3 rounded-md border border-border bg-background p-4">
                    <P className="text-sm font-semibold text-text-heading">
                        Leave us feedback
                    </P>
                    <Textarea rows={3} defaultValue="Great component library, thank you!" />
                    <div className="flex justify-end">
                        <Button size="sm">Submit Feedback</Button>
                    </div>
                </div>
            );
        case "content":
            return (
                <div className="w-full max-w-xl rounded-md border border-border bg-background">
                    <Content className="space-y-3 py-4">
                        <Content.Subheading>Overview</Content.Subheading>
                        <Content.Body>
                            <P className="text-sm text-text">
                                Structured typography and spacing for docs content.
                            </P>
                        </Content.Body>
                    </Content>
                </div>
            );
        case "footer":
            return (
                <div
                    className="overflow-hidden rounded-md border border-border bg-background"
                    style={{ width: "1120px" }}
                >
                    <Footer tag="preview" />
                </div>
            );
        case "header":
            return (
                <div className="w-full overflow-hidden rounded-md border border-border bg-background">
                    <Header className="static h-14 backdrop-blur-none">
                        <HeaderContent container={false} className="h-14 px-3">
                            <HeaderLeft className="text-sm font-semibold">Brand</HeaderLeft>
                            <HeaderCenter className="text-xs text-text">Center</HeaderCenter>
                            <HeaderRight>
                                <Button size="sm" variant="outline">
                                    Login
                                </Button>
                            </HeaderRight>
                        </HeaderContent>
                    </Header>
                </div>
            );
        case "sidebar":
            return (
                <div className="h-56 w-full overflow-hidden rounded-md border border-border bg-background">
                    <Sidebar className="static top-auto h-full w-56 border-r border-border p-3">
                        <SidebarHeader className="p-2">
                            <P className="text-sm font-semibold">Navigation</P>
                        </SidebarHeader>
                        <SidebarContent className="px-2 py-2 text-sm text-text">
                            <P className="py-1 text-sm">Getting Started</P>
                            <P className="py-1 text-sm">Primitives</P>
                            <P className="py-1 text-sm">Compounds</P>
                        </SidebarContent>
                    </Sidebar>
                </div>
            );
        default:
            return (
                <div className="rounded-md border border-dashed border-border bg-background p-6 text-sm text-text">
                    Preview is available on the component detail page.
                </div>
            );
    }
}

export function ComponentsOverviewGrid({ sections }: ComponentsOverviewGridProps) {
    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <H1 className="text-6xl text-text-heading">
                    Components Overview
                </H1>
                <P className="max-w-3xl text-base leading-7 text-text">
                    Browse all component categories. Each tile contains a live preview in a
                    zoomed-out viewport and links directly to full documentation.
                </P>
            </header>

            {sections.map((section) => (
                <section key={section.slug} className="space-y-4" aria-labelledby={`section-${section.slug}`}>
                    <div className="space-y-1">
                        <H2
                            id={`section-${section.slug}`}
                            className="text-2xl font-semibold tracking-tight text-text-heading"
                        >
                            {section.title}
                        </H2>
                        <Small className="text-sm text-text">
                            {SECTION_COPY[section.slug] ?? "Component documentation section."}
                        </Small>
                    </div>

                    <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2 5xl:grid-cols-3">
                        {section.items.map((item) => (
                            <ComponentOverviewCard
                                key={item.path}
                                title={item.title}
                                href={item.path}
                                description={ITEM_DESCRIPTIONS[item.slug]}
                                zoom={ZOOM_BY_SLUG[item.slug]}
                            >
                                {renderPreviewBySlug(item.slug)}
                            </ComponentOverviewCard>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ComponentsOverviewGrid;