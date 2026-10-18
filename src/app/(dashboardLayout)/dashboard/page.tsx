import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/40 border border-border p-4 flex flex-col justify-between">
          <span className="text-sm text-muted-foreground">Total Blogs</span>
          <span className="text-2xl font-bold">128</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/40 border border-border p-4 flex flex-col justify-between">
          <span className="text-sm text-muted-foreground">Total Views</span>
          <span className="text-2xl font-bold">24.5k</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/40 border border-border p-4 flex flex-col justify-between">
          <span className="text-sm text-muted-foreground">Subscribers</span>
          <span className="text-2xl font-bold">1,420</span>
        </div>
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/40 border border-border p-6">
        <h2 className="text-lg font-semibold mb-1">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back to Okshor Admin Dashboard.
        </p>
      </div>
    </div>
  );
}

