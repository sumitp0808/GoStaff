import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { useEffect } from 'react';


const View = () => {
    const [salaries, setSalaries] = useState([]);
    const { id } = useParams();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                let sno = 1;
                const data = await response.data.salaries.map((sal) => (
                    {
                        _id: sal._id,
                        sno: sno++,
                        employeeId: sal.employeeId,
                        basicSalary: sal.basicSalary,
                        allowances: sal.allowances,
                        deductions: sal.deductions,
                        netSalary: sal.netSalary,
                        payDate: new Date(sal.payDate).toLocaleDateString(),
                    }
                ));
                setSalaries(data);
            }
        } catch (error) {
            if (error.reponse && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const columns = [
        {
            name: "S No",
            selector: (row) => row.sno
        },
        {
            name: "Employee ID",
            selector: (row) => row.employeeId.employeeId,
            sortable: true
        },
        {
            name: "Salary",
            selector: (row) => row.basicSalary
        },
        {
            name: "Allowances",
            selector: (row) => row.allowances
        },
        {
            name: "Deductions",
            selector: (row) => row.deductions
        },
        {
            name: "Total",
            selector: (row) => row.netSalary
        },
        {
            name: "Pay Date",
            selector: (row) => row.payDate,
            sortable:true
        },
    ];

    return (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Salary History</h2>
            </div>
            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={salaries}
                    pagination
                />
            </div>
        </div>
    )
}

export default View