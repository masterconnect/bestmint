"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const KM_PER_MI = 1.609344;
const L_PER_GAL_US = 3.785411784;
const L_PER_GAL_IMP = 4.54609;

export default function FuelEconomyCalculator() {
  const [distance, setDistance] = useState(300);
  const [distUnit, setDistUnit] = useState<"mi" | "km">("mi");
  const [fuel, setFuel] = useState(12);
  const [fuelUnit, setFuelUnit] = useState<"gal-us" | "gal-imp" | "L">("gal-us");

  // Convert to miles + US gallons for canonical calc
  const miles = distUnit === "mi" ? distance : distance / KM_PER_MI;
  const km = distUnit === "km" ? distance : distance * KM_PER_MI;
  const gallonsUS = fuelUnit === "gal-us" ? fuel : fuelUnit === "gal-imp" ? fuel * L_PER_GAL_IMP / L_PER_GAL_US : fuel / L_PER_GAL_US;
  const gallonsImp = gallonsUS * L_PER_GAL_US / L_PER_GAL_IMP;
  const liters = gallonsUS * L_PER_GAL_US;

  const ok = distance > 0 && fuel > 0;

  const mpgUS = ok ? miles / gallonsUS : 0;
  const mpgImp = ok ? miles / gallonsImp : 0;
  const lPer100Km = ok ? (liters / km) * 100 : 0;
  const kmPerL = ok ? km / liters : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Trip">
        <Lbl label="Distance">
          <div className="flex gap-2">
            <input type="number" min={0} step="0.01" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className={inputCls("flex-1 font-mono")} />
            <select value={distUnit} onChange={(e) => setDistUnit(e.target.value as "mi" | "km")} className={inputCls("w-24")}>
              <option value="mi">miles</option>
              <option value="km">km</option>
            </select>
          </div>
        </Lbl>
        <Lbl label="Fuel used">
          <div className="flex gap-2">
            <input type="number" min={0} step="0.01" value={fuel} onChange={(e) => setFuel(Number(e.target.value))} className={inputCls("flex-1 font-mono")} />
            <select value={fuelUnit} onChange={(e) => setFuelUnit(e.target.value as typeof fuelUnit)} className={inputCls("w-32")}>
              <option value="gal-us">US gal</option>
              <option value="gal-imp">UK gal</option>
              <option value="L">litres</option>
            </select>
          </div>
        </Lbl>
      </Panel>
      <Panel title="Fuel economy">
        {ok ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Cell label="MPG (US)" value={mpgUS.toFixed(2)} />
            <Cell label="MPG (UK)" value={mpgImp.toFixed(2)} />
            <Cell label="L/100km" value={lPer100Km.toFixed(2)} />
            <Cell label="km/L" value={kmPerL.toFixed(2)} />
          </div>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter distance and fuel.</p>}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 text-2xl font-bold tabular-nums">{value}</div></div>;
}
