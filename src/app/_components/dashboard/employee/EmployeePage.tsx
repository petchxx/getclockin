"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UpdateEmployee from "./UpdateEmployee";
import AddEmployee from "./AddEmployee";
import { Icon } from "@iconify/react";
import DeleteEmployee from "./DeleteEmployee";
import { Employee } from "~/lib/interface/employee";

type Props = {
  employees: Employee[];
};

export default function EmployeePage({ employees }: Props) {
  const router = useRouter();
  const statusColorMap: Record<string, ChipProps["color"]> = {
    in: "success",
    out: "danger",
  };

  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "phone",
    "role",
    "start_time",
    "stop_time",
    "status",
    "actions",
  ];

  const columns = [
    { name: "ชื่อ", uid: "name", sortable: true },
    { name: "อีเมลล์", uid: "email" },
    { name: "ตำแหน่ง", uid: "role", sortable: true },
    { name: "เงินเดือน", uid: "salary", sortable: true },
    { name: "เบอร์", uid: "phone" },
    { name: "เวลาเริ่มงาน", uid: "start_time" },
    { name: "เวลาเลิกงาน", uid: "stop_time" },
    { name: "วันหยุด", uid: "off_days" },
    { name: "สถานะ", uid: "status", sortable: true },
    { name: "แก้ไข", uid: "actions" },
  ];

  const statusOptions = [
    { name: "เข้างาน", uid: "in" },
    { name: "ออกงาน", uid: "out" },
  ];

  const [filterValue, setFilterValue] = React.useState("");

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...employees];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [employees, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as any] as number;
      const second = b[sortDescriptor.column as any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );

      case "start_time":
      case "stop_time":
        return (
          <p>
            {cellValue.split(":")[0]}:{cellValue.split(":")[1]}
          </p>
        );
      case "status":
        return (
          <Chip
            // className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue == "in" ? "เข้างาน" : "ออกงาน"}
          </Chip>
        );
      case "off_days":
        return (
          <div className="flex gap-1">
            {cellValue.map((day: string) => (
              <Chip
                className="capitalize"
                color="default"
                size="sm"
                variant="flat"
                key={day}
              >
                {day == "Sunday"
                  ? "อาทิตย์"
                  : day == "Monday"
                    ? "จันทร์"
                    : day == "Tuesday"
                      ? "อังคาร"
                      : day == "Wednesday"
                        ? "พุธ"
                        : day == "Thursday"
                          ? "พฤหัสบดี"
                          : day == "Friday"
                            ? "ศุกร์"
                            : "เสาร์"}
              </Chip>
            ))}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {/* <Tooltip content="Details"> */}
            {/*   <span className="cursor-pointer text-lg text-default-400 active:opacity-50"> */}
            {/*     <MdOutlineRemoveRedEye /> */}
            {/*   </span> */}
            {/* </Tooltip> */}
            <Tooltip content="แก้ไขพนักงาน">
              <span>
                <UpdateEmployee
                  id={user.id}
                  currentEmail={user.email}
                  currentName={user.name}
                  currentPhone={user.phone}
                  currentRole={user.role}
                  currentSalary={user.salary}
                  currentOffDays={user.off_days}
                  currentStartTime={user.start_time}
                  currentStopTime={user.stop_time}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="ลบพนักงาน">
              <DeleteEmployee id={user.id} />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full rounded-xl bg-background sm:max-w-[44%]"
            placeholder="ค้นหาพนักงาน"
            // startContent={<MdOutlineSearch size={24} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="bordered"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"V"} variant="flat">
                  สถานะ
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"V"} variant="flat">
                  ข้อมูล
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddEmployee />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            ทั้งหมด {employees.length} คน
          </span>
          <label className="flex items-center text-small text-default-400">
            แถวต่อหน้า :
            <select
              className="bg-background text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    employees.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            กลับ
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      className="mt-4"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"ไม่พบพนักงาน"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
