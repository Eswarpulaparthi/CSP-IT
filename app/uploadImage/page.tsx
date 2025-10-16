import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PlantUpload from "@/components/plantUpload2";
export default async function About() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  if (!session) {
    return null;
  }
  return (
    <>
      {/* <div>Welcome {session.user.name}</div> */}
      <PlantUpload />
    </>
  );
}
