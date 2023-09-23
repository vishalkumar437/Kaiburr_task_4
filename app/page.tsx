"use client"

import { useEffect, useState } from 'react';
import CreateServer from './Create/page';
import UpdateServer from './Update/page';
import DeleteServer from './Delete/page'
import axios from 'axios';
interface server{
  id:string;
  name:string;
  language:string;
  framework:string
}
export default function Home() {
  const [servers, setServers] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);

  const fetchServers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getServers",{
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      setServers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const handleActionClick = (action: any) => {
    setSelectedAction(action);
  };

  return (
    <main>
        <div>
        <h1 className="text-2xl text-center m-4 ">Kaiburr Assignment</h1>
      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">Framework</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server:server) => (
            <tr key={server.id}>
              <td className="border p-2">{server.id}</td>
              <td className="border p-2">{server.name}</td>
              <td className="border p-2">{server.language}</td>
              <td className="border p-2">{server.framework}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-4 text-center">
        <button onClick={() => handleActionClick('create')} className="mr-4 px-4 py-2 bg-green-500 text-white rounded">
          Create
        </button>
        <button onClick={() => handleActionClick('update')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
          Update
        </button>
        <button onClick={() => handleActionClick('delete')} className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>

      {selectedAction === 'create' && <CreateServer fetch={fetchServers}/>}
      {selectedAction === 'update' && <UpdateServer fetch={fetchServers}/>}
      {selectedAction === 'delete' && <DeleteServer fetch={fetchServers}/>}
    </div>
    </main>
  )
}
