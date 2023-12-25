import MainLayout from "../../../components/layout/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { getMemoryFeed, MemoryPost } from "../../../utils/apiUtils"
import { RemotionRoot } from "../remotion/Root"
import Button from "@mui/material/Button"

const RecapVideo = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["mem-feed"],
    queryFn: getMemoryFeed,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const thisYearsPosts = data.filter((post: MemoryPost) => {
    const date = new Date(post.memoryDay)
    return date.getFullYear() === 2023
  })

  return (
    <MainLayout>
      <Button variant="contained" size="small">
        Create video
      </Button>
      <RemotionRoot />
      {thisYearsPosts.map((post: MemoryPost) => (
        <img key={post.id} alt="primary" width="100" src={post.primary.url} />
      ))}
    </MainLayout>
  )
}

export default RecapVideo
