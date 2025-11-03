export default async function DoctorDetailPage(
  props: PageProps<"/patient/doctors/[slug]">,
) {
  const { slug } = await props.params;
  return <h1>Hello, doctor with id of {slug}</h1>;
}
