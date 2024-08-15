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
    // This is where you'd typically fetch historical and current Bitcoin prices
    // For now, let's use placeholder values
    const historicalPrice = 100; // Example value
    const currentPrice = 50000; // Example value

    const bitcoinAmount = Number(price) / historicalPrice;
    const currentValue = bitcoinAmount * currentPrice;

    console.log("API calculation:", {
      historicalPrice,
      currentPrice,
      bitcoinAmount,
      currentValue,
    });

    return NextResponse.json({
      currentValue: currentValue,
      productName: "Example Product",
      productPrice: Number(price),
      releaseDate: date,
    });
  } catch (error) {
    console.error("Error calculating BTC value:", error);
    return NextResponse.json(
      { error: "Failed to calculate BTC value" },
      { status: 500 }
    );
  }
}
