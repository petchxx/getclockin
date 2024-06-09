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
  type Selection,
  type ChipProps,
  type SortDescriptor,
  Tooltip,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { api } from "~/trpc/react";
import { type Overtime } from "~/lib/interface/overtime";
import GravatarImage from "../GravatarImage";

type Props = {
  overtimes: Overtime[];
};

export default function OvertimePage({ overtimes }: Props) {
  const router = useRouter();
  const statusColorMap: Record<string, ChipProps["color"]> = {
    approved: "success",
    pending: "warning",
    rejected: "danger",
  };

  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "date",
    "from",
    "to",
    "note",
    "status",
    "actions",
  ];

  const columns = [
    { name: "ชื่อ", uid: "name" },
    { name: "วันที่", uid: "date", sortable: true },
    { name: "จาก", uid: "from", sortable: true },
    { name: "ถึง", uid: "to", sortable: true },
    { name: "หมายเหตุ", uid: "note" },
    { name: "สถานะ", uid: "status", sortable: true },
    { name: "แก้ไข", uid: "actions" },
  ];

  const statusOptions = [
    { name: "อนุมัติ", uid: "approved" },
    { name: "กำลังรอ", uid: "pending" },
    { name: "ปฏิเสธ", uid: "rejected" },
  ];

  const [filterValue, setFilterValue] = React.useState("");

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "from",
    direction: "descending",
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
    let filteredUsers = [...overtimes];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.employeeName.toLowerCase().includes(filterValue.toLowerCase()),
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
  }, [overtimes, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Overtime] as Date;
      const second = b[sortDescriptor.column as keyof Overtime] as Date;
      // const cmp = first < second ? -1 : first > second ? 1 : 0;
      if (!first || !second) return 0;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateOvertime = api.company.updateOvertime.useMutation({
    async onSuccess() {
      toast.success("Leave updated successfully");
      router.refresh();
    },
    async onError(error) {
      toast.error(error.message);
    },
  });

  const handleApprove = async (id: string) => {
    updateOvertime.mutate({ id, status: "approved" });
  };

  const handleReject = async (id: string) => {
    updateOvertime.mutate({ id, status: "rejected" });
  };

  const renderCell = React.useCallback(
    (overtime: Overtime, columnKey: React.Key) => {
      // const cellValue = leave[columnKey as keyof LeaveObject];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                src: GravatarImage({ email: overtime.employeeEmail }),
                radius: "lg",
              }}
              description={overtime.employeeEmail}
              name={overtime.employeeName}
            >
              {overtime.employeeName}
            </User>
          );

        case "date":
          return moment(overtime.date).format("DD/MM/YYYY");

        case "from":
          return (
            overtime.from.split(":")[0] + ":" + overtime.from.split(":")[1]
          );

        case "to":
          return overtime.to.split(":")[0] + ":" + overtime.to.split(":")[1];
        case "note":
          return overtime.note;

        case "status":
          return (
            <Chip
              // className="capitalize"
              color={statusColorMap[overtime.status]}
              size="sm"
              variant="flat"
            >
              {overtime.status == "approved"
                ? "ยอมรับ"
                : overtime.status == "pending"
                  ? "กำลังรอ"
                  : "ปฏิเสธ"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="success" content="อนุมัติ" className="text-white">
                <span
                  className="cursor-pointer text-lg text-success active:opacity-50"
                  onClick={async () => {
                    await handleApprove(overtime.id);
                  }}
                >
                  <Icon icon="ion:checkmark-outline" />
                  {/* <MdCheck /> */}
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Decline">
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={async () => {
                    await handleReject(overtime.id);
                  }}
                >
                  <Icon icon="ion:close-outline" />
                  {/* <MdClose /> */}
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [],
  );

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
            className="w-full rounded-xl sm:max-w-[44%]"
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
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            ทั้งหมด {overtimes.length} รายการ
          </span>
          <label className="flex items-center text-small text-default-400">
            แถวต่อหน้า :
            <select
              className="text-small text-default-400 outline-none"
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
    overtimes.length,
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
      <TableBody emptyContent={"ไม่พบรายการ"} items={sortedItems}>
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
