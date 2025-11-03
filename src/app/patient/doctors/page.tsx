import DoctorFilter from "@/components/DoctorFilter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Mediconnect | Doctors",
  description:
    "View and browse verified doctors, check their specializations, and book appointments.",
};
export default function Page() {
  return (
    <section>
      <div>
        <h1 className="text-xl font-semibold">Find Your ideal Doctor</h1>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Search and connect with top-rated healthcare professionals tailored to
          your needs.
        </p>
      </div>
      <div className="mt-4">
        <Form
          action={"/patient/doctors"}
          className="flex w-full flex-1 items-center gap-2"
        >
          <InputGroup className="py-5">
            <InputGroupInput placeholder="Enter doctor's name" />

            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Button className="py-5 font-semibold">Find Doctors</Button>
        </Form>
      </div>
      <div className="mt-4 flex justify-end">
        <DoctorFilter />
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <Avatar className="size-10">
                  <AvatarImage src="https://flagcdn.com/at.svg" alt="doctor" />
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold">
                    Dr. laurence heidenreich
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal capitalize">
                    ophthalmology
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-sm">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Years of Experience:
                </p>
                <span className="font-medium">15 Years</span>
              </div>
              <div className="mb-3 text-sm">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Price
                </p>
                <span className="font-medium">$433.82/hour</span>
              </div>
              <div className="mb-3 text-sm">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Available
                </p>
                <span className="font-medium">6:00 AM - 9:00 PM</span>
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <Link
                href={{ pathname: `/patient/doctors/${12}` }}
                className="w-full"
              >
                <Button className="w-full">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
