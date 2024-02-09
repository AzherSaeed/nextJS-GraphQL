"use client";
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      _id
      title
      author
    }
  }
`;
export default function CreateBook() {
    const [createBook] = useMutation(CREATE_BOOK);
    const router = useRouter();

    return <div className="m-10">
        <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
            onFinish={async ({ title, author }: { title: string, author: string }) => {
                try {
                    const { data } = await createBook({ variables: { title, author } });
                    router.push("/");
                } catch (error) {
                    console.error('Error creating book:', error);
                }
            }}
        >
            <Form.Item label="Book Title" name="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Author" name="author" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}