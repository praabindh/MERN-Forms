import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "./AccordionComponent.css";

const AccordionComponent = ({ users, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const showModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onDelete(selectedUserId);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Birth Date",
            dataIndex: "dob",
            key: "dob",
            align: "center",
            render: (dob) => moment(dob).format("YYYY-MM-DD"),
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            align: "center",
        },
        {
            title: "UUID",
            dataIndex: "_id",
            key: "_id",
            align: "center",
        },
        {
            title: "Action",
            key: "delete",
            align: "center",
            render: (text, record) => (
                <Button
                    type="link"
                    icon={<DeleteOutlined style={{ color: "red" }} />}
                    onClick={() => showModal(record._id)}
                />
            ),
        },
    ];

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "5px" }}>
            <h2 align="center">Data Overview</h2>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: users.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '15'],
                    showTotal: (total) => `Total ${total} Items`,
                    position: ['bottomCenter'],
                }}
                onChange={handleTableChange}
            />
            <Modal
                title="Confirm Deletion"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                maskStyle={{ backdropFilter: "blur(5px)" }}
            >
                <p>Are You Sure To Delete This User?</p>
            </Modal>
        </div>
    );
};

export default AccordionComponent;