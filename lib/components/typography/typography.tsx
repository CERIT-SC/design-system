import * as React from "react";
import { cn } from "@/lib/utils";

// H1 - Main Heading
export function H1({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn("text-4xl font-bold tracking-tight", className)}
            {...props}
        />
    );
}

// H2 - Section Heading
export function H2({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn("text-3xl font-semibold tracking-tight", className)}
            {...props}
        />
    );
}

// H3 - Sub-heading
export function H3({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-2xl font-semibold tracking-tight", className)}
            {...props}
        />
    );
}

// H4 - Sub-section
export function H4({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4 className={cn("text-xl font-semibold", className)} {...props} />
    );
}

// P - Body Text
export function P({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn("text-base leading-7", className)} {...props} />;
}

// Lead - Larger body text for introductions
export function Lead({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-lg leading-8 text-muted-foreground", className)}
            {...props}
        />
    );
}

// Strong - Bold Paragraph
export function Strong({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-base font-semibold leading-7", className)} {...props} />
    );
}

// Small - Small Text
export function Small({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-muted-foreground leading-6", className)}
            {...props}
        />
    );
}

// Muted - Extra Small / Caption
export function Muted({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-xs text-muted-foreground leading-5", className)}
            {...props}
        />
    );
}

// Code - Inline Code
export function Code({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <code
            className={cn(
                "text-sm font-mono bg-muted px-2 py-1 rounded",
                className
            )}
            {...props}
        />
    );
}

// Link - Standard Link
export function Link({
    className,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            className={cn("text-primary underline hover:no-underline", className)}
            {...props}
        />
    );
}

// Blockquote
export function Blockquote({
    className,
    ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote
            className={cn("border-l-4 border-primary pl-4 italic", className)}
            {...props}
        />
    );
}

// List
export function List({
    className,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return <ul className={cn("list-disc list-inside space-y-2", className)} {...props} />;
}

// Ordered List
export function OrderedList({
    className,
    ...props
}: React.HTMLAttributes<HTMLOListElement>) {
    return (
        <ol className={cn("list-decimal list-inside space-y-2", className)} {...props} />
    );
}
