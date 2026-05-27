import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardIcon,
} from "../../../lib/components/primitives/card";
import { Button } from "../../../lib/components/primitives/button";
import { Badge } from "../../../lib/components/primitives/badge";
import { Input } from "../../../lib/components/primitives/input";
import { Label } from "../../../lib/components/primitives/label";
import { Checkbox } from "../../../lib/components/primitives/checkbox";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../../lib/components/primitives/alert";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../../../lib/components/primitives/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../lib/components/primitives/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../lib/components/primitives/breadcrumb";
import { Avatar } from "../../../lib/components/primitives/avatar";
import {
  AvatarImage,
  AvatarFallback,
} from "../../../lib/components/primitives/avatar";
import { H1, P } from "../../../lib/components/foundations/typography";

import {
  SquareMousePointer,
  FormInput,
  LayoutGrid,
  Navigation,
  AlertCircle,
  Table as TableIcon,
  Component,
  ChevronRight,
  Info,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ComponentsOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col mb-12 gap-4">
          <H1 className="text-text-heading">Components</H1>
          <P className="max-w-3xl">
            30+ ready-to-use components. Every component ships with
            comprehensive documentation, different variants, storybooks, and
            customization support. Built with React and Tailwind CSS.
          </P>
        </div>

        <div className="flex gap-2">
          <Link href={"/docs/components"} className="ml-auto">
            <Button variant="default" size="sm">
              <Component className="w-4 h-4" />
              Full Components Overview
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardIcon>
              <SquareMousePointer className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>8 variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1">
                  Primary
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  Secondary
                </Button>
                <Button variant="tertiary" size="sm" className="flex-1">
                  Tertiary
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Outline
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Ghost
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardIcon>
              <FormInput className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>10 variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="text-xs font-medium text-text-muted"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="subscribe" />
                <Label htmlFor="subscribe" className="text-xs text-text-muted">
                  Subscribe to newsletter
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Display */}
        <Card>
          <CardHeader>
            <CardIcon>
              <LayoutGrid className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Data Display</CardTitle>
            <CardDescription>12 variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <CardIcon>
              <Navigation className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>5 variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-3 h-3 text-text-muted" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-3 h-3 text-text-muted" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Project A</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-surface rounded-md p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary text-sm text-text-muted data-[state=active]:text-primary-foreground rounded-md px-3 py-1"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-primary text-sm text-text-muted data-[state=active]:text-primary-foreground rounded-md px-3 py-1"
                >
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4">
                Project overview content goes here.
              </TabsContent>
              <TabsContent value="details" className="p-4">
                Project details content goes here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Feedback / Alerts */}
        <Card>
          <CardHeader>
            <CardIcon>
              <AlertCircle className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Feedback & Alerts</CardTitle>
            <CardDescription>4 variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="default">
              <Info className="w-4 h-4 text-info" />
              <div>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="success">
              <CheckCircle className="w-4 h-4 text-success" />
              <div>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your operation was successful!
                </AlertDescription>
              </div>
            </Alert>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <Card>
          <CardHeader>
            <CardIcon>
              <TableIcon className="w-8 h-8 text-primary" />
            </CardIcon>
            <CardTitle>Data Tables</CardTitle>
            <CardDescription>1 variant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emily Johnson</TableCell>
                  <TableCell>emily.johnson@example.com</TableCell>
                  <TableCell>Inactive</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
