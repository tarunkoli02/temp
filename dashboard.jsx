import React, { useState, useEffect } from "react";
import { dummyData } from "../dummyData";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  useEffect(()=>{
    const userData = getUsersData();

    // If users are not paginated from backend
    const paginatedUsers = userData.slice(
        (currentPage-1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    
    setTotalPages(Math.ceil(userData.length / itemsPerPage));
    setUsers(paginatedUsers);
  },[currentPage]);

  const getUsersData = () => {
    const data = dummyData;
    return data;
  };

  
  const handleSelectedRow = (row) => {

    if(selectedRows.includes(row)){
        const deselected = selectedRows.filter(id => id !== row);
        setSelectedRows(deselected);
    }else{
        const selected = [...selectedRows, row];
        setSelectedRows(selected);
    }
    
  }

  const handleSelectAll = ()=>{
    
    if(selectAll){
          setSelectedRows([]);
    }else{
        const selected = [];
        users.forEach((user)=>{
            selected.push(user.id);
        })
        setSelectedRows(selected);
    }

    setSelectAll(selected=>!selected);
  };

  const changePage = (page) => {
    console.log("clicked");
    setSelectAll(false);
    setSelectedRows([]);
    setCurrentPage(page);
  }

  return (
    <section className="Dashboard">
      <table>
        <thead>
          <tr className="m-5">
            <th className="p-3">
              <input type="checkbox" onChange={handleSelectAll}/>
            </th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user,i)=>{
                return <tr key={i}>
                <td className="p-3">
                  <input type="checkbox" checked={selectedRows.includes(user.id) || selectAll} onChange={()=>handleSelectedRow(user.id)} />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="d-flex p-3">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>;
            })}
        </tbody>
      </table>
      <div className="pages">
      {[...Array(totalPages).keys()].map((page) => (
        <span key={page+1} className="p-3" onClick={()=>changePage(page+1)}>{page+1}</span>
      ))}
      </div>
    </section>
  );
};

export default Dashboard;
