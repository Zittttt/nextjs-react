'use client';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';

export default function ViewDetailBlog({ params }: { params: { id: string } }) {
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href={'/blogs'}>Go Back</Link>
      <Card className="text-center mt-3">
        <Card.Header>Title: {data?.id}</Card.Header>
        <Card.Body>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
      </Card>
    </div>
  );
}
