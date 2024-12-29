import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/users");
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error Fetching Users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getLocationData = () => {
        const locationCounts = users.reduce((acc, user) => {
            acc[user.location] = (acc[user.location] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(locationCounts),
            datasets: [
                {
                    label: "Location Visualization",
                    data: Object.values(locationCounts),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    const getGenderData = () => {
        const genderCounts = users.reduce((acc, user) => {
            acc[user.gender] = (acc[user.gender] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(genderCounts),
            datasets: [
                {
                    label: "Gender Visualization",
                    data: Object.values(genderCounts),
                    backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
                    borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h2 align="center">Statistics</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ flex: 1, marginRight: "20px" }}>
                        <h3 align="center">Users By Location</h3>
                        <Bar data={getLocationData()} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Location Basis" } } }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 align="center">Users By Gender</h3>
                        <Pie data={getGenderData()} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Gender Basis" } } }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;