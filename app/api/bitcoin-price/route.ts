import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const price = searchParams.get("price");

  if (!date || !price) {
    return NextResponse.json(
      { error: "Missing date or price parameter" },
      { status: 400 }
    );
  }

  try {
    // This is a placeholder. In a real application, you'd fetch historical and current Bitcoin prices here.
    const historicalPrice = 100; // Example value
    const currentPrice = 50000; // Example value

    const bitcoinAmount = Number(price) / historicalPrice;
    const currentValue = bitcoinAmount * currentPrice;
    const roi = ((currentValue - Number(price)) / Number(price)) * 100;

    return NextResponse.json({
      percentage: roi,
      value: currentValue,
      productName: "Example Product",
      productPrice: Number(price),
      releaseDate: date,
    });
  } catch (error) {
    console.error("Error calculating ROI:", error);
    return NextResponse.json(
      { error: "Failed to calculate ROI" },
      { status: 500 }
    );
  }
}
