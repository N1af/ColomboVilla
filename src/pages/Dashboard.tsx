import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertCircle,
  CalendarDays,
} from "lucide-react";

export default function Dashboard() {
  // Mock data - will be replaced with real data from backend
  const todayBookings = [
    { id: 1, guest: "John Smith", villa: "Villa A", room: "101", checkIn: "2:00 PM", status: "booked" as const },
    { id: 2, guest: "Sarah Johnson", villa: "Villa B", room: "205", checkIn: "3:30 PM", status: "booked" as const },
  ];

  const pendingTasks = [
    { id: 1, task: "Room 103 cleaning", villa: "Villa A", priority: "high" },
    { id: 2, task: "Low towel stock", villa: "Villa B", priority: "medium" },
    { id: 3, task: "Grocery restock needed", villa: "Villa A", priority: "high" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Business Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening across your properties today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Today's Bookings"
          value="8"
          icon={CalendarDays}
          trend={{ value: "12%", isPositive: true }}
        />
        <MetricCard
          title="Occupancy Rate"
          value="78%"
          icon={Building2}
          description="16 of 20 rooms"
        />
        <MetricCard
          title="Shop Sales Today"
          value="Rs 15,240"
          icon={ShoppingCart}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          title="Total Revenue"
          value="Rs 1,24,500"
          icon={DollarSign}
          description="This month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Check-ins */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>Today's Check-ins</h3>
            <Button size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {todayBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{booking.guest}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.villa} - Room {booking.room}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={booking.status}>
                    {booking.checkIn}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks & Alerts */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>Pending Tasks</h3>
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full ${
                    task.priority === "high" ? "bg-destructive" : "bg-warning"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium">{task.task}</p>
                  <p className="text-sm text-muted-foreground">{task.villa}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="mb-4">Monthly Performance</h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Villa Revenue</span>
            </div>
            <p className="text-2xl font-bold">Rs 89,500</p>
            <p className="text-sm text-success">+15% from last month</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Shop Revenue</span>
            </div>
            <p className="text-2xl font-bold">Rs 35,000</p>
            <p className="text-sm text-success">+8% from last month</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">Total Guests</span>
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-success">+22 from last month</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
