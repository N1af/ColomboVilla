import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ShoppingCart, ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  console.debug('AdminDashboard render');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all business operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue Today"
          value="Rs 45,250"
          icon={TrendingUp}
          trend={{ value: "12%", isPositive: true }}
        />
        <MetricCard
          title="Active Bookings"
          value="8"
          icon={Building2}
          trend={{ value: "3", isPositive: true }}
        />
        <MetricCard
          title="Grocery Sales"
          value="Rs 18,500"
          icon={ShoppingCart}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          title="Dress Shop Sales"
          value="Rs 12,750"
          icon={ShoppingBag}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      {/* Business Modules Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Villa Management */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Villa Management</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Occupancy Rate</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Today's Check-ins</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rooms Need Cleaning</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Low Stock Items</span>
                <span className="font-medium text-orange-500">4</span>
              </div>
            </div>
            <Link to="/villas">
              <Button className="w-full" variant="outline">View Details</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Grocery Shop */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Grocery Shop</CardTitle>
            <ShoppingCart className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Today's Sales</span>
                <span className="font-medium">Rs 18,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items Sold</span>
                <span className="font-medium">142</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transactions</span>
                <span className="font-medium">38</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Low Stock Alerts</span>
                <span className="font-medium text-orange-500">7</span>
              </div>
            </div>
            <Link to="/shop/grocery">
              <Button className="w-full" variant="outline">View POS</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Dress Shop */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Linen & Dress Shop</CardTitle>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Today's Sales</span>
                <span className="font-medium">Rs 12,750</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items Sold</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transactions</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Low Stock Alerts</span>
                <span className="font-medium text-orange-500">3</span>
              </div>
            </div>
            <Link to="/shop/dress">
              <Button className="w-full" variant="outline">View POS</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Across All Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: Building2, text: "New booking: Room 101 - Check-in today", time: "10 mins ago", color: "text-blue-500" },
              { icon: ShoppingCart, text: "Grocery: Low stock alert - Rice (5kg)", time: "25 mins ago", color: "text-orange-500" },
              { icon: ShoppingBag, text: "Dress Shop: Sale completed - Rs 2,400", time: "1 hour ago", color: "text-green-500" },
              { icon: Building2, text: "Villa: Room 203 cleaned and ready", time: "2 hours ago", color: "text-blue-500" },
              { icon: ShoppingCart, text: "Grocery: Daily sales reached Rs 15,000", time: "3 hours ago", color: "text-green-500" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
