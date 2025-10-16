import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Filter } from "lucide-react";

export default function VillaManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data
  const bookings = [
    {
      id: 1,
      guestName: "John Smith",
      villa: "Villa A",
      room: "101",
      checkIn: "2025-10-15",
      checkOut: "2025-10-18",
      status: "booked" as const,
      guests: 2,
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      villa: "Villa B",
      room: "205",
      checkIn: "2025-10-16",
      checkOut: "2025-10-20",
      status: "booked" as const,
      guests: 3,
    },
    {
      id: 3,
      guestName: "Available",
      villa: "Villa A",
      room: "102",
      checkIn: "-",
      checkOut: "-",
      status: "available" as const,
      guests: 0,
    },
    {
      id: 4,
      guestName: "Maintenance",
      villa: "Villa A",
      room: "103",
      checkIn: "-",
      checkOut: "-",
      status: "maintenance" as const,
      guests: 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Villa Management</h1>
          <p className="text-muted-foreground">
            Manage bookings, room status, and inventory
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by guest name, room number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Villa</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-medium">{booking.guestName}</td>
                  <td>{booking.villa}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.guests || "-"}</td>
                  <td>
                    <StatusBadge status={booking.status}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </StatusBadge>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Rooms</p>
          <p className="text-2xl font-bold">20</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Occupied</p>
          <p className="text-2xl font-bold text-primary">16</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="text-2xl font-bold text-success">4</p>
        </Card>
      </div>
    </div>
  );
}
