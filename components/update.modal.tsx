'use client';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}
function UpdateModal(props: Readonly<IProps>) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

  const handleClose = () => {
    setShowModalUpdate(false);
    setTitle('');
    setAuthor('');
    setContent('');
    setBlog(null);
  };

  const handleUpdateBtn = () => {
    if (!title || !author || !content) {
      toast.error('Not empty field !');
      return;
    }

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        author,
        content,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success('Update blog succeed !');
          mutate('http://localhost:8000/blogs');
        } else toast.error('Update blog failed !');
        handleClose();
      });

    console.log('title: ', title, 'author: ', author, 'content: ', content);
    handleClose();
  };

  return (
    <div>
      <Modal
        show={showModalUpdate}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateBtn}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateModal;
