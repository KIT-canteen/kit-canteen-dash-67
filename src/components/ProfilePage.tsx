import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Clock, Star, LogOut, ChevronRight } from "lucide-react";
import BottomNavigation from "./BottomNavigation";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Rahul Kumar",
    email: "rahul.kumar@kit.edu",
    phone: "+91 98765 43210",
    studentId: "KIT2023001",
    course: "B.Tech Computer Science"
  });

  const orderHistory = [
    {
      id: "12345",
      date: "Today, 2:30 PM",
      items: ["Veg Thali", "Masala Tea"],
      total: 194,
      status: "Completed"
    },
    {
      id: "12344",
      date: "Yesterday, 1:15 PM",
      items: ["Samosa", "Coffee"],
      total: 40,
      status: "Completed"
    },
    {
      id: "12343",
      date: "2 days ago, 12:45 PM",
      items: ["Chole Bhature", "Lassi"],
      total: 95,
      status: "Completed"
    }
  ];

  const stats = {
    totalOrders: 25,
    totalSpent: 2150,
    favoriteItem: "Veg Thali",
    avgRating: 4.5
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save to backend
  };

  const handleLogout = () => {
    // In real app, this would clear auth state
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Header */}
        <div className="flex items-center space-x-4 mt-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-white text-primary text-2xl font-bold">
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-white/80">{userInfo.course}</p>
            <p className="text-white/80 text-sm">ID: {userInfo.studentId}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.totalOrders}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">₹{stats.totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                {isEditing ? (
                  <Input
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-medium">{userInfo.name}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                {isEditing ? (
                  <Input
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-medium">{userInfo.email}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Phone</label>
                {isEditing ? (
                  <Input
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="font-medium">{userInfo.phone}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-2">
                  <Button variant="food" onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Your Favorites</h3>
            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <div>
                  <p className="font-medium">{stats.favoriteItem}</p>
                  <p className="text-sm text-muted-foreground">Most ordered item</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Orders</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {orderHistory.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.total}</p>
                    <p className="text-sm text-success">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Settings</h3>
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/favorites")}
              >
                <span>My Favorites</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/notifications")}
              >
                <span>Notifications</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/payment-methods")}
              >
                <span>Payment Methods</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/help-support")}
              >
                <span>Help & Support</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/feedback")}
              >
                <span>Feedback</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/about")}
              >
                <span>About</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/privacy-policy")}
              >
                <span>Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => navigate("/terms-conditions")}
              >
                <span>Terms of Service</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation currentPage="profile" />
    </div>
  );
}