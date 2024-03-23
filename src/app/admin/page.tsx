import {auth} from "@clerk/nextjs";
import {authorizedAdmins} from "@/constants/authorizedAdmins";
import AdminNotAuthorized from "@/components/AdminNotAuthorized/AdminNotAuthorized";
import AdminPage from "@/components/AdminPage/AdminPage";

export default function Page() {
  const { userId } = auth()
  return authorizedAdmins.includes(userId!) ? <AdminPage /> : <AdminNotAuthorized />
}