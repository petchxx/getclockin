import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";

type Props = {
  id: string;
};

export default function DeleteEmployee({ id }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const deleteEmployee = api.employee.delete.useMutation({
    onSuccess() {
      router.refresh();
      toast.success("ลบพนักงานสำเร็จ");
    },
    onError() {
      router.refresh();
      toast.error("ลบพนักงานไม่สำเร็จ");
    },
  });
  async function handleDelete() {
    deleteEmployee.mutate({ id });
  }
  return (
    <div>
      <span
        className="cursor-pointer text-lg text-danger active:opacity-50"
        onClick={() => onOpen()}
      >
        <Icon icon="ion:trash-outline" />
        {/* <MdDeleteOutline /> */}
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ลบพนักงาน
              </ModalHeader>
              <ModalBody>
                <p>แน่ใจหรือว่าต้องการลบพนักงาน</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ปิด
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete()}
                  onPress={onClose}
                >
                  ยืนยัน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
