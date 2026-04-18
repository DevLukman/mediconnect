import doctorImage from "@/app/doctor-bg.jpg";
import { PatientBookingsForm } from "@/components/patient/PatientBookingsForm";
import { ReviewModal } from "@/components/patient/ReviewModal";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DoctorDetails } from "@/lib/action/doctorAction";
import { IconStarFill } from "@intentui/icons";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Pencil } from "lucide-react";
import Image from "next/image";
export async function generateMetadata(
  props: PageProps<"/patient/doctors/[doctorId]">,
) {
  const { doctorId } = await props.params;
  const data = await DoctorDetails(doctorId);
  if (!data) {
    return {
      title: "Mediconnect | Doctor Not Found",
    };
  }

  return {
    title: `Mediconnect | ${data.user.name}`,
    description: data.bio,
  };
}
export default async function DoctorDetailPage(
  props: PageProps<"/patient/doctors/[doctorId]">,
) {
  const { doctorId } = await props.params;
  const data = await DoctorDetails(doctorId);
  if (!data) {
    throw new Error("Doctor not found");
  }
  return (
    <section className="relative">
      <div className="relative h-60 w-full">
        <Image src={doctorImage} alt={data?.user.name} fill />
      </div>
      <div className="mb-4 -translate-y-12 px-6">
        <div
          className="mb-4 size-24 rounded-full border-4 border-white bg-cover bg-center p-1 shadow-lg"
          style={{ backgroundImage: `url(${data.user.image})` }}
          aria-label={data.user.name}
        />
        <h2 className="text-foreground mb-1 text-2xl font-semibold capitalize">
          Dr. {data.user.name}
        </h2>
        <p className="text-muted-foreground font-inter text-sm md:text-base">
          {data.bio}
        </p>
        <div className="mt-5 flex items-center gap-x-2">
          <ReviewModal name={data.user.name} />
          <PatientBookingsForm doctorId={doctorId} name={data.user.name} />
        </div>
        <Separator className="mt-4" />
        <div className="mt-6">
          <h3 className="mb-2 text-base font-semibold">About the doctor</h3>
          <p className="text-muted-foreground font-inter text-sm md:text-base">
            Dr. <span className="capitalize">{data.user.name}</span> is a highly
            skilled and experienced medical professional dedicated to providing
            exceptional patient care. With a strong background in their
            specialized field, they bring a wealth of knowledge and expertise to
            every consultation. Throughout their career, Dr.{" "}
            <span className="capitalize">{data.user.name}</span> has
            consistently demonstrated a commitment to staying at the forefront
            of medical advancements. They are passionate about employing the
            latest techniques and technologies to ensure the best possible
            outcomes for their patients. Known for their compassionate approach
            and excellent communication skills, Dr.{" "}
            <span className="capitalize">{data.user.name}</span> strives to
            create a comfortable and supportive environment for all patients.
            They believe in personalized care and work closely with each
            individual to develop tailored treatment plans that address their
            unique needs and concerns.
          </p>{" "}
        </div>
        <div className="mt-5">
          <h4>Reviews (1 Reviews)</h4>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="shadow-xs">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-4">
                    <Avatar className="size-10">
                      <AvatarImage
                        src="https://flagcdn.com/at.svg"
                        alt="doctor"
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">
                        Dr. laurence heidenreich
                      </p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IconStarFill
                            key={star}
                            className="size-5 text-yellow-400 transition-colors duration-150"
                          />
                        ))}
                      </div>
                    </div>
                  </CardTitle>
                  <Button variant={"ghost"} type="button">
                    <Pencil />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm font-normal">
                  Known for their compassionate approach and excellent
                  communication skills, Dr. danilm strives to create a
                  comfortable and supportive environment for all patients. They
                  believe in personalized care and work closely with each
                  individual to develop tailored treatment plans that address
                  their unique needs and concerns.
                </p>
              </CardContent>
              <CardFooter className="text-foreground mt-3 text-sm font-normal">
                22 hours ago
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
