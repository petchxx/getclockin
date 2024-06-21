import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { ThemeSwitcher } from "../../ThemeSwitcher";

export default function AppLink() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex gap-2">
      <Button onPress={onOpen} isIconOnly variant="light">
        <Icon icon="ion:link-outline" fontSize={24} />
        {/* <IoLinkSharp className="" fontSize={20} /> */}
      </Button>
      <ThemeSwitcher />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                เข้าใช้งาน Application
              </ModalHeader>
              <ModalBody className="">
                <p className="text-sm">คัดลอกลิงค์</p>

                <Snippet
                  variant="bordered"
                  symbol={
                    <div className="flex gap-2">
                      {/* <IoLinkSharp className="" fontSize={20} /> */}
                    </div>
                  }
                >
                  https://getclockin.com/app
                </Snippet>
                <p className="mt-2 text-sm">หรือแชร์ไปยัง</p>

                <div className="">
                  {/* <LineShareButton */}
                  {/*   url={"https://getclockin.com/app"} */}
                  {/*   title={ */}
                  {/*     "next-share is a social share buttons for your next React apps." */}
                  {/*   } */}
                  {/* > */}
                  {/*   <LineIcon className="rounded-full" size={40} /> */}
                  {/* </LineShareButton> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  ตกลง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
