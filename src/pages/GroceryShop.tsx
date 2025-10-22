import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ShoppingCart,
  Package,
  TrendingUp,
  DollarSign,
  Tag,
  Plus,
  Trash2,
  Printer,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";

const GroceryShop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    "Rice & Grains",
    "Flours & Pulses",
    "Oil & Spices",
    "Beverages",
    "Snacks",
    "Dairy",
    "Bakery",
  ]);

  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      name: "Rice (5kg)",
      category: "Rice & Grains",
      price: 120,
      quantity: "5 kg",
      barcode: "101",
    },
    {
      id: 2,
      name: "Sugar (1kg)",
      category: "Flours & Pulses",
      price: 50,
      quantity: "1 kg",
      barcode: "102",
    },
    {
      id: 3,
      name: "Cooking Oil",
      category: "Oil & Spices",
      price: 185,
      quantity: "1 L",
      barcode: "103",
    },
    {
      id: 4,
      name: "Tea Powder",
      category: "Beverages",
      price: 45,
      quantity: "250 g",
      barcode: "104",
    },
  ]);

  const [cart, setCart] = useState<
    { product: string; qty: number; amount: number }[]
  >([]);

  const [barcode, setBarcode] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showBillModal, setShowBillModal] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0);

  const filteredProducts = allProducts.filter(
    (p) =>
      (!selectedCategory ||
        selectedCategory === "All Categories" ||
        p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add product to cart
  const addToCart = (product: { name: string; price: number }) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.product === product.name);
      if (exist) {
        return prev.map((p) =>
          p.product === product.name
            ? { ...p, qty: p.qty + 1, amount: (p.qty + 1) * product.price }
            : p
        );
      } else {
        return [...prev, { product: product.name, qty: 1, amount: product.price }];
      }
    });
  };

  // Show Add Product Form
  const handleAddClick = () => {
    setShowAddForm(true);
  };

  // Save new product to list
  const handleSaveProduct = () => {
    const categoryToUse = newCategoryName || newProductCategory;
    if (!newProductName || !newProductPrice || !categoryToUse) {
      alert("Please fill all required fields.");
      return;
    }

    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
    }

    const newId = allProducts.length + 1;
    setAllProducts([
      ...allProducts,
      {
        id: newId,
        name: newProductName,
        category: categoryToUse,
        price: Number(newProductPrice),
        quantity: newProductQuantity || "1 unit",
        barcode: barcode || `B-${newId}`,
      },
    ]);

    // reset form
    setBarcode("");
    setNewProductName("");
    setNewProductPrice("");
    setNewProductQuantity("");
    setNewProductCategory("");
    setNewCategoryName("");
    setShowAddForm(false);
  };

  const handleDeleteCartItem = (productName: string) => {
    setCart(cart.filter((item) => item.product !== productName));
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    setShowBillModal(true);
  };

  const handleConfirmPrint = () => {
    setShowBillModal(false);
    setShowBill(true);
  };

  const handleBackToShop = () => {
    setShowBill(false);
    setCart([]);
  };

  // --- BILL VIEW ---
  if (showBill) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white w-full max-w-sm shadow-lg rounded-lg p-6 text-center font-mono border border-gray-300">
          <h1 className="text-2xl font-extrabold tracking-wide">🏪 GROCERY POS</h1>
          <p className="text-sm text-gray-500 mt-1">No. 123, Main Street, Colombo</p>
          <p className="text-sm text-gray-500">Tel: +94 77 123 4567</p>
          <hr className="my-3 border-gray-300" />
          <div className="text-xs text-left space-y-1">
            <div className="flex justify-between">
              <span>Invoice No:</span>
              <span>INV-{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier:</span>
              <span>Naflan</span>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="text-left text-sm">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between mb-1">
                <span>
                  {item.product} x{item.qty}
                </span>
                <span>Rs {item.amount}</span>
              </div>
            ))}
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (2%):</span>
              <span>Rs {(totalAmount * 0.02).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>Rs {(totalAmount * 0.05).toFixed(2)}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-base">
              <span>Total:</span>
              <span>Rs {(totalAmount * 0.97).toFixed(2)}</span>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="text-xs text-gray-500 mt-2">
            <p>Payment Method: <span className="font-semibold text-gray-800">Cash</span></p>
            <p>Thank You for Shopping with Us!</p>
            <p>Visit Again 🙏</p>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="w-32 h-1 bg-gray-700 rounded"></div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button onClick={handleBackToShop} className="gap-2">
              <Printer className="h-4 w-4" /> Back to POS
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN POS INTERFACE ---
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Grocery Shop POS</h1>
        <p className="text-muted-foreground">Point of Sale & Inventory Management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Today's Sales" value="Rs 18,500" icon={DollarSign} trend={{ value: "8%", isPositive: true }} />
        <MetricCard title="Items Sold" value="142" icon={Package} trend={{ value: "12%", isPositive: true }} />
        <MetricCard title="Transactions" value="38" icon={ShoppingCart} />
        <MetricCard title="Month Revenue" value="Rs 4,25,800" icon={TrendingUp} trend={{ value: "15%", isPositive: true }} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" /> Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search & Barcode Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" /> Product Search / Barcode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter / Scan Barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Button onClick={handleAddClick} className="gap-2">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {filteredProducts.map((p) => (
              <Card
                key={p.id}
                className="p-3 hover:shadow-md transition cursor-pointer"
                onClick={() => addToCart(p)}
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">Rs {p.price} ({p.quantity})</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" /> Cart
            </span>
            <span className="font-semibold text-lg text-primary">Total: Rs {totalAmount}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-muted-foreground">No items in cart</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-muted/10">
                  <div className="flex-1">
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold">Rs {item.amount}</p>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCartItem(item.product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={handleCompleteSale}>Complete Sale</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h2 className="text-xl font-bold">Add New Product</h2>

            <Input
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <Input
              placeholder="Price (Rs)"
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <Input
              placeholder="Quantity (e.g. 1kg, 500ml)"
              value={newProductQuantity}
              onChange={(e) => setNewProductQuantity(e.target.value)}
            />
            <Input
              placeholder="Barcode Number"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />

            <Select
              onValueChange={(val) => setNewProductCategory(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Or add new category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct}>Save Product</Button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Confirm Sale & Print Bill</h2>
            <p>Total Items: {cart.length}</p>
            <p>Total Amount: Rs {totalAmount}</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBillModal(false)}>Cancel</Button>
              <Button onClick={handleConfirmPrint}>Print Bill</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryShop;
