"use client";
import * as React from "react";
import { CreditCard } from "lucide-react";

import { SelectBankModal } from "../selectbankmodal";
import { AddCardManualModal } from "../addcardmanualmodal";
import { CardAddedModal } from "../cardaddedmodal";
import type { CardFormData, Step } from "../../Type";


export function AddCardFlow() {
  const [step, setStep] = React.useState<Step>("closed");
  const [cardData, setCardData] = React.useState<CardFormData | null>(null);

  const closeAll = () => setStep("closed");

  const handleManualSubmit = (data: CardFormData) => {

    switch (step) {
      case "manual":
        setCardData(data);
        setStep("success");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        onClick={() => setStep("select")}
        className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-[#EAEAEA] text-black font-semibold  text-sm py-3.5"
      >
        <CreditCard size={18} />
        Add new card
      </button>

      <SelectBankModal
        isOpen={step === "select"}
        onClose={closeAll}
        onAddManually={() => setStep("manual")}
      />

      <AddCardManualModal
        isOpen={step === "manual"}
        onClose={closeAll}
        onBack={() => setStep("select")}
        onSubmit={handleManualSubmit}
      />

      <CardAddedModal isOpen={step === "success"} onClose={closeAll} data={cardData} />
    </>
  );
}