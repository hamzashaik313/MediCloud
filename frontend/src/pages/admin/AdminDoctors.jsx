import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { getAllDoctors } from "../../api/admin";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppLayout title="Doctors">
      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}
