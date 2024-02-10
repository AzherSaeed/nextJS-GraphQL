"use client";
import React from "react";
import { Avatar, List } from "antd";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      author
    }
  }
`;

const App: React.FC = () => {
  const { loading, data } = useQuery<{
    books: { _id: string; title: string; author: string }[];
  }>(GET_BOOKS, {
    pollInterval: 1000,
  });

  return (
    <div className="!m-10">
      <List
        itemLayout="horizontal"
        dataSource={data?.books}
        loading={loading}
        renderItem={(item, index) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<p>{item.title}</p>}
              description={item.author}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
