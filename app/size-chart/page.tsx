import type { Metadata } from "next";
import Link from "next/link";
import { Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getContactSettings, buildContactWhatsAppLink } from "@/lib/site-settings-data";

export const metadata: Metadata = {
  title: "Size Chart | PV Designer Studio",
  description:
    "Measurement guide for blouses, lehengas and gowns at PV Designer Studio. Custom measurements are also available via virtual consultation.",
};

const blouseChart = [
  { size: "XS", bust: 32, waist: 26, shoulder: 13, sleeveLength: 6, sleeveRound: 11 },
  { size: "S", bust: 34, waist: 28, shoulder: 13.5, sleeveLength: 6, sleeveRound: 11.5 },
  { size: "M", bust: 36, waist: 30, shoulder: 14, sleeveLength: 6.5, sleeveRound: 12 },
  { size: "L", bust: 38, waist: 32, shoulder: 14.5, sleeveLength: 6.5, sleeveRound: 12.5 },
  { size: "XL", bust: 40, waist: 34, shoulder: 15, sleeveLength: 7, sleeveRound: 13 },
  { size: "XXL", bust: 42, waist: 36, shoulder: 15.5, sleeveLength: 7, sleeveRound: 13.5 },
  { size: "XXXL", bust: 44, waist: 38, shoulder: 16, sleeveLength: 7.5, sleeveRound: 14 },
];

const lehengaChart = [
  { size: "XS", waist: 26, hip: 36, length: 40 },
  { size: "S", waist: 28, hip: 38, length: 40 },
  { size: "M", waist: 30, hip: 40, length: 41 },
  { size: "L", waist: 32, hip: 42, length: 41 },
  { size: "XL", waist: 34, hip: 44, length: 42 },
  { size: "XXL", waist: 36, hip: 46, length: 42 },
  { size: "XXXL", waist: 38, hip: 48, length: 43 },
];

const gownChart = [
  { size: "XS", bust: 32, waist: 26, hip: 36, length: 54 },
  { size: "S", bust: 34, waist: 28, hip: 38, length: 55 },
  { size: "M", bust: 36, waist: 30, hip: 40, length: 56 },
  { size: "L", bust: 38, waist: 32, hip: 42, length: 56 },
  { size: "XL", bust: 40, waist: 34, hip: 44, length: 57 },
  { size: "XXL", bust: 42, waist: 36, hip: 46, length: 57 },
  { size: "XXXL", bust: 44, waist: 38, hip: 48, length: 58 },
];

function ChartTable({
  rows,
  columns,
}: {
  rows: Record<string, string | number>[];
  columns: { key: string; label: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-sm">
        <thead className="bg-secondary/50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-heading font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.size} className={i % 2 === 0 ? "" : "bg-muted/40"}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {row[col.key]}
                  {col.key !== "size" ? '"' : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function SizeChartPage() {
  const contact = await getContactSettings();
  const whatsappLink = buildContactWhatsAppLink(contact);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Size Chart</h1>
        <p className="mt-2 text-muted-foreground">
          All measurements are in inches and meant as a general guide.
        </p>
      </div>

      <Tabs defaultValue="blouses">
        <TabsList className="w-full">
          <TabsTrigger value="blouses">Blouses</TabsTrigger>
          <TabsTrigger value="lehengas">Lehengas</TabsTrigger>
          <TabsTrigger value="gowns">Gowns</TabsTrigger>
        </TabsList>
        <TabsContent value="blouses">
          <ChartTable
            rows={blouseChart}
            columns={[
              { key: "size", label: "Size" },
              { key: "bust", label: "Bust" },
              { key: "waist", label: "Waist" },
              { key: "shoulder", label: "Shoulder" },
              { key: "sleeveLength", label: "Sleeve Length" },
              { key: "sleeveRound", label: "Sleeve Round" },
            ]}
          />
        </TabsContent>
        <TabsContent value="lehengas">
          <ChartTable
            rows={lehengaChart}
            columns={[
              { key: "size", label: "Size" },
              { key: "waist", label: "Waist" },
              { key: "hip", label: "Hip" },
              { key: "length", label: "Lehenga Length" },
            ]}
          />
        </TabsContent>
        <TabsContent value="gowns">
          <ChartTable
            rows={gownChart}
            columns={[
              { key: "size", label: "Size" },
              { key: "bust", label: "Bust" },
              { key: "waist", label: "Waist" },
              { key: "hip", label: "Hip" },
              { key: "length", label: "Gown Length" },
            ]}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-xl bg-secondary/50 p-8 text-center">
        <Video className="h-8 w-8 text-primary" />
        <h2 className="font-heading text-xl font-semibold">Need a Custom Fit?</h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Every PV Designer Studio piece can be tailored to your exact measurements.
          Book a virtual consultation and our team will guide you through taking
          accurate measurements from home.
        </p>
        <Button asChild>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Book a Virtual Consultation
          </Link>
        </Button>
      </div>
    </div>
  );
}
