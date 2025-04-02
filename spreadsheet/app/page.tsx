"use client";

import Document from "@/components/document";
import Sidebar from "@/components/sidebar";
import SuspenseWrapper from "@/components/SuspenseWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import Toolbar from "@/components/toolbar";
import VeltCollaboration from "@/components/velt/VeltCollaboration";
import { VeltProvider } from "@veltdev/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
interface MissionData {
  id: number;
  mission: string;
  destination: string;
  missionType: "Manned" | "Unmanned";
}

export default function SpreadsheetApp() {
  const searchParams = useSearchParams();
  const focused = ( searchParams.get("focused")||"true" )  === "true";
  console.log(focused);
  return (
    // [VELT] Initialize the Velt provider
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY || ""}>
      {/* [VELT] Initialize the Velt collaboration */}
      <VeltCollaboration />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex h-screen w-full flex-col overflow-y-hidden">
          <div className="flex h-screen">
            <SuspenseWrapper>

            <Sidebar focused={focused} />
            <div className="flex-1 flex flex-col">
              <Toolbar />
              <Document />
            </div>
            </SuspenseWrapper>
          </div>
        </div>
      </ThemeProvider>
    </VeltProvider>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${active
        ? "bg-muted font-medium"
        : "text-muted-foreground hover:bg-muted/50"
        }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
