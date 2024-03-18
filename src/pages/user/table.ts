interface DataType {
  key: string
  name: string
  age: number
  address: string
}

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '20%',
  },
]

export const mockData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  //   {
  //     key: '2',
  //     name: 'Joe Black',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Jim Green',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
]
