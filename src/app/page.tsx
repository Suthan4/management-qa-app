"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/layout/gradientBackground";
import {
  ChevronRight,
  FileText,
  Database,
  MessageSquare,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <GradientBackground />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-20 lg:pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 tracking-tight">
                Intelligent Document Management & AI Q&A
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Unlock insights from your documents with our powerful document
                management system and AI-powered question answering platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive set of tools to manage,
                analyze, and extract insights from your documents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Document Management
                </h3>
                <p className="text-muted-foreground">
                  Upload, organize, and manage your documents with ease. Support
                  for multiple file formats and intelligent tagging system.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Ingestion</h3>
                <p className="text-muted-foreground">
                  Our system intelligently processes your documents, extracting
                  key information and preparing them for AI-powered analysis.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card rounded-lg p-8 shadow-sm border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Q&A Interface</h3>
                <p className="text-muted-foreground">
                  Ask questions in natural language and receive accurate answers
                  based on the content of your documents with source references.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-10 border shadow-sm text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already leveraging our platform
                to gain insights from their documents.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Create an Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/documents">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">DocuAI</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DocuAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
