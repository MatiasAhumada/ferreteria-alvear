"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BarCode01Icon, MagicWand01Icon } from "hugeicons-react";
import { generateBarcode } from "@/utils/barcode.util";

interface BarcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function BarcodeInput({ value, onChange, disabled }: BarcodeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scanBufferRef = useRef<string>("");
  const scanTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isFocused || disabled) return;

      if (e.key === "Enter") {
        if (scanBufferRef.current) {
          onChange(scanBufferRef.current);
          scanBufferRef.current = "";
        }
        return;
      }

      if (e.key.length === 1) {
        scanBufferRef.current += e.key;

        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }

        scanTimeoutRef.current = setTimeout(() => {
          scanBufferRef.current = "";
        }, 100);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [isFocused, disabled, onChange]);

  const handleGenerate = () => {
    const newBarcode = generateBarcode();
    onChange(newBarcode);
  };

  return (
    <div>
      <Label>Código de Barras / SKU</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <BarCode01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <Input
            ref={inputRef}
            placeholder="Escanear o ingresar código"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleGenerate}
          disabled={disabled}
          title="Generar código automático"
          className="gap-2"
        >
          <MagicWand01Icon size={18} />
          <span className="hidden sm:inline">Generar</span>
        </Button>
      </div>
      <p className="text-xs text-text-tertiary mt-1">
        Escanee con pistola lectora o genere un código automático
      </p>
    </div>
  );
}
