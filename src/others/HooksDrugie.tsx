import { useState, useEffect } from "react";
import { Paginacja } from "./Paginacja";

interface SinglePost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const url = "https://jsonplaceholder.typicode.com/posts";

export const HooksDrugie = () => {
  const [posts, setPosts] = useState<SinglePost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPosts, setCurrentPosts] = useState<SinglePost[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = (await response.json()) as SinglePost[];
      console.log(json);
      setPosts(json);
      return json;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData().then((posts) => {
      if (posts) {
        setCurrentPosts(posts.slice(0, postsPerPage));
      }
    });
  }, []);

  const paginate = (pageNumber: number) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPage(pageNumber);
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {currentPosts.map((post) => {
          return (
            <div>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
      <Paginacja
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
