import {Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr} from "@mantine/core";
import RegistrationTablePdf from "@/components/RegistrationTablePdf/RegistrationTablePdf";

export default function RegistrationTable({ registrations }: { registrations: Registration[] }) {
  const rows = registrations.map((reg) => (
    <TableTr key={reg.name}>
      <TableTd>{reg.name}</TableTd>
      <TableTd>{reg.course}</TableTd>
      <TableTd>{reg.activities.join(', ')}</TableTd>
      <TableTd>{reg.email}</TableTd>
    </TableTr>
  ));

  return (
    <div>
      <RegistrationTablePdf registrations={registrations} />
      <div>
        <TableScrollContainer minWidth={'500px'}>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Nombre</TableTh>
                <TableTh>Curso</TableTh>
                <TableTh>Actividades</TableTh>
                <TableTh>Email</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>{rows}</TableTbody>
          </Table>
        </TableScrollContainer>
      </div>
    </div>
  );
}

export interface Registration {
  name: string,
  course: string,
  email: string
  activities: string[],
}