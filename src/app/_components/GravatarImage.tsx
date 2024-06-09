import React from "react";
import crypto from "crypto";

type Props = {
  email?: string;
};

export default function GravatarImage({ email }: Props) {
  return (
    `https://www.gravatar.com/avatar/${crypto
      .createHash("sha256")
      .update(email ?? "")
      .digest("hex")}?s=80&d=identicon` ?? ""
  );
}
