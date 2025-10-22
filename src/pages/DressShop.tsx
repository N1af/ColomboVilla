import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/MetricCard";
import { Plus, Search, Package, TrendingUp, DollarSign } from "lucide-react";
import { useState } from "react";

export default function DressShop() {
  console.debug('DressShop render');
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const recentSales = [
    { id: 1, product: "Cotton Saree", quantity: 2, amount: "Rs 3,500", time: "2 hours ago" },
    { id: 2, product: "Silk Dress", quantity: 1, amount: "Rs 5,200", time: "3 hours ago" },
    { id: 3, product: "Bed Linen Set", quantity: 3, amount: "Rs 4,800", time: "5 hours ago" },
  ];

  const lowStock = [
    { id: 1, product: "White Towels", current: 5, minimum: 20 },
    { id: 2, product: "Pillow Covers", current: 8, minimum: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Linen & Dress Shop</h1>
          <p className="text-muted-foreground">
            Point of Sale, inventory, and sales reports
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Sale
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        <MetricCard
          title="Today's Sales"
          value="Rs 15,240"
          icon={DollarSign}
          trend={{ value: "12%", isPositive: true }}
        />
        <MetricCard
          title="Items Sold"
          value="28"
          icon={Package}
          description="Across 15 transactions"
        />
        <MetricCard
          title="Month Revenue"
          value="Rs 3,24,500"
          icon={TrendingUp}
          trend={{ value: "8%", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>Recent Sales</h3>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{sale.product}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {sale.quantity} • {sale.time}
                  </p>
                </div>
                <p className="font-semibold text-primary">{sale.amount}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3>Low Stock Alerts</h3>
            <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-semibold text-warning">
              {lowStock.length} items
            </span>
          </div>
          <div className="space-y-4">
            {lowStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.product}</p>
                  <p className="text-sm text-muted-foreground">
                    Current: {item.current} • Min: {item.minimum}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Product Search */}
      <Card className="p-6">
        <h3 className="mb-4">Product Inventory</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products by name or barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>
    </div>
  );
}
