import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Filter, CheckCircle2, AlertCircle, Package, ShoppingCart, Calendar, Home } from "lucide-react";

export default function VillaManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  // Mock data - Bookings
  const bookings = [
    {
      id: 1,
      guestName: "John Smith",
      phone: "+91 98765 43210",
      villa: "Villa A",
      room: "101",
      checkIn: "2025-10-15",
      checkOut: "2025-10-18",
      totalDays: 3,
      status: "booked" as const,
      guests: 2,
      amount: "₹12,000"
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phone: "+91 98765 43211",
      villa: "Villa B",
      room: "205",
      checkIn: "2025-10-16",
      checkOut: "2025-10-20",
      totalDays: 4,
      status: "booked" as const,
      guests: 3,
      amount: "₹20,000"
    },
    {
      id: 3,
      guestName: "Available",
      phone: "-",
      villa: "Villa A",
      room: "102",
      checkIn: "-",
      checkOut: "-",
      totalDays: 0,
      status: "available" as const,
      guests: 0,
      amount: "-"
    },
    {
      id: 4,
      guestName: "Maintenance",
      phone: "-",
      villa: "Villa A",
      room: "103",
      checkIn: "-",
      checkOut: "-",
      totalDays: 0,
      status: "maintenance" as const,
      guests: 0,
      amount: "-"
    },
  ];

  // Mock data - Room Inventory
  const roomInventory = [
    { id: 1, villa: "Villa A", room: "101", item: "Pillows", total: 4, good: 4, damaged: 0, missing: 0 },
    { id: 2, villa: "Villa A", room: "101", item: "Bedsheets", total: 2, good: 2, damaged: 0, missing: 0 },
    { id: 3, villa: "Villa A", room: "101", item: "Towels", total: 4, good: 3, damaged: 1, missing: 0 },
    { id: 4, villa: "Villa A", room: "102", item: "Pillows", total: 4, good: 4, damaged: 0, missing: 0 },
    { id: 5, villa: "Villa B", room: "205", item: "Bedsheets", total: 2, good: 1, damaged: 0, missing: 1 },
  ];

  // Mock data - Cleaning Checklist
  const cleaningChecklist = [
    { id: 1, villa: "Villa A", room: "101", date: "2025-10-16", status: "cleaned" as const, cleaner: "Ravi Kumar", notes: "All good" },
    { id: 2, villa: "Villa A", room: "102", date: "2025-10-16", status: "pending" as const, cleaner: "-", notes: "-" },
    { id: 3, villa: "Villa A", room: "103", date: "2025-10-16", status: "maintenance" as const, cleaner: "Ravi Kumar", notes: "AC not working" },
    { id: 4, villa: "Villa B", room: "205", date: "2025-10-16", status: "cleaned" as const, cleaner: "Priya Sharma", notes: "All good" },
  ];

  // Mock data - Supplies & Groceries
  const supplies = [
    { id: 1, villa: "Villa A", item: "Tea Powder", quantity: "500g", lastUpdated: "2025-10-15", status: "sufficient" as const },
    { id: 2, villa: "Villa A", item: "Sugar", quantity: "2kg", lastUpdated: "2025-10-14", status: "sufficient" as const },
    { id: 3, villa: "Villa A", item: "Milk", quantity: "1L", lastUpdated: "2025-10-16", status: "low" as const },
    { id: 4, villa: "Villa B", item: "Coffee", quantity: "200g", lastUpdated: "2025-10-15", status: "low" as const },
    { id: 5, villa: "Villa B", item: "Bread", quantity: "2 loaves", lastUpdated: "2025-10-16", status: "sufficient" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Villa Management</h1>
          <p className="text-muted-foreground">
            Complete villa operations - bookings, inventory, cleaning & supplies
          </p>
        </div>
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input id="guestName" placeholder="Enter guest name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="villa">Villa</Label>
                  <Input id="villa" placeholder="Villa A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Input id="room" placeholder="101" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input id="checkIn" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out</Label>
                  <Input id="checkOut" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input id="guests" type="number" placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Total Amount</Label>
                <Input id="amount" placeholder="₹12,000" />
              </div>
              <Button className="w-full">Confirm Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Occupied</p>
              <p className="text-2xl font-bold text-primary">16</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-success">4</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-3">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alerts</p>
              <p className="text-2xl font-bold text-warning">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
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

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Phone</th>
                    <th>Villa</th>
                    <th>Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Days</th>
                    <th>Guests</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="font-medium">{booking.guestName}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.villa}</td>
                      <td>{booking.room}</td>
                      <td>{booking.checkIn}</td>
                      <td>{booking.checkOut}</td>
                      <td>{booking.totalDays || "-"}</td>
                      <td>{booking.guests || "-"}</td>
                      <td className="font-medium">{booking.amount}</td>
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
        </TabsContent>

        {/* Room Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Track pillows, bedsheets, towels and other room items
            </p>
            <Button variant="outline" className="gap-2">
              <Package className="h-4 w-4" />
              Update Inventory
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Villa</th>
                    <th>Room</th>
                    <th>Item</th>
                    <th>Total</th>
                    <th>Good Condition</th>
                    <th>Damaged</th>
                    <th>Missing</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomInventory.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.villa}</td>
                      <td>{item.room}</td>
                      <td>{item.item}</td>
                      <td>{item.total}</td>
                      <td className="text-success">{item.good}</td>
                      <td className={item.damaged > 0 ? "text-warning" : ""}>{item.damaged}</td>
                      <td className={item.missing > 0 ? "text-destructive" : ""}>{item.missing}</td>
                      <td>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Cleaning Checklist Tab */}
        <TabsContent value="cleaning" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Daily room cleaning status and maintenance tracking
            </p>
            <Button variant="outline" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mark as Cleaned
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Villa</th>
                    <th>Room</th>
                    <th>Cleaner</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaningChecklist.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td className="font-medium">{item.villa}</td>
                      <td>{item.room}</td>
                      <td>{item.cleaner}</td>
                      <td>
                        <StatusBadge status={item.status}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </StatusBadge>
                      </td>
                      <td>{item.notes}</td>
                      <td>
                        <Button variant="ghost" size="sm">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Supplies & Groceries Tab */}
        <TabsContent value="supplies" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Track daily grocery usage - tea, sugar, milk, and other supplies
            </p>
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add Supply Entry
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Villa</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supplies.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.villa}</td>
                      <td>{item.item}</td>
                      <td>{item.quantity}</td>
                      <td>{item.lastUpdated}</td>
                      <td>
                        <StatusBadge status={item.status === "low" ? "low" : "sufficient"}>
                          {item.status === "low" ? "Low Stock" : "Sufficient"}
                        </StatusBadge>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
