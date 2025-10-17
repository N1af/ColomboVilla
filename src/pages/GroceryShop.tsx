import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Package, AlertTriangle, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";

const GroceryShop = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const recentSales = [
    { id: 1, product: "Rice (5kg)", quantity: 2, amount: "₹240", time: "10:30 AM" },
    { id: 2, product: "Sugar (1kg)", quantity: 3, amount: "₹150", time: "10:25 AM" },
    { id: 3, product: "Cooking Oil", quantity: 1, amount: "₹185", time: "10:15 AM" },
    { id: 4, product: "Tea Powder", quantity: 2, amount: "₹90", time: "10:05 AM" },
  ];

  const lowStockItems = [
    { id: 1, product: "Rice (5kg)", current: 8, minimum: 20 },
    { id: 2, product: "Wheat Flour", current: 5, minimum: 15 },
    { id: 3, product: "Sugar (1kg)", current: 12, minimum: 25 },
    { id: 4, product: "Cooking Oil", current: 6, minimum: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Grocery Shop POS</h1>
          <p className="text-muted-foreground">Point of Sale & Inventory Management</p>
        </div>
        <Button size="lg" className="gap-2">
          <ShoppingCart className="h-5 w-5" />
          New Sale
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Today's Sales"
          value="₹18,500"
          icon={DollarSign}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          title="Items Sold"
          value="142"
          icon={Package}
          trend={{ value: "12%", isPositive: true }}
        />
        <MetricCard
          title="Transactions"
          value="38"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Month Revenue"
          value="₹4,25,800"
          icon={TrendingUp}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{sale.product}</p>
                    <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                      <span>Qty: {sale.quantity}</span>
                      <span>•</span>
                      <span>{sale.time}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">{sale.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex-1">
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Current: {item.current} | Minimum: {item.minimum}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Restock</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Product Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name or scan barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryShop;
