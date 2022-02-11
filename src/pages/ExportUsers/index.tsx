import React, { useState } from 'react';
import JSONPretty from 'react-json-pretty';

interface IUserProps {
  id: number;
  firstName: string;
  lastName: string;
  height: string;
  birthDateFormated: string;
  age: number;
}

const ExportUsers: React.FC = () => {
  const [users] = useState<IUserProps[]>(() => {
    const storageList = localStorage.getItem('@UserList:users');
    if (storageList) {
      return JSON.parse(storageList);
    }
    return [];
  });

  return <JSONPretty id="json-pretty" data={users} />;
};

export default ExportUsers;
