import { Row } from '../../../../components/ui/DataTable/types';

let clientData: Row[] = [
  {
    id: 1,
    clientName: 'ABC Transport Solutions',
    contactName: 'John Doe',
    email: 'john@abctransport.com',
    contactNo: '+91-9876543210',
    panNumber: 'ABCTY1234D',
    aadharNumber: '1234-5678-9012',
    gstNumber: '27ABCTY1234D1Z5',
    stateName: 'Maharashtra',
    cityName: 'Mumbai',
    remark: 'Premium transport partner',
    status: 'active',
    createdTime: '2024-01-15',
    updatedTime: '2024-01-15',
    inactiveTime: ''
  }
];

export const clientServices = {
  getAll: async (): Promise<Row[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...clientData]), 1000);
    });
  },

  getById: async (id: string | number): Promise<Row | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const client = clientData.find(c => c.id === id);
        resolve(client || null);
      }, 500);
    });
  },

  create: async (client: Partial<Row>): Promise<Row> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newClient = {
          ...client,
          id: Math.max(...clientData.map(c => Number(c.id)), 0) + 1,
          createdTime: new Date().toISOString().split('T')[0],
          updatedTime: new Date().toISOString().split('T')[0]
        } as Row;
        clientData.push(newClient);
        resolve(newClient);
      }, 500);
    });
  },

  update: async (id: string | number, client: Partial<Row>): Promise<Row> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = clientData.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error('Client not found'));
          return;
        }
        clientData[index] = {
          ...clientData[index],
          ...client,
          updatedTime: new Date().toISOString().split('T')[0]
        };
        resolve(clientData[index]);
      }, 500);
    });
  },

  inactivate: async (id: string | number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = clientData.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error('Client not found'));
          return;
        }
        clientData[index] = {
          ...clientData[index],
          status: 'inactive',
          inactiveTime: new Date().toISOString().split('T')[0],
          updatedTime: new Date().toISOString().split('T')[0]
        };
        resolve();
      }, 500);
    });
  }
};