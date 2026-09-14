"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useRef } from "react";
import subscribePremium from "../../_actions/subscribePremium";
import { toast } from "sonner";
export function SubscribeButton() {
  const [state, action, pending] = useActionState(subscribePremium, null);
  const lastProcessedStateRef = useRef<typeof state>(null);

  useEffect(() => {
    if (!state) return;

    // If we already showed a toast for this exact state object, skip it
    if (lastProcessedStateRef.current === state) return;

    if (!state.success) {
      toast.error(state.message || "Failed to start checkout");
      // Mark this state object as "seen"
      lastProcessedStateRef.current = state;
    }
  }, [state]);

  return (
    <form action={action}>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Redirecting..." : "Subscribe Now"}
      </Button>
    </form>
  );
}
