'use client';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  blogs: IBlog[];
}
function AppTable(props: IProps) {
  const { blogs } = props;

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog | null>(null);

  const handleDeleteBtn = (id: number) => {
    if (confirm('Are you sure you want to delete this blog? ' + id)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.success('Successfully deleted');
            mutate('http://localhost:8000/blogs');
          }
        });
    }
  };

  const handleCreateBtn = () => {
    setShowModalCreate(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h1>Table Blogs</h1>{' '}
        <Button
          variant="info"
          className="text-white"
          onClick={() => handleCreateBtn()}
        >
          Add Blog
        </Button>
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Author</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td className="text-center">
                  <Link className="btn btn-primary" href={`/blogs/${item.id}`}>
                    View
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setBlog(item);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBtn(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModal
        setShowModalCreate={setShowModalCreate}
        showModalCreate={showModalCreate}
      ></CreateModal>
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      ></UpdateModal>
    </div>
  );
}

export default AppTable;
