import { createFileRoute } from "@tanstack/react-router";
import PayPalBalance from "@/components/PayPalBalance";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "PayPal Balance" }],
  }),
});

function Index() {
  return <PayPalBalance />;
}
