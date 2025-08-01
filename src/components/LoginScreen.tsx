import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Simulate login success
    navigate("/home");
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary text-lg font-bold">KIT</span>
        </div>
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip for now
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to KIT-Canteen
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to order your favorite food
          </p>

          {/* Email login */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Button
                onClick={handleGoogleSignIn}
                variant="food"
                size="mobile"
                className="w-full"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with College Email
              </Button>
            </CardContent>
          </Card>

          {/* Dashboard Access Buttons */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Dashboard Access</p>
            </div>
            <Button
              onClick={() => navigate("/canteen-owner")}
              variant="outline"
              size="mobile"
              className="w-full"
            >
              Canteen Owner Login
            </Button>
            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              size="mobile"
              className="w-full"
            >
              Admin Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="text-primary underline">Terms of Service</span> and{" "}
          <span className="text-primary underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}