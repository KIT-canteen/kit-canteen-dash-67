import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Bell, Send, Plus, Eye, Edit, Trash2, 
  Users, MessageSquare, Megaphone, Clock, Check, X,
  Heart, Coffee, ChefHat, Sparkles, Timer, Play, Pause, Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Initial data for templates
const initialNotificationTemplates = [
  {
    id: 1,
    category: "Food Craving",
    title: "Biryani calls your name! 🍛",
    message: "Your favorite aromatic biryani is waiting for you. Order now and satisfy those cravings!",
    emoji: "🍛",
    timing: "Lunch Time",
    isActive: true
  },
  {
    id: 2,
    category: "Romantic",
    title: "Pizza date night? 💕",
    message: "Nothing says love like sharing a cheesy pizza together. Make tonight special!",
    emoji: "🍕",
    timing: "Evening",
    isActive: true
  },
  {
    id: 3,
    category: "Morning Boost",
    title: "Good morning, sunshine! ☀️",
    message: "Start your day right with our fresh breakfast combos and aromatic coffee!",
    emoji: "☕",
    timing: "Morning",
    isActive: true
  },
  {
    id: 4,
    category: "Weekend Vibes",
    title: "Weekend mood: Burger & Chill 🍔",
    message: "Kick back and relax with our juicy burgers. Perfect for your weekend vibes!",
    emoji: "🍔",
    timing: "Weekend",
    isActive: false
  },
  {
    id: 5,
    category: "Sweet Tooth",
    title: "Life's too short to skip dessert 🍰",
    message: "Treat yourself to our heavenly desserts. Because you deserve something sweet today!",
    emoji: "🍰",
    timing: "Afternoon",
    isActive: true
  },
  {
    id: 6,
    category: "Comfort Food",
    title: "Feeling stressed? Pasta therapy! 🍝",
    message: "Let our creamy, comforting pasta dishes melt your stress away. Order your therapy now!",
    emoji: "🍝",
    timing: "Evening",
    isActive: true
  },
  {
    id: 7,
    category: "Healthy Choice",
    title: "Your body will thank you! 🥗",
    message: "Fresh salads and healthy bowls that taste amazing. Fuel your body right!",
    emoji: "🥗",
    timing: "Lunch Time",
    isActive: false
  },
  {
    id: 8,
    category: "Spicy Mood",
    title: "Feeling spicy today? 🌶️",
    message: "Turn up the heat with our fiery dishes. Perfect for those who like it hot!",
    emoji: "🌶️",
    timing: "Dinner",
    isActive: true
  }
];

// Initial automation settings
const initialAutomationSettings = [
  {
    id: 1,
    name: "Morning Motivation",
    description: "Send breakfast promotions every morning",
    frequency: "Daily at 8:00 AM",
    status: "Active",
    recipients: 2450
  },
  {
    id: 2,
    name: "Lunch Rush",
    description: "Promote lunch specials during peak hours",
    frequency: "Daily at 11:30 AM",
    status: "Active",
    recipients: 3200
  },
  {
    id: 3,
    name: "Weekend Indulgence",
    description: "Special weekend food campaigns",
    frequency: "Saturdays at 12:00 PM",
    status: "Paused",
    recipients: 1800
  },
  {
    id: 4,
    name: "Evening Cravings",
    description: "Dinner and comfort food notifications",
    frequency: "Daily at 6:00 PM",
    status: "Active",
    recipients: 2800
  }
];

export default function AdminNotificationManagementPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("templates");
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [notificationTemplates, setNotificationTemplates] = useState(initialNotificationTemplates);
  const [automationSettings, setAutomationSettings] = useState(initialAutomationSettings);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    category: "",
    title: "",
    message: "",
    emoji: "",
    timing: ""
  });

  // Recent automated notifications sent
  const recentNotifications = [
    {
      id: 1,
      template: "Biryani calls your name! 🍛",
      sentTo: 2450,
      openRate: "82%",
      clickRate: "34%",
      sentAt: "Today, 11:30 AM",
      status: "Delivered"
    },
    {
      id: 2,
      template: "Pizza date night? 💕",
      sentTo: 1800,
      openRate: "76%",
      clickRate: "28%",
      sentAt: "Yesterday, 6:00 PM",
      status: "Delivered"
    },
    {
      id: 3,
      template: "Good morning, sunshine! ☀️",
      sentTo: 3200,
      openRate: "68%",
      clickRate: "22%",
      sentAt: "Today, 8:00 AM",
      status: "Delivered"
    },
    {
      id: 4,
      template: "Weekend mood: Burger & Chill 🍔",
      sentTo: 2100,
      openRate: "85%",
      clickRate: "41%",
      sentAt: "Saturday, 12:00 PM",
      status: "Delivered"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Paused": return "bg-warning text-warning-foreground";
      case "Delivered": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleToggleTemplate = (templateId: number) => {
    setNotificationTemplates(prev => {
      const updatedTemplates = prev.map(template => 
        template.id === templateId 
          ? { ...template, isActive: !template.isActive }
          : template
      );
      
      // Get the template info from the previous state to avoid initialization error
      const template = prev.find(t => t.id === templateId);
      
      toast({
        title: "Template Updated",
        description: `"${template?.title}" has been ${!template?.isActive ? 'activated' : 'deactivated'}.`,
      });
      
      return updatedTemplates;
    });
  };

  const handleToggleAutomation = (automationId: number) => {
    setAutomationSettings(prev => {
      const updatedAutomations = prev.map(automation => 
        automation.id === automationId 
          ? { ...automation, status: automation.status === "Active" ? "Paused" : "Active" }
          : automation
      );
      
      // Get automation info from previous state to avoid initialization error
      const automation = prev.find(a => a.id === automationId);
      
      toast({
        title: "Automation Updated", 
        description: `"${automation?.name}" has been ${automation?.status === "Active" ? 'paused' : 'activated'}.`,
      });
      
      return updatedAutomations;
    });
  };

  const handleSendTestNotification = (template: any) => {
    toast({
      title: "Test Notification Sent",
      description: `"${template.title}" has been sent to test users.`,
    });
  };

  const handleMasterToggle = (enabled: boolean) => {
    setAutomationEnabled(enabled);
    toast({
      title: enabled ? "Automation Enabled" : "Automation Disabled",
      description: enabled 
        ? "All automated notifications are now active."
        : "All automated notifications have been paused.",
    });
  };

  const handleAddNotification = () => {
    toast({
      title: "Add Notification",
      description: "Create new notification dialog would open here",
    });
  };

  const handleAddTemplate = () => {
    toast({
      title: "Add Template", 
      description: "Create new template dialog would open here",
    });
  };

  const handleEditTemplate = (templateId: number) => {
    const template = notificationTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setEditForm({
        category: template.category,
        title: template.title,
        message: template.message,
        emoji: template.emoji,
        timing: template.timing
      });
      setEditDialogOpen(true);
    }
  };

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setNotificationTemplates(prev => 
        prev.map(template => 
          template.id === selectedTemplate.id 
            ? { ...template, ...editForm }
            : template
        )
      );
      toast({
        title: "Template Updated",
        description: `"${editForm.title}" has been successfully updated.`,
      });
      setEditDialogOpen(false);
      setSelectedTemplate(null);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Automated Notification System</h1>
            <p className="text-muted-foreground">AI-powered promotional notifications like Zomato</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleAddNotification}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Notification
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Master Control</span>
            <Switch 
              checked={automationEnabled} 
              onCheckedChange={handleMasterToggle}
            />
          </div>
          <Badge variant={automationEnabled ? "default" : "secondary"}>
            {automationEnabled ? "Active" : "Paused"}
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">8,450</p>
                <p className="text-xs text-muted-foreground">Notifications Sent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">74%</p>
                <p className="text-xs text-muted-foreground">Average Open Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">31%</p>
                <p className="text-xs text-muted-foreground">Click Through Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <ChefHat className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">142</p>
                <p className="text-xs text-muted-foreground">Orders Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex space-x-2 mb-6">
        {["templates", "automation", "analytics"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "templates" && <MessageSquare className="h-4 w-4 mr-2" />}
            {tab === "automation" && <Timer className="h-4 w-4 mr-2" />}
            {tab === "analytics" && <Bell className="h-4 w-4 mr-2" />}
            {tab}
          </Button>
        ))}
      </div>

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notification Templates</h2>
            <Button
              onClick={handleAddTemplate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {notificationTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{template.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-sm">{template.category}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {template.timing}
                        </Badge>
                      </div>
                    </div>
                    <Switch 
                      checked={template.isActive}
                      onCheckedChange={() => handleToggleTemplate(template.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground">{template.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{template.message}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleSendTestNotification(template)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Test
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTemplate(template.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === "automation" && (
        <div className="space-y-4">
          {automationSettings.map((automation) => (
            <Card key={automation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Timer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{automation.name}</h3>
                      <p className="text-sm text-muted-foreground">{automation.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>📅 {automation.frequency}</span>
                        <span>👥 {automation.recipients} recipients</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(automation.status)}>
                      {automation.status === "Active" ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                      {automation.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleAutomation(automation.id)}
                    >
                      {automation.status === "Active" ? "Pause" : "Resume"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Automated Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{notification.template}</h4>
                    <Badge className={getStatusColor(notification.status)}>
                      {notification.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sent To</p>
                      <p className="font-semibold">{notification.sentTo.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Open Rate</p>
                      <p className="font-semibold text-success">{notification.openRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Click Rate</p>
                      <p className="font-semibold text-primary">{notification.clickRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sent At</p>
                      <p className="font-semibold">{notification.sentAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Notification Template</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emoji" className="text-right">
                Emoji
              </Label>
              <Input
                id="emoji"
                value={editForm.emoji}
                onChange={(e) => handleFormChange("emoji", e.target.value)}
                className="col-span-3"
                placeholder="🍛"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={editForm.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                className="col-span-3"
                placeholder="Food Craving"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="timing" className="text-right">
                Timing
              </Label>
              <Select 
                value={editForm.timing} 
                onValueChange={(value) => handleFormChange("timing", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select timing" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Lunch Time">Lunch Time</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="col-span-3"
                placeholder="Biryani calls your name! 🍛"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea
                id="message"
                value={editForm.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
                className="col-span-3 min-h-[80px]"
                placeholder="Your favorite aromatic biryani is waiting for you. Order now and satisfy those cravings!"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveTemplate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}