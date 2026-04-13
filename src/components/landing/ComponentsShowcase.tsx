"use client";

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
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from "../../../lib/components/primitives/panel";

import { Info, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar } from "../../../lib/components/primitives/avatar";
import {
  AvatarImage,
  AvatarFallback,
} from "../../../lib/components/primitives/avatar";

export function ComponentsShowcase() {
  return (
    <section id="components" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide mb-2">
              Component Library
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-heading">
              Modular Building Blocks
            </h3>
          </div>
          <div className="flex gap-2">
            <Link href={"/components-overview"}>
              <Button variant="default" size="sm">
                <ArrowRight className="w-4 h-4" />
                All Components
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons */}
          <Panel>
            <PanelHeader>
              <PanelTitle>Buttons</PanelTitle>
              <PanelDescription>8 variants</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2">
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
            </PanelContent>
          </Panel>

          {/* Form Elements */}
          <Panel>
            <PanelHeader>
              <PanelTitle>Form Elements</PanelTitle>
              <PanelDescription>10 variants</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2">
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
                  <Label
                    htmlFor="subscribe"
                    className="text-xs text-text-muted"
                  >
                    Subscribe to newsletter
                  </Label>
                </div>
              </div>
            </PanelContent>
          </Panel>

          {/* Data Display */}

          <Panel>
            <PanelHeader>
              <PanelTitle>Data Display</PanelTitle>
              <PanelDescription>12 variants</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2">
              <div className="space-x-3 ">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="flex mt-4 space-x-3">
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
            </PanelContent>
          </Panel>

          {/* Navigation */}
          <Panel>
            <PanelHeader>
              <PanelTitle>Navigation</PanelTitle>
              <PanelDescription>5 variants</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2">
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

              <Tabs defaultValue="overview" className="w-full mt-4">
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
            </PanelContent>
          </Panel>

          {/* Feedback / Alerts */}
          <Panel>
            <PanelHeader>
              <PanelTitle>Feedback & Alerts</PanelTitle>
              <PanelDescription>4 variants</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2 space-y-3">
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
            </PanelContent>
          </Panel>

          {/* Data Tables */}
          <Panel>
            <PanelHeader>
              <PanelTitle>Data Tables</PanelTitle>
              <PanelDescription>1 variant</PanelDescription>
            </PanelHeader>
            <PanelContent className="bg-surface-raised p-4 rounded-lg mt-2">
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
            </PanelContent>
          </Panel>
        </div>
      </div>
    </section>
  );
}
