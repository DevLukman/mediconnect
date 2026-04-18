import DoctorFilter from "@/components/doctor/DoctorFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { DoctorLists } from "@/lib/action/doctorAction";
import { formatToDollar } from "@/lib/utils";
import { format } from "date-fns";
import { Annoyed, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mediconnect | Doctors",
  description:
    "View and browse verified doctors, check their specializations, and book appointments.",
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return format(date, "h:mm a");
};

const formatTimeRange = (startTime: string, endTime: string) => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

type PageProps = {
  searchParams: Promise<{
    name?: string;
    specialty?: string;
    minExperience?: string;
    maxExperience?: string;
    startTime?: string;
    endTime?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await DoctorLists({
    name: params.name,
    specialty: params.specialty,
    minExperience: params.minExperience
      ? Number.isNaN(Number(params.minExperience))
        ? undefined
        : Number(params.minExperience)
      : undefined,
    maxExperience: params.maxExperience
      ? Number.isNaN(Number(params.maxExperience))
        ? undefined
        : Number(params.maxExperience)
      : undefined,
    startTime: params.startTime || undefined,
    endTime: params.endTime || undefined,
  });

  return (
    <section className="mt-18 px-5 pb-10 md:mt-8 md:px-8">
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
            <InputGroupInput name="name" placeholder="Enter doctor's name" />
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
        {data.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={doctor.user.image ?? undefined}
                        alt={doctor.user.name}
                      />
                      <AvatarFallback>
                        {doctor.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h2 className="text-base font-semibold capitalize">
                        Dr. {doctor.user.name}
                      </h2>
                      <p className="text-muted-foreground text-sm font-normal capitalize">
                        {doctor.specialty}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 text-sm">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Years of Experience:
                    </p>
                    <span className="font-medium">
                      {doctor.yearsOfExperience} Years
                    </span>
                  </div>
                  <div className="mb-3 text-sm">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Price
                    </p>
                    <span className="font-medium">
                      {formatToDollar(doctor.consultationFee)}/hour
                    </span>
                  </div>
                  <div className="mb-3 text-sm">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Available
                    </p>
                    <span className="font-medium">
                      {formatTimeRange(doctor.startTime, doctor.endTime)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="w-full">
                  <Link
                    href={{ pathname: `/patient/doctors/${doctor.id}` }}
                    className="w-full"
                  >
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              <Annoyed size={100} />
            </div>
            <p className="font-inter text-center text-base">
              We couldn&apos;t find any doctors matching your search. Try a
              different name or clear your filters.
            </p>
            <Link href="/patient/doctors">
              <Button variant="default" size="lg" className="text-base">
                Clear search
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
