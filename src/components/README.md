# Components

This directory contains reusable React components for the Muditya portfolio application, built with **shadcn/ui** for a modern, accessible design system.

## Structure

```
src/components/
├── ui/                    # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── separator.tsx
│   └── dropdown-menu.tsx
├── Navbar.tsx             # Main navigation component
├── Footer.tsx             # Footer component
├── ThemeProvider.tsx      # Theme context provider
├── ThemeToggle.tsx        # Theme switching component
├── index.ts              # Component exports
└── README.md             # This file
```

## Components

### Navbar
- **File**: `Navbar.tsx`
- **Type**: Client Component (uses `'use client'`)
- **Features**:
  - Responsive design with mobile hamburger menu
  - Fixed positioning with backdrop blur
  - Navigation links with smooth scrolling
  - Social media links
  - Theme toggle integration
  - Dark mode support
  - Accessibility features (ARIA labels)
  - shadcn/ui Button components

### Footer
- **File**: `Footer.tsx`
- **Type**: Server Component
- **Features**:
  - Multi-column layout
  - Quick links and resources sections
  - Social media links
  - Copyright information
  - Responsive design
  - Dark mode support
  - shadcn/ui Button and Separator components

### ThemeProvider
- **File**: `ThemeProvider.tsx`
- **Type**: Client Component
- **Features**:
  - Theme context management
  - System theme detection
  - Local storage persistence
  - TypeScript support
  - SSR safe

### ThemeToggle
- **File**: `ThemeToggle.tsx`
- **Type**: Client Component
- **Features**:
  - Dropdown menu for theme selection
  - Light/Dark/System theme options
  - Animated icons
  - shadcn/ui DropdownMenu components

## shadcn/ui Components

The following shadcn/ui components are available:

- **Button**: Various button variants and sizes
- **Card**: Content containers with header, content, and footer
- **Badge**: Small status indicators
- **Avatar**: User profile images with fallbacks
- **Separator**: Visual dividers
- **DropdownMenu**: Contextual menus

## Usage

Import components using the index file:

```tsx
import { Navbar, Footer, Button, Card, ThemeToggle } from "@/components";
```

Or import individually:

```tsx
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
```

## Theme System

The application uses a comprehensive theme system:

1. **ThemeProvider**: Wraps the entire app in `layout.tsx`
2. **ThemeToggle**: Available in the navbar for easy switching
3. **CSS Variables**: Automatic theme switching with CSS custom properties
4. **System Detection**: Automatically detects user's system preference

### Theme Options
- **Light**: Bright theme
- **Dark**: Dark theme
- **System**: Follows system preference

## Customization

### Navbar
- Update `navItems` array to modify navigation links
- Update `socialLinks` array to change social media links
- Modify styling by updating Tailwind classes

### Footer
- Update `footerLinks` object to modify links and sections
- Change email address in social links
- Update copyright text and branding

### Theme
- Modify CSS variables in `globals.css`
- Update theme colors in the shadcn/ui configuration
- Customize theme toggle behavior

## Dependencies

- **Next.js**: For Link components and routing
- **shadcn/ui**: Component library and design system
- **Lucide React**: For icons
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety
- **class-variance-authority**: For component variants
- **clsx & tailwind-merge**: For class name utilities

## Best Practices

1. **TypeScript**: All components are fully typed
2. **Accessibility**: Proper ARIA labels and semantic HTML
3. **Responsive**: Mobile-first design approach
4. **Performance**: Optimized with Next.js best practices
5. **Maintainability**: Clean, modular code structure
6. **Theme Support**: Full dark/light mode support
7. **Component Composition**: Reusable, composable components

## shadcn/ui Benefits

- **Consistent Design**: Unified design system across components
- **Accessibility**: Built-in accessibility features
- **TypeScript**: Full type safety
- **Customizable**: Easy to customize and extend
- **Performance**: Optimized for production
- **Modern**: Uses latest React patterns and best practices 