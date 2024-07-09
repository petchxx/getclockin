import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  title: string;
};

export default function SubmitButton({ title }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      color="primary"
      variant="shadow"
      type="submit"
      className="mt-6 h-12 w-80"
      isLoading={pending}
    >
      {pending ? "กำลังโหลด..." : title}
    </Button>
  );
}
