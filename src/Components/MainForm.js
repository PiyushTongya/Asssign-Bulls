import React, { useState } from 'react'
import 'antd/dist/reset.css'
import { Button, Input, Table, Form, Select } from 'antd'
import "../App.css"
import {EditOutlined,DeleteOutlined} from '@ant-design/icons' 

const Mainform = () => {
    const status = ["OPEN","WORKING","DONE","OVERDUE"];
    var showdate = new Date();
    const [form] = Form.useForm();
    const datamain = { Title: "", Desc: "", Tags: []};
    const [data, setData] = useState(datamain);
    const [editingRow, setEditingRow] = useState(null);
    const [records, setRecords] = useState([])
    function handleInput(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onDelete =(record) =>{
        setRecords(pre=>{
           return pre.filter(item => item.id !== record.id)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...data, id: showdate.getHours() + ':' + showdate.getMinutes()+ ':' + showdate.getSeconds()};
        setRecords([...records, newRecord]);
        setData({
            Title: "",
            Desc: "",
            Tags: []
        })
        console.log(records);
    }
    const columns = [
        {
            title: "Created On",
            dataIndex: "id"
        },
        {
            title: "Title",
            dataIndex: "Title",
            key: "Title",
            render:(text,record)=>{
                if (editingRow===record.id){
                    return <Form.Item 
                    name="Title"
                    rules={[{
                        required:true,
                        message : "Please enter a title"
                    }]}
                    >
                        <Input></Input>
                    </Form.Item>
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title: "Description",
            dataIndex: "Desc",
            key: "Desc",
            render:(text,record)=>{
                if (editingRow===record.id){
                    return <Form.Item 
                    name="Desc"
                    rules={[{
                        required:true,
                        message : "Please enter a description"
                    }]}
                    >
                        <Input></Input>
                    </Form.Item>
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title: "Actions",
            render: (_, record) => {
                return (
                    <>
                        <EditOutlined type="link" onClick={() => {
                            setEditingRow(record.id)
                            form.setFieldValue({
                                Title : record.Title,
                                Desc : record.Desc,
                            })
                        }}/>
                        <Button type='link' htmlType='submit'>Save</Button>
                        <DeleteOutlined style={{color : "red"}} onClick={()=>{
                            onDelete(record)
                        }}/>
                    </>
                )
            }
        },
        {
            title: "Tag",
            dataIndex: "Tags",
            key: "Tags"
        },
        {
            title: "Status",
            render: () => {
                return (
                    <>
                        <Select placeholder="Select the Status" style={{width:"100%"}} >
                            {
                                status.map((status,index)=>{

                                    return <Select.Option key={index} value={status}>{status}</Select.Option>
                                })
                            }
                        </Select>
                    </>
                )
            }
            
        }
    ];
    const onFinish=(values)=>{
        const updatedDataSource = [...records];
        updatedDataSource.splice(editingRow,1,{...values,id:editingRow});
        setRecords(updatedDataSource);
        setEditingRow(null);
    }
    return (
        <>
            <div className='main-form'>
                <div className='title'>
                    <h2>Title</h2>
                    <Input
                        placeholder='Add Title'
                        allowClear
                        rules={{ required: true, message: "Enter a title" }}
                        onChange={handleInput}
                        value={data.Title}
                        name='Title'
                    ></Input>
                </div>
                <div className='desc'>
                    <h2>Description</h2>
                    <Input
                        placeholder='Add Desc'
                        allowClear
                        required
                        onChange={handleInput}
                        value={data.Desc}
                        name='Desc'
                    ></Input>
                </div>
                <div className='tags'>
                    <h2>Add Tags</h2>
                    <Input
                        placeholder='Add Desc'
                        allowClear
                        onChange={handleInput}
                        value={data.Tags}
                        name='Tags'
                    >
                    </Input>
                </div>
                <div>
                    <Button
                        className='btn'
                        type='primary'
                        onClick={handleSubmit}
                    >Submit</Button>
                </div>

            </div>
            <Form form={form} onFinish={onFinish}>
                <Table
                    dataSource={records}
                    columns={columns}
                >
                </Table>
            </Form>
        </>
    )
}

export default Mainform

