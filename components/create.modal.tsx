'use client';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;
  const handleClose = () => {
    setShowModalCreate(false);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCreateBtn = () => {
    if (!title || !author || !content) {
      toast.error('Not empty field !');
      return;
    }

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
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
          toast.success('Create new blog succeed !');
          mutate('http://localhost:8000/blogs');
        } else toast.error('Create new blog failed !');
        handleClose();
      });

    console.log('title: ', title, 'author: ', author, 'content: ', content);
    handleClose();
  };

  return (
    <div>
      <Modal
        show={showModalCreate}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New Blog</Modal.Title>
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
          <Button variant="primary" onClick={handleCreateBtn}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateModal;
