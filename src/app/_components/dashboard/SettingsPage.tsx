import { Button, Card, Divider, Input } from "@nextui-org/react";
import React from "react";
import { Company } from "~/lib/interface/company";

type Props = {
  company: Company;
};

export default function SettingsPage({ company }: Props) {
  return (
    <div>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="text-lg font-bold">อีเมล์</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแดชบอร์ด</p>
          <Input
            className="mt-4"
            variant="bordered"
            defaultValue={company.email ?? ""}
          />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="text-lg font-bold">ชื่อบริษัท</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแอปพลิเคชั่น</p>
          <Input
            className="mt-4"
            variant="bordered"
            defaultValue={company.name ?? ""}
          />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="text-lg font-bold">Line Notify Key</p>
          <p className="text-sm text-foreground/50">
            ใช้ในการแจ้งเตือนผ่านไลน์
          </p>
          <Input
            className="mt-4"
            variant="bordered"
            defaultValue={company.line_token ?? ""}
          />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
    </div>
  );
}
