"use client";
import * as React from "react";
import { Check, CreditCard } from "lucide-react";
import { Modal } from "../../../../components/ui/Modal";
import type { CardFormData } from "../../Type";


export interface CardAddedModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CardFormData | null;
}

export function CardAddedModal({ isOpen, onClose, data }: CardAddedModalProps) {
  if (!data) return null;

  const maskedNumber = data.cardNumber
    .padEnd(16, "0")
    .slice(0, 16)
    .replace(/^(\d{12})(\d{4})$/, (_m, first12, last4) => "•".repeat(12) + last4)
    .replace(/(.{4})/g, "$1 ")
    .trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 rounded-full bg-[#0f3d33] flex items-center justify-center mb-5">
          <Check size={28} className="text-[#2ED9A5]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Card added</h2>
        <p className="text-sm text-[#EAEAEA99] mb-6">Your card has been saved successfully</p>

        <div className="w-full rounded-2xl border border-[#3a3a3a] bg-gradient-to-br from-[#1f1f1f] to-[#141414] p-5 mb-6">
          <div className="flex items-center justify-between mb-8">
            <CreditCard size={22} className="text-[#00B8F0]" />
            <span className="text-xs text-[#EAEAEA80] tracking-wider">
              {data.saveCard ? "SAVED" : "ADDED"}
            </span>
          </div>
          <p className="text-white text-lg tracking-[0.2em] font-semibold mb-4">{maskedNumber}</p>
          <div>
            <p className="text-[10px] text-[#EAEAEA66] tracking-wider mb-0.5">EXPIRES</p>
            <p className="text-white text-sm font-medium">
              {data.expiryMonth}/{data.expiryYear}
            </p>
          </div>
        </div>

        <button onClick={onClose} className="w-full rounded-xl bg-[#EAEAEA] text-black font-bold text-sm py-3.5">
          Done
        </button>
      </div>
    </Modal>
  );
}