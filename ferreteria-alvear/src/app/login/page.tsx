"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { Store01Icon, UserIcon, LockPasswordIcon, ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        window.location.href = ROUTES.HOME;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-surface">
        <CardHeader className="space-y-4 pb-8 pt-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Store01Icon size={40} className="text-text-inverse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-text">Ferretería Alvear</h1>
            <p className="text-text-secondary">Sistema de Gestión</p>
          </div>
        </CardHeader>
        <CardContent className="pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-text font-medium">
                Usuario
              </Label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 h-12 bg-background border-border focus:border-primary focus:ring-primary"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-text font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <LockPasswordIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 pr-10 h-12 bg-background border-border focus:border-primary focus:ring-primary"
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors"
                >
                  {showPassword ? <ViewIcon size={20} /> : <ViewOffIcon size={20} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-text-inverse font-semibold text-base shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
