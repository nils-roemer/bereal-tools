import MainLayout from "../../../components/layout/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { getFeed, Post } from "../../../utils/apiUtils"

const Feed = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <MainLayout>
      <div>Feed</div>
      <div>MaxPostsPerMoment: {data.maxPostsPerMoment}</div>
      <div>RemainingPosts: {data.remainingPosts}</div>
      <div>My Post</div>
      <div>Region: {data.userPosts.region}</div>
      {data.userPosts.posts.map((post: Post) => (
        <div key="{post}">
          <div>primary:</div>
          <img alt="primary" width="100" src={post.primary.url} />
          <div>secondary:</div>
          <img alt="secondary" width="100" src={post.secondary.url} />
        </div>
      ))}
    </MainLayout>
  )
}

export default Feed
