"use client";
import React, { useEffect } from "react";

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
  Select,
  SelectItem,
  Card,
} from "@nextui-org/react";
import { type History, type Clock } from "~/lib/interface/clock";
import { type Employee } from "~/lib/interface/employee";
import GravatarImage from "../GravatarImage";
import { api } from "~/trpc/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// type User = {
//   id: number;
//   name: string;
//   role: string;
//   team: string;
//   status: string;
//   age: string;
//   avatar: string;
//   email: string;
// };
//
export default function HistoryPage() {
  const router = useRouter();
  const statusColorMap: Record<string, ChipProps["color"]> = {
    present: "success",
    absent: "danger",
  };

  const INITIAL_VISIBLE_COLUMNS = ["name", "date", "in", "out", "status"];

  const columns = [
    { name: "ชื่อ", uid: "name", sortable: true },
    { name: "วันที่", uid: "date", sortable: true },
    { name: "เข้างาน", uid: "in" },
    { name: "ออกงาน", uid: "out" },
    { name: "หมายเหตุเข้างาน", uid: "in_note" },
    { name: "หมายเหตุออกงาน", uid: "out_note" },
    { name: "สถานที่เข้างาน", uid: "in_location" },
    { name: "สถานที่ออกงาน", uid: "out_location" },
    { name: "สถานะ", uid: "status" },
  ];

  const statusOptions = [
    { name: "เข้างาน", uid: "present" },
    { name: "ขาดงาน", uid: "absent" },
    { name: "วันหยุด", uid: "offday" },
  ];
  const [filterValue, setFilterValue] = React.useState("");
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee | null>();
  const [from, setFrom] = React.useState(
    moment().startOf("month").format("YYYY-MM-DD"),
  );
  const [to, setTo] = React.useState(moment().format("YYYY-MM-DD"));
  const [history, setHistory] = React.useState<History[]>([]);

  const getEmployees = api.employee.getAll.useQuery();
  const [showCalculate, setShowCalculate] = React.useState(false);

  useEffect(() => {
    if (getEmployees.data) {
      setEmployees(getEmployees.data as Employee[]);
    }
  }, [getEmployees.data]);

  const getClocks = api.company.getHistory.useMutation({
    async onSuccess(data) {
      await generateHistory(data);
      console.log("data");
      console.log(data);
    },
  });

  async function getData(selectedEmployee: Employee | null = null) {
    console.log(selectedEmployee);
    console.log(from); // 2022-10-01;
    console.log(to);
    if (!selectedEmployee) {
      return toast.error("กรุณาเลือกพนักงาน");
    }

    getClocks.mutate({
      id: selectedEmployee?.id ?? "",
      from: from, // moment(from).toDate(
      to: to,
    });
  }

  async function generateHistory(clock: Clock[]) {
    const dateArray: Date[] = [];
    const currentDate = new Date(from);
    const endDateObj = new Date(to);

    while (currentDate <= endDateObj) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("dateArray");
    console.log(dateArray);
    const mixedData: History[] = [];
    dateArray.forEach((date) => {
      const entry = clock.find(
        (c) =>
          new Date(c.date_time).getDate() == date.getDate() &&
          new Date(c.date_time).getMonth() == date.getMonth() &&
          new Date(c.date_time).getFullYear() == date.getFullYear() &&
          c.status == "in",
      );
      const outEntry = clock.find(
        (c) =>
          new Date(c.date_time).getDate() == date.getDate() &&
          new Date(c.date_time).getMonth() == date.getMonth() &&
          new Date(c.date_time).getFullYear() == date.getFullYear() &&
          c.status == "out",
      );
      mixedData.push({
        employee_id: selectedEmployee?.id ?? "",
        status: entry
          ? "present"
          : selectedEmployee?.off_days.includes(
                moment(date, "DD/MM/YYYY").format("dddd"),
              )
            ? "offday"
            : "absent",
        date: date,
        in_date_time: entry?.date_time ?? null,
        in_note: entry?.note ?? null,
        in_location: entry?.location ?? null,
        out_date_time: outEntry?.date_time ?? null,
        out_note: outEntry?.note ?? null,
        out_location: outEntry?.location ?? null,
      });
    });
    setHistory(mixedData);
    //TODO
    console.log(mixedData);
  }

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
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
    let filteredUsers = [...history].reverse();

    // if (hasSearchFilter) {
    //   filteredUsers = filteredUsers.filter((employee) =>
    //     employee.name.toLowerCase().includes(filterValue.toLowerCase()),
    //   );
    // }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((history: History) =>
        Array.from(statusFilter).includes(history.status),
      );
    }

    return filteredUsers;
  }, [history, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: History, b: History) => {
      const first = a[sortDescriptor.column as keyof History] as number | Date;
      const second = b[sortDescriptor.column as keyof History] as number | Date;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (item: History, columnKey: React.Key, selectedEmployee: Employee) => {
      const cellValue = item[columnKey as keyof History];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: GravatarImage({ email: selectedEmployee?.email }),
              }}
              description={selectedEmployee?.email}
              name={selectedEmployee?.name}
            >
              {selectedEmployee?.email}
            </User>
          );
        case "date":
          return (
            <p className="text-bold text-small capitalize">
              {moment(item.date).format("DD / MM / YYYY")}
            </p>
          );
        case "in":
          return item.in_date_time ? (
            <p className="text-bold text-small capitalize">
              {moment(item.in_date_time).format("HH:mm")}{" "}
              <p className="text-xs">
                {calculateEarlyLate(
                  selectedEmployee?.start_time,
                  selectedEmployee?.stop_time,
                  "in",
                  item.in_date_time,
                )}
              </p>
            </p>
          ) : (
            <p className="text-zinc-400">[ ว่าง ]</p>
          );
        case "out":
          return item.out_date_time ? (
            <p className="text-bold text-small capitalize">
              {moment(item.out_date_time).format("HH:mm")}{" "}
              <p className="text-xs">
                {calculateEarlyLate(
                  selectedEmployee?.start_time,
                  selectedEmployee?.stop_time,
                  "out",
                  item.out_date_time,
                )}
              </p>
            </p>
          ) : (
            <p className="text-zinc-400">[ ว่าง ]</p>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {selectedEmployee?.role}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {selectedEmployee?.role}
              </p>
            </div>
          );
        case "in_location":
          return item.in_location ? (
            <p
              onClick={() => {
                router.push(`${item.in_location}`);
              }}
              className="text-bold cursor-pointer text-small capitalize text-primary underline"
            >
              Location
            </p>
          ) : (
            <p className="text-zinc-400">[ ว่าง ]</p>
          );
        case "out_location":
          return item.out_location ? (
            <p
              onClick={() => {
                router.push(`${item.out_location}`);
              }}
              className="text-bold cursor-pointer text-small capitalize text-primary underline"
            >
              Location
            </p>
          ) : (
            <p className="text-zinc-400">[ ว่าง ]</p>
          );

        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[item.status]}
              size="sm"
              variant="flat"
            >
              {item.status === "present"
                ? "เข้างาน"
                : item.status === "absent"
                  ? "ขาดงาน"
                  : item.status === "offday"
                    ? "วันหยุด"
                    : "ไม่ทราบ"}
            </Chip>
          );
        case "in_note":
          return item.in_note ? (
            <p className="text-bold text-small capitalize">{item.in_note}</p>
          ) : (
            <p className="text-zinc-400">[ ว่าง ]</p>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    {/* <VerticalDotsIcon className="text-default-300" /> */}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          if (cellValue instanceof Date) {
            return moment(cellValue).format("YYYY-MM-DD HH:mm");
          }
          if (cellValue === null) {
            return <p className="text-zinc-400">[ ว่าง ]</p>;
          }
          return cellValue;
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

  const [lateCount, setLateCount] = React.useState(0);
  const [outEarlyCount, setOutEarlyCount] = React.useState(0);

  const calculateEarlyLate = (
    start: string,
    stop: string,
    status: string,
    clock_date_time: Date,
  ) => {
    const today = moment().startOf("day"); // Get the start of the current day

    // Set the date part of each time to today
    const start_time = moment(start, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const stop_time = moment(stop, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const clock_time = moment(clock_date_time).set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    if (status === "in") {
      const difference = clock_time.diff(start_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-foreground/50">
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        setLateCount((prev) => prev + 1);
        return (
          <p className="text-red-500">
            สาย {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }

    if (status === "out") {
      const difference = clock_time.diff(stop_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        setOutEarlyCount((prev) => prev + 1);
        return (
          <p className="text-red-500">
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-foreground/50">
            เกิน {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          {/* <Input */}
          {/*   isClearable */}
          {/*   className="w-full sm:max-w-[44%]" */}
          {/*   placeholder="Search by name..." */}
          {/*   startContent={<SearchIcon />} */}
          {/*   value={filterValue} */}
          {/*   onClear={() => onClear()} */}
          {/*   onValueChange={onSearchChange} */}
          {/* /> */}
          {/* <div className="flex gap-3"> */}
          {/*   <Dropdown> */}
          {/*     <DropdownTrigger className="hidden sm:flex"> */}
          {/*       <Button */}
          {/*         // endContent={<ChevronDownIcon className="text-small" />} */}
          {/*         variant="flat" */}
          {/*       > */}
          {/*         Status */}
          {/*       </Button> */}
          {/*     </DropdownTrigger> */}
          {/*     <DropdownMenu */}
          {/*       disallowEmptySelection */}
          {/*       aria-label="Table Columns" */}
          {/*       closeOnSelect={false} */}
          {/*       selectedKeys={statusFilter} */}
          {/*       selectionMode="multiple" */}
          {/*       onSelectionChange={setStatusFilter} */}
          {/*     > */}
          {/*       {statusOptions.map((status) => ( */}
          {/*         <DropdownItem key={status.uid} className="capitalize"> */}
          {/* {capitalize(status.name)} */}
          {/*           status.name */}
          {/*         </DropdownItem> */}
          {/*       ))} */}
          {/*     </DropdownMenu> */}
          {/*   </Dropdown> */}
          {/*   <Dropdown> */}
          {/*     <DropdownTrigger className="hidden sm:flex"> */}
          {/*       <Button */}
          {/*         // endContent={<ChevronDownIcon className="text-small" />} */}
          {/*         variant="flat" */}
          {/*       > */}
          {/*         Columns */}
          {/*       </Button> */}
          {/*     </DropdownTrigger> */}
          {/*     <DropdownMenu */}
          {/*       disallowEmptySelection */}
          {/*       aria-label="Table Columns" */}
          {/*       closeOnSelect={false} */}
          {/*       selectedKeys={visibleColumns} */}
          {/*       selectionMode="multiple" */}
          {/*       onSelectionChange={setVisibleColumns} */}
          {/*     > */}
          {/*       {columns.map((column) => ( */}
          {/*         <DropdownItem key={column.uid} className="capitalize"> */}
          {/* {capitalize(column.name)} */}
          {/*           column.name */}
          {/*         </DropdownItem> */}
          {/*       ))} */}
          {/*     </DropdownMenu> */}
          {/*   </Dropdown> */}
          {/*   <Button color="primary" endContent={<></>}> */}
          {/*     Add New */}
          {/*   </Button> */}
          {/* </div> */}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {history.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
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
    history.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
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
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const [add, setAdd] = React.useState<number | null>();
  const [deduct, setDeduct] = React.useState<number | null>();
  const [showCalculateButton, setShowCalculateButton] = React.useState(false);

  const getPresent = (history: History[]) => {
    const presentEntries = history.filter(
      (entry) => entry.status === "present",
    );
    return presentEntries.length;
  };

  const getAbsent = (history: History[]) => {
    const absentEntries = history.filter((entry) => entry.status === "absent");
    return absentEntries.length;
  };

  const getOffday = (history: History[]) => {
    const offdayEntries = history.filter((entry) => entry.status === "offday");
    return offdayEntries.length;
  };

  const getTotal = () => {
    if (!selectedEmployee) {
      return 0;
    }
    const addValue = add ?? 0;
    const deductValue = deduct ?? 0;
    const change = addValue - deductValue;
    return selectedEmployee?.salary + change;
  };

  return (
    <div className="mt-4 ">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Select
          label="พนักงาน"
          placeholder="เลือกพนักงาน"
          className="max-w-xs rounded-xl "
          variant="bordered"
          onChange={async (e) => {
            const selected = employees.find(
              (employee) => employee.id == e.target.value,
            );
            setSelectedEmployee(selected);
            await getData(selected);
            setShowCalculateButton(true);
            // employees.find((employee: any) => employee.id == e.target.value),
            // setShowCalculate(false);
            setLateCount(0);
            setOutEarlyCount(0);
            setAdd(0);
            setDeduct(0);
          }}
        >
          {employees.map((employee: Employee) => (
            <SelectItem key={employee.id} value={employee.id}>
              {employee.name}
            </SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input
            className="w-40 rounded-xl "
            type="date"
            variant="bordered"
            label="จาก"
            value={from}
            onChange={async (e) => {
              setFrom(e.target.value);
              await getData(selectedEmployee);
            }}
          />
          <Input
            className="w-40 rounded-xl "
            type="date"
            value={to}
            label="ถึง"
            variant="bordered"
            onChange={async (e) => {
              setTo(e.target.value);
              await getData(selectedEmployee);
            }}
          />
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={"V"} variant="flat" className="h-14">
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
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={"V"} variant="flat" className="h-14">
                เพิ่มเติม
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
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* <Button */}
        {/*   color="primary" */}
        {/*   className="w-40" */}
        {/*   size="lg" */}
        {/*   onClick={async () => { */}
        {/*     await getData(); */}
        {/*   }} */}
        {/* > */}
        {/*   ค้นหา */}
        {/* </Button> */}
        {showCalculateButton && (
          <Button
            color="primary"
            className="h-14 w-40"
            size="lg"
            // variant="flat"
            onClick={() => {
              setShowCalculate(!showCalculate);
              console.log(history);
            }}
          >
            คำนวนเงินเดือน
          </Button>
        )}
      </div>
      {showCalculate && (
        <Card className="p-4">
          <p className="font-bold">เงินเดือน</p>
          <>พนักงาน : {selectedEmployee?.name}</>
          {/* get present count without duplicate date */}
          <p>เข้างาน : {getPresent(history)} วัน</p>
          {/* get absent */}
          <p>ขาดงาน : {getAbsent(history)} วัน</p>
          {/* get offday */}
          <p>วันหยุด : {getOffday(history)} วัน</p>
          <p>มาสาย : {lateCount} วัน</p>
          <p>ออกก่อนเวลา : {outEarlyCount} วัน</p>
          <p>เงินเดือน : {selectedEmployee?.salary} บาท</p>
          <div className="mt-4 flex gap-2">
            <Input
              className="w-40 rounded-xl "
              type="number"
              variant="bordered"
              label="เพิ่มเงินเดือน"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-small text-default-400">+</span>
                </div>
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-small text-default-400">บาท</span>
                </div>
              }
              value={add}
              onChange={(e) => {
                if (parseInt(e.target.value) < 0) {
                  toast.error("เพิ่มเงินต้องมากกว่า 0");
                  return;
                }

                setAdd(e.target.value);
              }}
            />
            <Input
              className="w-40 rounded-xl "
              type="number"
              variant="bordered"
              label="หักเงินเดือน"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-small text-default-400">-</span>
                </div>
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-small text-default-400">บาท</span>
                </div>
              }
              // value={}
              onChange={(e) => {
                const salary = selectedEmployee?.salary ?? 0;
                if (parseInt(e.target.value) > salary) {
                  toast.error("หักเงินเกินจำนวนเงินที่ได้รับ");
                  return;
                }
                if (parseInt(e.target.value) < 0) {
                  toast.error("หักเงินต้องมากกว่า 0");
                  return;
                }
                setDeduct(e.target.value);
              }}
            />
          </div>
          <p className="mt-4 flex gap-2">
            รวม : <p className="font-bold text-primary"> {getTotal()} บาท</p>
          </p>
        </Card>
      )}

      <Table
        className="mt-4 "
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] overflow-y-auto",
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
        <TableBody emptyContent={"ไม่พบประวัติ"} items={sortedItems}>
          {(item: History) => (
            <TableRow key={item.date.toString()}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey, selectedEmployee!)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
