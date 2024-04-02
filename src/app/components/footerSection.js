"use client";
import { Input, TextArea } from "./input";
import Button from "./button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CopyrightSection from "./copyrightSection";

const FooterSection = ({ children }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    company: "",
    inquiry: "",
  });

  const date = new Date();
  const thisYear = date.getFullYear();

  const clickAction = () => {
    if (formData.fullname && formData.company && formData.inquiry) {
      let target = `mailto:info@pinst.co.id?subject=Inquiry from PINST Website&body=Hi, saya ${formData.fullname} dari ${formData.company}. ${formData.inquiry}`;
      window.location.assign(target);
    } else {
      alert("Fullname, company, inquiry cannot be empty.");
    }
  };

  return (
    <div className="bg-b20 pt-4 flex flex-col justify-center w-full gap-8 items-center">
      <div className="box-border xl:w-90 w-full md:px-7five sm:px-4 xs:px-1 flex sm:flex-row flex-col items-start gap-1five">
        <div className="w-full flex flex-col gap-6">
          <div className="flex lg:flex-row flex-col gap-1five">
            <Input
              label="Fullname"
              type="text"
              value={formData.fullname}
              required
              onChange={(event) =>
                setFormData({ ...formData, fullname: event.target.value })
              }
            />
          </div>
          <div className="flex items-start gap-6 self-stretch">
            <Input
              label="Company"
              type="email"
              value={formData.company}
              required
              onChange={(event) =>
                setFormData({ ...formData, company: event.target.value })
              }
            />
          </div>
          <div className="flex items-start gap-6 self-stretch">
            <TextArea
              label="Inquiry"
              required
              value={formData.inquiry}
              onChange={(event) =>
                setFormData({ ...formData, inquiry: event.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
          </div>
          <Button text="Send" type="submit" clickAction={() => clickAction()} />
        </div>
        {children && (
          <div className="flex flex-col gap-6 items-start lg:w-5/12 w-full">
            <div className="font-bold sm:text-left text-center w-full">
              {children.title}
            </div>
            {children.address && (
              <div className="flex flex-row gap-0five items-start w-full relative">
                <Image
                  src="/images/icons/icon-bagage.svg"
                  alt="icon-bagage"
                  width={20}
                  height={20}
                  priority
                />
                <div className="whitespace-pre-line">{children.address}</div>
              </div>
            )}
            {children.websiteName && children.websiteLink && (
              <div className="flex flex-row gap-0five items-start w-full relative">
                <Image
                  src="/images/icons/icon-globe.svg"
                  alt="icon-globe"
                  width={20}
                  height={20}
                />
                <Link href={children.websiteLink} target="_blank" replace>
                  {children.websiteName}
                </Link>
              </div>
            )}
            {children.email && (
              <div className="flex flex-row gap-0five items-start w-full relative">
                <Image
                  src="/images/icons/icon-mail.svg"
                  alt="icon-mail"
                  width={20}
                  height={20}
                />
                <Link href={"mailto:" + children.email} target="_self">
                  {children.email}
                </Link>
              </div>
            )}
            {children.phone && (
              <div className="flex flex-row gap-0five items-start w-full relative">
                <Image
                  src="/images/icons/icon-phone.svg"
                  alt="icon-phone"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col whitespace-pre-line">
                  {children.phone}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <CopyrightSection />
    </div>
  );
};

export default FooterSection;
